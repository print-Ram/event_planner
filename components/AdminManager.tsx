'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  Edit3,
  Inbox,
  Phone,
  MessageSquare,
  CheckCircle,
  Clock,
  Sparkles,
  X,
  ChevronDown,
  ChevronUp,
  Save,
  RotateCcw
} from 'lucide-react';
import {
  verifyAdminPasscode,
  updateAdminPasscode,
  subscribeToQuoteInquiries,
  updateQuoteInquiryStatus,
  type QuoteInquiry,
} from '../lib/firebase';

interface AdminContextType {
  isAdmin: boolean;
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  openLoginModal: () => void;
  openInquiriesModal: () => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  isEditMode: false,
  setIsEditMode: () => {},
  openLoginModal: () => {},
  openInquiriesModal: () => {},
  logout: () => {},
});

export const useAdmin = () => useContext(AdminContext);

export default function AdminManager({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [inquiriesModalOpen, setInquiriesModalOpen] = useState(false);
  const [passcodeModalOpen, setPasscodeModalOpen] = useState(false);
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [newPasscode, setNewPasscode] = useState('');
  const [passcodeSuccess, setPasscodeSuccess] = useState('');
  const [isBarMinimized, setIsBarMinimized] = useState(false);

  // Inquiries
  const [inquiries, setInquiries] = useState<QuoteInquiry[]>([]);

  // 1. Check existing local storage session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAuth = localStorage.getItem('sre_admin_session');
      if (savedAuth === 'true') {
        setIsAdmin(true);
        setIsEditMode(true);
      }
    }
  }, []);

  // 2. Hidden Shortcut (Ctrl + Shift + A) and URL query / hash detector
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + A or Cmd + Shift + A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setLoginModalOpen(true);
      }
    };

    const handleCustomTrigger = () => {
      setLoginModalOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-admin-portal', handleCustomTrigger);

    // URL trigger: ?admin=true or ?admin=sriram or #admin
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('admin') !== null || window.location.hash === '#admin') {
        setLoginModalOpen(true);
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-admin-portal', handleCustomTrigger);
    };
  }, []);

  // 3. Subscribe to Quotes if Admin
  useEffect(() => {
    if (isAdmin) {
      const unsub = subscribeToQuoteInquiries((data) => {
        setInquiries(data);
      });
      return () => unsub();
    }
  }, [isAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsVerifying(true);

    try {
      const isValid = await verifyAdminPasscode(enteredPasscode);
      if (isValid) {
        setIsAdmin(true);
        setIsEditMode(true);
        localStorage.setItem('sre_admin_session', 'true');
        setLoginModalOpen(false);
        setEnteredPasscode('');
      } else {
        setLoginError('Invalid secret passcode. Please try again.');
      }
    } catch (err) {
      setLoginError('Verification failed. Check network connection.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setIsEditMode(false);
    localStorage.removeItem('sre_admin_session');
  };

  const handleChangePasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasscode.trim().length < 4) {
      setLoginError('Passcode must be at least 4 characters.');
      return;
    }
    await updateAdminPasscode(newPasscode);
    setPasscodeSuccess('Admin passcode updated successfully!');
    setTimeout(() => {
      setPasscodeModalOpen(false);
      setPasscodeSuccess('');
      setNewPasscode('');
    }, 1500);
  };

  const newInquiriesCount = inquiries.filter((q) => q.status === 'new').length;

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isEditMode,
        setIsEditMode,
        openLoginModal: () => setLoginModalOpen(true),
        openInquiriesModal: () => setInquiriesModalOpen(true),
        logout: handleLogout,
      }}
    >
      {children}

      {/* ─── FLOATING ADMIN CONTROLS BAR (Visible only when logged in) ─── */}
      {isAdmin && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 animate-in slide-in-from-bottom duration-300">
          <div className="bg-[#1C1917]/95 text-white backdrop-blur-md border border-amber-500/40 rounded-2xl shadow-2xl p-3 max-w-sm w-full transition-all">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-amber-500/20 text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-xs font-black tracking-wide text-amber-300">
                    Sri Ram Events • Admin Active
                  </h4>
                  <span className="text-[10px] text-white/60">Global Cloud Sync Enabled</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsBarMinimized(!isBarMinimized)}
                  className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-xs"
                  title={isBarMinimized ? 'Expand' : 'Minimize'}
                >
                  {isBarMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleLogout}
                  className="p-1 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 text-xs"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Controls body */}
            {!isBarMinimized && (
              <div className="pt-3 space-y-2.5">
                {/* Edit Mode Switch */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs font-bold text-white/90 flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Live Page Edit Mode</span>
                  </span>
                  <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                      isEditMode
                        ? 'bg-emerald-500 text-black shadow-md'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {isEditMode ? 'ON (Editable)' : 'OFF (Preview)'}
                  </button>
                </div>

                {/* Customer Inquiries Button */}
                <button
                  onClick={() => setInquiriesModalOpen(true)}
                  className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-black text-xs flex items-center justify-between shadow-md transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Inbox className="w-4 h-4" />
                    <span>Customer Quote Inquiries</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-black text-amber-300 text-[10px] font-black">
                    {newInquiriesCount} New
                  </span>
                </button>

                {/* Change Passcode trigger */}
                <div className="flex items-center justify-between pt-1 text-[11px] text-white/60">
                  <button
                    onClick={() => setPasscodeModalOpen(true)}
                    className="hover:text-amber-300 underline font-semibold"
                  >
                    Change Secret Passcode
                  </button>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Firebase Live
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── HIDDEN ADMIN LOGIN MODAL ─── */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#1C1917] border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full relative text-white shadow-2xl space-y-5">
            <button
              onClick={() => {
                setLoginModalOpen(false);
                setLoginError('');
              }}
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-amber-300">Management Console</h3>
                <p className="text-xs text-white/60">Sri Ram Events • Secret Authorization</p>
              </div>
            </div>

            <p className="text-xs text-white/80 leading-relaxed">
              Enter your master administrative key to unlock editing permissions across all event categories, pricing guides, and photos.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-amber-200 mb-1.5">
                  Secret Admin Passcode
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter admin passcode"
                    value={enteredPasscode}
                    onChange={(e) => setEnteredPasscode(e.target.value)}
                    className="w-full py-3 pl-4 pr-11 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-amber-400 focus:outline-none text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-white/60 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-bold">
                  {loginError}
                </div>
              )}

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/60 flex items-center justify-between">
                <span>Default Passcode:</span>
                <code className="text-amber-300 font-mono font-bold bg-black/40 px-2 py-0.5 rounded">
                  sriram@2025
                </code>
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-sm shadow-lg transition-all"
              >
                {isVerifying ? 'Authenticating...' : 'Unlock Admin Portal'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── CUSTOMER QUOTE INQUIRIES DRAWER MODAL ─── */}
      {inquiriesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#18181B] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] relative text-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                  <Inbox className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Received Quote Inquiries</h3>
                  <p className="text-xs text-white/60">
                    Live Realtime Submissions from Website Quote Form
                  </p>
                </div>
              </div>

              <button
                onClick={() => setInquiriesModalOpen(false)}
                className="p-2 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inquiries list */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
              {inquiries.length === 0 ? (
                <div className="text-center py-16 space-y-3 text-white/50">
                  <Inbox className="w-12 h-12 mx-auto stroke-1" />
                  <p className="text-sm font-semibold">No inquiries received yet.</p>
                  <p className="text-xs max-w-sm mx-auto">
                    When customers submit the "Request Customized Quote" modal on the website, they will appear here in real-time.
                  </p>
                </div>
              ) : (
                inquiries.map((q: any) => {
                  const customerPhoneClean = q.phone.replace(/[^0-9]/g, '');
                  const customerWhatsAppNumber = customerPhoneClean.startsWith('91')
                    ? customerPhoneClean
                    : `91${customerPhoneClean}`;

                  const ownerToCustomerMsg = encodeURIComponent(
                    `నమస్కారం ${q.name} garu! 🙏\n\nThis is Sri Ram Events (Madanapalle). We have successfully received your quote inquiry for *${q.service}* scheduled for *${q.date}* (Ref: #${q.id}).\n\nOur event specialist is ready with your customized quotation and packages.\n\n📞 Call/WhatsApp: +91 95025 59333\n📍 Madanapalle, Tirupati, Punganur & AP.`
                  );

                  return (
                    <div
                      key={q.firebaseKey || q.id}
                      className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/40 transition-all space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            #{q.id}
                          </span>
                          <span className="text-sm font-black text-white">{q.name}</span>
                          <span className="text-xs text-white/50">
                            {new Date(q.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={q.status || 'new'}
                            onChange={(e) =>
                              updateQuoteInquiryStatus(q.firebaseKey, e.target.value as any)
                            }
                            className={`text-xs font-black py-1 px-2.5 rounded-lg border focus:outline-none ${
                              q.status === 'confirmed'
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                                : q.status === 'contacted'
                                ? 'bg-blue-950 border-blue-500 text-blue-300'
                                : 'bg-amber-950 border-amber-500 text-amber-300'
                            }`}
                          >
                            <option value="new">Status: New</option>
                            <option value="contacted">Status: Contacted</option>
                            <option value="confirmed">Status: Confirmed</option>
                            <option value="archived">Status: Archived</option>
                          </select>
                        </div>
                      </div>

                      {/* Details row */}
                      <div className="grid sm:grid-cols-4 gap-2 text-xs text-white/80 bg-black/40 p-3 rounded-xl">
                        <div>
                          <span className="text-white/40 block text-[10px] uppercase font-bold">Service</span>
                          <span className="font-bold text-amber-300">{q.service}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block text-[10px] uppercase font-bold">Date</span>
                          <span className="font-bold">{q.date || 'TBD'}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block text-[10px] uppercase font-bold">Location</span>
                          <span className="font-bold">{q.city}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block text-[10px] uppercase font-bold">Indicative Budget</span>
                          <span className="font-bold text-emerald-400">
                            {q.estimatedBudget ? `₹${q.estimatedBudget.toLocaleString('en-IN')}` : 'Custom Quote'}
                          </span>
                        </div>
                      </div>

                      {q.notes && (
                        <div className="text-xs text-white/70 italic bg-white/5 p-2 rounded-lg">
                          "{q.notes}"
                        </div>
                      )}

                      {/* Action buttons: WhatsApp customer & Phone */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <a
                          href={`https://wa.me/${customerWhatsAppNumber}?text=${ownerToCustomerMsg}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Confirmation to Customer (+91 {q.phone})</span>
                        </a>

                        <a
                          href={`tel:${q.phone}`}
                          className="py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5 text-amber-400" />
                          <span>Call {q.phone}</span>
                        </a>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── CHANGE PASSCODE MODAL ─── */}
      {passcodeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#1C1917] border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-sm w-full relative text-white shadow-2xl space-y-4">
            <button
              onClick={() => {
                setPasscodeModalOpen(false);
                setPasscodeSuccess('');
              }}
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-amber-300">Change Admin Passcode</h3>
            <p className="text-xs text-white/70">
              Set a new passcode to secure administrative access to Sri Ram Events.
            </p>

            <form onSubmit={handleChangePasscode} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-amber-200 mb-1">
                  New Secret Passcode
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. sriram@999"
                  value={newPasscode}
                  onChange={(e) => setNewPasscode(e.target.value)}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              {passcodeSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-bold">
                  {passcodeSuccess}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs shadow transition-all"
              >
                Save New Passcode
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminContext.Provider>
  );
}
