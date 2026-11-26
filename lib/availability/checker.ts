import type { AvailabilitySlot } from '@/types/database';
import type { BookingRecord } from '@/types/booking';

export interface DateAvailabilityResult {
  available: boolean;
  reason?: string;
}

const BLOCKING_BOOKING_STATUSES = new Set(['Approved', 'Awaiting Deposit', 'Confirmed']);

export function checkDateAvailability(
  date: string,
  slots: AvailabilitySlot[],
  bookings: BookingRecord[]
): DateAvailabilityResult {
  if (!date) {
    return { available: false, reason: 'Please select a valid event date.' };
  }

  const todayStr = new Date().toISOString().slice(0, 10);
  if (date < todayStr) {
    return { available: false, reason: 'Selected date is in the past.' };
  }

  const blockedSlot = slots.find(
    (slot) => slot.date === date && (slot.status === 'unavailable' || slot.status === 'booked')
  );
  if (blockedSlot) {
    return {
      available: false,
      reason: blockedSlot.notes
        ? `Unavailable: ${blockedSlot.notes}`
        : 'This date is currently marked unavailable by the studio.',
    };
  }

  const conflictingBooking = bookings.find(
    (booking) =>
      booking.event_date === date && BLOCKING_BOOKING_STATUSES.has(booking.status)
  );
  if (conflictingBooking) {
    return {
      available: false,
      reason: 'This date already has a confirmed event booking. Please choose an alternative date.',
    };
  }

  return { available: true };
}

export function getUnavailableDatesList(
  slots: AvailabilitySlot[],
  bookings: BookingRecord[]
): Array<{ date: string; reason: string; status: 'unavailable' | 'booked' }> {
  const map = new Map<string, { date: string; reason: string; status: 'unavailable' | 'booked' }>();

  for (const slot of slots) {
    if (slot.status === 'unavailable' || slot.status === 'booked') {
      map.set(slot.date, {
        date: slot.date,
        reason: slot.notes || (slot.status === 'booked' ? 'Booked event' : 'Studio unavailable'),
        status: slot.status,
      });
    }
  }

  for (const booking of bookings) {
    if (BLOCKING_BOOKING_STATUSES.has(booking.status)) {
      map.set(booking.event_date, {
        date: booking.event_date,
        reason: 'Confirmed booking on calendar',
        status: 'booked',
      });
    }
  }

  return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
}
