'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  get,
  set,
  push,
  update,
  remove,
  onValue,
  runTransaction,
  serverTimestamp,
  type Database,
} from 'firebase/database';

// ─── Firebase Configuration ──────────────────────────────────────────────────
export const firebaseConfig = {
  apiKey: "AIzaSyBTiIo4xaLz5ICPstjdg9BkS2cHwNfrMqk",
  authDomain: "srevents-mpl.firebaseapp.com",
  databaseURL: "https://srevents-mpl-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "srevents-mpl",
  storageBucket: "srevents-mpl.firebasestorage.app",
  messagingSenderId: "719656876086",
  appId: "1:719656876086:web:9ea3402ace94bf890f4097",
  measurementId: "G-NE0WRVNKH3",
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const database: Database = getDatabase(app);

// ─── Admin Security Configuration ───────────────────────────────────────────
// Default admin passcode if not changed in Firebase
export const DEFAULT_ADMIN_PASSCODE = 'sriram@2025';

export async function verifyAdminPasscode(enteredPasscode: string): Promise<boolean> {
  try {
    const passcodeRef = ref(database, 'admin_config/passcode');
    const snapshot = await get(passcodeRef);
    const storedPasscode = snapshot.val();
    if (storedPasscode) {
      return enteredPasscode.trim() === String(storedPasscode).trim();
    }
  } catch (err) {
    console.warn('Using default passcode check due to connection:', err);
  }
  return enteredPasscode.trim() === DEFAULT_ADMIN_PASSCODE;
}

export async function updateAdminPasscode(newPasscode: string): Promise<void> {
  const passcodeRef = ref(database, 'admin_config/passcode');
  await set(passcodeRef, newPasscode.trim());
}

// ─── Realtime Content Sync (Reflects for ALL Visitors) ──────────────────────
export async function saveServiceToFirebase(serviceId: string, updatedServiceData: any): Promise<void> {
  const serviceRef = ref(database, `site_content/services/${serviceId}`);
  await set(serviceRef, {
    ...updatedServiceData,
    _lastUpdated: Date.now(),
  });
}

export function subscribeToService(serviceId: string, callback: (data: any) => void): () => void {
  const serviceRef = ref(database, `site_content/services/${serviceId}`);
  const unsubscribe = onValue(serviceRef, (snapshot) => {
    const val = snapshot.val();
    if (val) {
      callback(val);
    }
  });
  return unsubscribe;
}

export function subscribeToAllServices(callback: (data: Record<string, any>) => void): () => void {
  const allRef = ref(database, 'site_content/services');
  const unsubscribe = onValue(allRef, (snapshot) => {
    const val = snapshot.val();
    if (val) {
      callback(val);
    }
  });
  return unsubscribe;
}

export async function resetServiceToDefaults(serviceId: string): Promise<void> {
  const serviceRef = ref(database, `site_content/services/${serviceId}`);
  await remove(serviceRef);
}

// ─── Quote Inquiries Management ─────────────────────────────────────────────
export interface QuoteInquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  date: string;
  city: string;
  notes?: string;
  estimatedBudget?: number;
  createdAt: number;
  status: 'new' | 'contacted' | 'confirmed' | 'archived';
}

export async function submitQuoteInquiry(inquiry: Omit<QuoteInquiry, 'id' | 'createdAt' | 'status'>): Promise<string> {
  const quotesRef = ref(database, 'quotes');
  const newQuoteRef = push(quotesRef);
  const quoteId = `SRE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const fullInquiry: QuoteInquiry = {
    ...inquiry,
    id: quoteId,
    createdAt: Date.now(),
    status: 'new',
  };

  await set(newQuoteRef, fullInquiry);
  return quoteId;
}

export function subscribeToQuoteInquiries(callback: (quotes: QuoteInquiry[]) => void): () => void {
  const quotesRef = ref(database, 'quotes');
  const unsubscribe = onValue(quotesRef, (snapshot) => {
    const val = snapshot.val();
    if (val) {
      const list = Object.entries(val).map(([key, v]: [string, any]) => ({
        ...v,
        firebaseKey: key,
      }));
      // Sort newest first
      list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      callback(list);
    } else {
      callback([]);
    }
  });
  return unsubscribe;
}

export async function updateQuoteInquiryStatus(firebaseKey: string, status: QuoteInquiry['status']): Promise<void> {
  const targetRef = ref(database, `quotes/${firebaseKey}`);
  await update(targetRef, { status });
}
