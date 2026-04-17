/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { X, Camera, Save, Award, Briefcase, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    department: user?.department || '',
    expertise: user?.expertise?.join(', ') || ''
  });
  const [avatar, setAvatar] = useState(user?.avatarUrl || '');

  if (!isOpen) return null;

  const handleSave = () => {
    updateProfile({
      name: formData.name,
      department: formData.department,
      expertise: formData.expertise.split(',').map(s => s.trim()).filter(Boolean),
      avatarUrl: avatar
    });
    onClose();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg bg-bg-surface border border-border-dim rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="flex justify-between items-center p-4 border-b border-border-dim bg-bg-deep/50">
            <h2 className="text-[14px] font-extrabold uppercase tracking-widest text-text-primary flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent-orange" /> SIH Personnel Identity Profile
            </h2>
            <button onClick={onClose} className="p-1 hover:bg-bg-elevated rounded">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            <div className="flex flex-col items-center gap-4">
              <div className="relative group cursor-pointer">
                <input 
                   type="file" 
                   className="absolute inset-0 opacity-0 cursor-pointer z-10"
                   onChange={handlePhotoUpload}
                   accept="image/*"
                />
                <img 
                  src={avatar} 
                  alt={user?.name} 
                  className="w-24 h-24 rounded-2xl border-2 border-accent-blue/20 object-cover shadow-lg transition-all group-hover:brightness-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-accent-blue p-1.5 rounded-lg border-2 border-bg-surface shadow-md">
                  <Camera className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="text-center">
                <span className="text-[10px] bg-accent-blue/10 text-accent-blue px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                  {user?.role} Access
                </span>
                <p className="text-[10px] text-text-secondary mt-1 uppercase tracking-tight opacity-60">Node {user?.id} Secure Index</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary ml-1">Full Legal Name</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary opacity-40" />
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-bg-deep border border-border-dim rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-accent-blue transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary ml-1">Institutional Department</label>
                <input 
                  type="text" 
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="e.g. Fintech Research"
                  className="w-full bg-bg-deep border border-border-dim rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-accent-blue transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary ml-1 flex items-center justify-between">
                  Expertise Tags <span className="text-[8px] opacity-40 uppercase">Comma separated</span>
                </label>
                <div className="relative">
                  <Award className="absolute left-3 top-3 w-4 h-4 text-text-secondary opacity-40" />
                  <textarea 
                    rows={3}
                    value={formData.expertise}
                    onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                    className="w-full bg-bg-deep border border-border-dim rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-accent-blue transition-all resize-none"
                    placeholder="Fintech, Regulatory Policy, Digital Economy..."
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-border-dim rounded-lg text-xs font-bold uppercase tracking-widest text-text-secondary hover:bg-bg-elevated transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-accent-blue text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> Commit Updates
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
