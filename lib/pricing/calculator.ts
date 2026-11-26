import type { BusinessSettings } from '@/types/database';
import type { EstimateBreakdown, EstimateLineItem, PackageTier, PricingRule } from '@/types/pricing';

interface CalculateEstimateInput {
  packageId: string;
  selectedServices: string[];
  guestCount: number;
  packages: PackageTier[];
  pricingRules: PricingRule[];
  settings: BusinessSettings;
}

export function calculateEventEstimate({
  packageId,
  selectedServices,
  guestCount,
  packages,
  pricingRules,
  settings,
}: CalculateEstimateInput): EstimateBreakdown {
  const pkg = packages.find((p) => p.id === packageId && p.active);

  if (!pkg || pkg.base_price === null || pkg.base_price === undefined || pkg.id === 'custom') {
    return {
      configured: false,
      items: [],
      subtotal: 0,
      tax_amount: 0,
      discount_amount: 0,
      estimated_minimum: null,
      estimated_maximum: null,
      display_label: 'Request a personalised quote',
    };
  }

  const items: EstimateLineItem[] = [
    {
      label: `${pkg.name} Package Base`,
      type: 'package',
      amount: pkg.base_price,
    },
  ];

  const activeRules = pricingRules.filter((r) => r.active);
  const safeGuests = Math.max(1, guestCount || 1);

  for (const serviceKey of selectedServices) {
    const rule = activeRules.find(
      (r) => r.service_key.toLowerCase() === serviceKey.toLowerCase()
    );
    if (!rule || rule.amount <= 0) continue;

    if (rule.pricing_type === 'per_guest') {
      const effectiveGuests = rule.minimum_quantity
        ? Math.max(safeGuests, rule.minimum_quantity)
        : safeGuests;
      const cappedGuests = rule.maximum_quantity
        ? Math.min(effectiveGuests, rule.maximum_quantity)
        : effectiveGuests;
      items.push({
        label: `${rule.label} (${cappedGuests} guests)`,
        type: 'guest',
        amount: Math.round(rule.amount * cappedGuests),
      });
    } else {
      items.push({
        label: rule.label,
        type: 'service',
        amount: Math.round(rule.amount),
      });
    }
  }

  let subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  if (pkg.minimum_amount && subtotal < pkg.minimum_amount) {
    subtotal = pkg.minimum_amount;
  }

  const discountAmount =
    settings.discount_enabled && settings.discount_percentage > 0
      ? Math.round((subtotal * settings.discount_percentage) / 100)
      : 0;

  const afterDiscount = Math.max(0, subtotal - discountAmount);
  const taxAmount =
    settings.tax_percentage > 0
      ? Math.round((afterDiscount * settings.tax_percentage) / 100)
      : 0;

  const total = afterDiscount + taxAmount;
  const estimatedMin = Math.round(total * 0.92);
  const estimatedMax = Math.round(total * 1.15);

  const sym = settings.currency_symbol || '₹';

  return {
    configured: true,
    items,
    subtotal,
    tax_amount: taxAmount,
    discount_amount: discountAmount,
    estimated_minimum: estimatedMin,
    estimated_maximum: estimatedMax,
    display_label: `${sym}${estimatedMin.toLocaleString('en-IN')} – ${sym}${estimatedMax.toLocaleString('en-IN')}`,
  };
}
