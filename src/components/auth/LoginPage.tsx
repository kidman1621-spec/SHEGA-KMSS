/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Mail, Globe, ArrowRight, Loader2, KeyRound, CheckCircle2, UserCircle2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Role } from '../../types';
import { cn } from '../../lib/utils';

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Simulated password
  const [selectedRole, setSelectedRole] = useState<Role>('Editor');
  const [step, setStep] = useState<'initial' | 'otp' | 'success'>('initial');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // If already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError('');
    // Simulate Identity Provider Popup
    setTimeout(() => {
      login(email || 'kidman1621@gmail.com', selectedRole);
      setStep('success');
      setIsLoading(false);
      // Actual navigation will happen via useEffect above or a manual timeout
      setTimeout(() => navigate('/'), 2000);
    }, 1500);
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Identity vector required: Provide a valid corporate email.');
      return;
    }
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      setStep('otp');
      setIsLoading(false);
    }, 1000);
  };

  const handleVerifyOTP = () => {
    setIsLoading(true);
    setTimeout(() => {
      login(email, selectedRole);
      setStep('success');
      setIsLoading(false);
      setTimeout(() => navigate('/'), 2000);
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
    
    if (newOtp.every(v => v !== '')) {
      handleVerifyOTP();
    }
  };

  return (
    <div className="min-h-screen bg-bg-deep flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-accent-blue)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg space-y-8 relative z-10"
      >
        <div className="text-center space-y-3">
          <motion.div 
            animate={{ 
              rotateY: [0, 360],
              transition: { duration: 4, repeat: Infinity, ease: "linear" }
            }}
            className="inline-flex items-center justify-center w-20 h-20 bg-accent-blue/5 rounded-3xl mb-4 border border-accent-blue/10 backdrop-blur-sm"
          >
            <Shield className="w-10 h-10 text-accent-blue" />
          </motion.div>
          <h1 className="text-4xl font-black tracking-tighter uppercase text-text-primary">Shega Intelligence Hub</h1>
          <p className="text-accent-blue text-xs font-black tracking-[0.4em] uppercase opacity-70">Sovereign Knowledge Infrastructure</p>
        </div>

        <div className="bg-bg-surface border border-border-dim rounded-[2rem] p-10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] space-y-8 relative overflow-hidden backdrop-blur-md">
          {/* Subtle accent border top */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />

          <AnimatePresence mode="wait">
            {step === 'initial' && (
              <motion.div 
                key="initial"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Role Toggle */}
                <div className="grid grid-cols-2 gap-3 p-1.5 bg-bg-deep border border-border-dim rounded-2xl">
                   <button 
                     onClick={() => setSelectedRole('Editor')}
                     className={cn(
                       "flex items-center justify-center gap-2 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all",
                       selectedRole === 'Editor' ? "bg-bg-elevated text-accent-blue shadow-inner" : "text-text-secondary opacity-50 hover:opacity-80"
                     )}
                   >
                     <UserCircle2 className="w-3.5 h-3.5" />
                     Personnel Node
                   </button>
                   <button 
                     onClick={() => setSelectedRole('Admin')}
                     className={cn(
                       "flex items-center justify-center gap-2 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all",
                       selectedRole === 'Admin' ? "bg-bg-elevated text-accent-orange shadow-inner" : "text-text-secondary opacity-50 hover:opacity-80"
                     )}
                   >
                     <ShieldAlert className="w-3.5 h-3.5" />
                     Governance Admin
                   </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary ml-1">Shega Cluster Identity</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-accent-blue transition-colors" />
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@shega.org"
                        className="w-full bg-bg-deep border border-border-dim rounded-2xl py-4 pl-12 pr-4 text-[14px] font-bold focus:outline-none focus:border-accent-blue/50 transition-all placeholder:opacity-20"
                      />
                    </div>
                    {error && <p className="text-[10px] text-red-400 font-bold uppercase tracking-tight text-center mt-2">{error}</p>}
                  </div>

                  <div className="space-y-4 pt-2">
                    <button 
                      onClick={handleSendOTP}
                      disabled={isLoading || !email}
                      className="w-full bg-accent-blue text-white font-black py-5 rounded-2xl text-[12px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-[0_12px_32px_rgba(45,164,255,0.25)] hover:bg-accent-blue/90 disabled:opacity-20"
                    >
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                        <>
                          Request Access Link
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-4 py-2">
                      <div className="flex-1 h-px bg-border-dim/50" />
                      <span className="text-[10px] uppercase font-black text-text-secondary tracking-[0.4em] opacity-40">OR</span>
                      <div className="flex-1 h-px bg-border-dim/50" />
                    </div>

                    <button 
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                      className="w-full bg-bg-surface border border-border-dim hover:border-accent-blue/30 text-text-primary font-bold py-4 rounded-2xl text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-3"
                    >
                      <Globe className="w-4 h-4 text-accent-blue" />
                      Institutional SSO Provider
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'otp' && (
              <motion.div 
                key="otp"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="space-y-10 text-center py-4"
              >
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-accent-orange/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-accent-orange/20 animate-pulse">
                    <KeyRound className="w-8 h-8 text-accent-orange" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Sync Token Required</h3>
                  <p className="text-[11px] text-text-secondary uppercase font-bold tracking-widest leading-loose">
                    Verification code transmitted to:<br />
                    <span className="text-accent-blue bg-accent-blue/5 px-3 py-1 rounded-full">{email}</span>
                  </p>
                </div>

                <div className="flex justify-between gap-3 max-w-[320px] mx-auto">
                  {otp.map((val, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      value={val}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-12 h-14 bg-bg-deep border-2 border-border-dim rounded-xl text-center text-2xl font-black focus:border-accent-orange focus:bg-bg-surface outline-none transition-all shadow-inner"
                    />
                  ))}
                </div>

                <div className="space-y-6">
                  <button 
                    onClick={handleVerifyOTP}
                    disabled={isLoading || otp.some(v => v === '')}
                    className="w-full bg-accent-orange text-bg-deep font-black py-5 rounded-2xl text-[12px] uppercase tracking-[0.3em] hover:brightness-110 disabled:opacity-20 transition-all shadow-[0_12px_32px_rgba(210,152,34,0.25)]"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Verify & Load SIH Nodes"}
                  </button>
                  <button 
                    onClick={() => setStep('initial')}
                    className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary hover:text-accent-blue transition-colors flex items-center justify-center gap-2 mx-auto"
                  >
                    <ArrowRight className="w-3 h-3 rotate-180" />
                    Identity Correction
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div 
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-16 text-center space-y-8"
              >
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-accent-green/5 rounded-[2.5rem] flex items-center justify-center mx-auto border-2 border-accent-green/30">
                     <CheckCircle2 className="w-12 h-12 text-accent-green" />
                  </div>
                  <motion.div 
                     animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                     transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-[-10px] rounded-[3rem] border border-dashed border-accent-green/40 opacity-30"
                   />
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-accent-green">Session Initialized</h3>
                  <p className="text-[11px] text-text-secondary uppercase font-bold tracking-[0.5em] animate-pulse">Syncing with Shega Neural Grid...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <footer className="pt-6 border-t border-border-dim/50 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
               <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent-green opacity-70">Grid Node: Online</span>
            </div>
            <p className="text-[9px] text-text-secondary uppercase tracking-[0.2em] font-bold leading-relaxed opacity-40">
              Encryption Protocol: SH-256-V4. Secured by Institutional Governance.
            </p>
          </footer>
        </div>

        <div className="flex justify-center items-center gap-8 text-[11px] font-black uppercase tracking-widest text-text-secondary opacity-30">
          <span className="flex items-center gap-2 px-3 py-1 bg-bg-surface border border-border-dim rounded-full"><Globe className="w-3.5 h-3.5" /> Node: Addis Ababa</span>
          <span>Ver 2.4.21</span>
        </div>
      </motion.div>
    </div>
  );
}
