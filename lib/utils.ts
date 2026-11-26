import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, symbol = '₹'): string {
  return `${symbol}${Math.round(amount).toLocaleString('en-IN')}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function buildWhatsAppUrl(whatsappNumber: string, message: string): string {
  const clean = whatsappNumber.replace(/[^0-9]/g, '') || '919502559333';
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

export function generateReferenceId(prefix = 'SRE'): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${rand}`;
}
