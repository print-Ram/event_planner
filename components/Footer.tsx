'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Heart, Sparkles, Eye, Users, Globe, Activity } from 'lucide-react';
import { initializeApp, getApps } from 'firebase/app';
import {
  getDatabase,
  ref,
  onValue,
  runTransaction,
  onDisconnect,
  set,
  serverTimestamp,
} from 'firebase/database';

// ─── Firebase Configuration ──────────────────────────────────────────────────
// REPLACE these values with your actual Firebase config from:
// https://console.firebase.google.com/project/srevents-mpl/settings/general
const firebaseConfig = {
  apiKey: "AIzaSyBTiIo4xaLz5ICPstjdg9BkS2cHwNfrMqk",
  authDomain: "srevents-mpl.firebaseapp.com",
  databaseURL: "https://srevents-mpl-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "srevents-mpl",
  storageBucket: "srevents-mpl.firebasestorage.app",
  messagingSenderId: "719656876086",
  appId: "1:719656876086:web:9ea3402ace94bf890f4097",
  measurementId: "G-NE0WRVNKH3",
};

// Initialize Firebase (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const database = getDatabase(app);

// ─── Real-Time Visitor Counter Hook (Firebase Realtime Database) ─────────────
function useVisitorCount() {
  const [totalVisitors, setTotalVisitors] = useState<number>(0);
  const [liveVisitors, setLiveVisitors] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // === 1. TOTAL VISITOR COUNT ===
    // Increment total count once per session
    const hasCountedThisSession = sessionStorage.getItem('sr_counted');

    if (!hasCountedThisSession) {
      const totalRef = ref(database, 'stats/totalVisitors');
      runTransaction(totalRef, (currentValue) => {
        return (currentValue || 0) + 1;
      }).then(() => {
        sessionStorage.setItem('sr_counted', 'true');
      }).catch((err) => {
        console.error('Failed to increment visitor count:', err);
      });
    }

    // Listen to total visitors in real-time
    const totalRef = ref(database, 'stats/totalVisitors');
    const unsubTotal = onValue(totalRef, (snapshot) => {
      const val = snapshot.val();
      setTotalVisitors(val || 0);
      setIsLoading(false);
    });

    // === 2. LIVE (ONLINE) VISITOR COUNT using Firebase Presence ===
    // Each visitor creates a unique node under /presence/{sessionId}
    // When they disconnect, Firebase automatically removes it
    const sessionId =
      sessionStorage.getItem('sr_session_id') ||
      `v_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    sessionStorage.setItem('sr_session_id', sessionId);

    const myPresenceRef = ref(database, `presence/${sessionId}`);
    const presenceCountRef = ref(database, 'stats/liveCount');
    const connectedRef = ref(database, '.info/connected');

    const unsubConnected = onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        // Mark this visitor as online
        set(myPresenceRef, {
          online: true,
          lastSeen: serverTimestamp(),
        });

        // When this client disconnects, remove the presence node
        onDisconnect(myPresenceRef).remove();
      }
    });

    // Listen to all presence nodes to count live visitors
    const presenceListRef = ref(database, 'presence');
    const unsubPresence = onValue(presenceListRef, (snapshot) => {
      const presenceData = snapshot.val();
      const count = presenceData ? Object.keys(presenceData).length : 0;
      setLiveVisitors(count);
    });

    // Cleanup on unmount
    return () => {
      unsubTotal();
      unsubConnected();
      unsubPresence();
    };
  }, []);

  return { totalVisitors, liveVisitors, isLoading };
}

// ─── Animated Number Display ─────────────────────────────────────────────────
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Animate from current display to target value
    if (value === 0) {
      setDisplayValue(0);
      return;
    }

    const duration = 1200; // ms
    const startValue = displayValue;
    const diff = value - startValue;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + diff * eased);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const formatted = displayValue.toLocaleString('en-IN');

  return (
    <span className="inline-flex tabular-nums">
      {formatted.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block w-[0.65em] text-center transition-all duration-200"
        >
          {char}
        </span>
      ))}
    </span>
  );
}

// ─── Footer Component ────────────────────────────────────────────────────────
export default function Footer() {
  const { totalVisitors, liveVisitors, isLoading } = useVisitorCount();

  return (
    <footer className="bg-[#1A1214] text-white/80 pt-16 pb-12 border-t border-wedding-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/sri-ram-icon.png"
                alt="Sri Ram Events"
                className="h-10 w-10 object-cover rounded-lg bg-black p-0.5 border border-wedding-turmeric"
              />
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  Sri Ram <span className="text-wedding-warmGold">Events</span>
                </span>
                <p className="text-[11px] font-semibold text-white/60">We plan, you Celebrate</p>
              </div>
            </div>

            <p className="text-xs font-medium leading-relaxed text-white/60">
              Transforming your milestones into unforgettable festive experiences with authentic Telugu culture, elegant mandapams, and end-to-end event execution.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-wedding-warmGold text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>సంతోషాన్ని అందంగా జరుపుకుందాం</span>
            </div>
          </div>

          {/* Event Services Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-wedding-warmGold">
              Event Categories
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-white/70">
              <li><a href="#services" className="hover:text-wedding-warmGold transition-colors">Grand Weddings</a></li>
              <li><a href="#services" className="hover:text-wedding-warmGold transition-colors">Joyous Birthdays</a></li>
              <li><a href="#services" className="hover:text-wedding-warmGold transition-colors">Private Gatherings</a></li>
              <li><a href="#services" className="hover:text-wedding-warmGold transition-colors">House Warming (Gruhapravesam)</a></li>
              <li><a href="#services" className="hover:text-wedding-warmGold transition-colors">Authentic Catering</a></li>
              <li><a href="#services" className="hover:text-wedding-warmGold transition-colors">School & College Fests</a></li>
              <li><a href="#services" className="hover:text-wedding-warmGold transition-colors">Creative Theme Parties</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-wedding-warmGold">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-white/70">
              <li><a href="#hero" className="hover:text-wedding-warmGold transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-wedding-warmGold transition-colors">Services We Offer</a></li>
              <li><a href="#estimator" className="hover:text-wedding-warmGold transition-colors">Event Cost Estimator</a></li>
              <li><a href="#why-us" className="hover:text-wedding-warmGold transition-colors">Why Choose Us</a></li>
              <li><a href="#contact" className="hover:text-wedding-warmGold transition-colors">Request Quotation</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-wedding-warmGold">
              Contact & Location
            </h4>
            <ul className="space-y-3 text-xs font-medium text-white/70">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-wedding-warmGold shrink-0" />
                <a href="tel:+919502559333" className="hover:text-wedding-warmGold transition-colors">+91 95025 59333</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-wedding-warmGold shrink-0" />
                <span>contact@sriramevents.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-wedding-warmGold shrink-0 mt-0.5" />
                <span>Madanapalle (Main Branch), Tirupati, Punganur, Kothakota & across Andhra Pradesh</span>
              </li>
            </ul>
          </div>

        </div>

        {/* ─── Live Visitor Counter Banner (Firebase Real-Time) ──────────── */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2A1A1E] via-[#1E1418] to-[#2A1A1E] border border-white/10 p-5 sm:p-6">
          {/* Animated background pulse */}
          <div className="absolute inset-0 bg-gradient-to-r from-wedding-kumkum/5 via-transparent to-wedding-warmGold/5 animate-pulse" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5">

            {/* Live Now Indicator */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping" />
                <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/25">
                  <Activity className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  <span className="text-[11px] uppercase tracking-widest font-extrabold text-green-400">
                    Live Now
                  </span>
                </div>
                <p className="text-lg sm:text-xl font-black text-white mt-0.5">
                  {isLoading ? (
                    <span className="inline-block w-8 h-5 bg-white/10 rounded animate-pulse" />
                  ) : (
                    <AnimatedNumber value={liveVisitors} />
                  )}
                  <span className="text-xs font-bold text-white/60 ml-1.5">
                    {liveVisitors === 1 ? 'visitor online' : 'visitors online'}
                  </span>
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-14 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

            {/* Total Visitors */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-wedding-kumkum to-wedding-ruby shadow-lg shadow-wedding-kumkum/25">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[11px] uppercase tracking-widest font-extrabold text-wedding-warmGold">
                  Total Visitors
                </p>
                <p className="text-lg sm:text-xl font-black text-white mt-0.5">
                  {isLoading ? (
                    <span className="inline-block w-16 h-5 bg-white/10 rounded animate-pulse" />
                  ) : (
                    <AnimatedNumber value={totalVisitors} />
                  )}
                  <span className="text-xs font-bold text-white/60 ml-1.5">all time</span>
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-14 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

            {/* Events Delivered */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-wedding-turmeric to-wedding-warmGold shadow-lg shadow-wedding-warmGold/25">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[11px] uppercase tracking-widest font-extrabold text-wedding-warmGold">
                  Events Delivered
                </p>
                <p className="text-lg sm:text-xl font-black text-white mt-0.5">
                  500<span className="text-wedding-warmGold">+</span>
                  <span className="text-xs font-bold text-white/60 ml-1.5">& counting</span>
                </p>
              </div>
            </div>

            {/* Globe Icon */}
            <div className="hidden lg:flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/10">
              <Globe className="w-5 h-5 text-white/40 animate-spin" style={{ animationDuration: '20s' }} />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-white/50">
          <p>© {new Date().getFullYear()} Sri Ram Events. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Telugu Celebrations</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
