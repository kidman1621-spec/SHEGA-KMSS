/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Users, 
  ExternalLink,
  MapPin,
  X,
  Plus
} from 'lucide-react';
import { CalendarEvent } from '../../types';
import { cn } from '../../lib/utils';

export default function EventCalendar() {
  const [currentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Seed data
  const events: CalendarEvent[] = [
    {
      id: 'e1',
      title: 'Weekly Editorial Pitch',
      type: 'Pitch',
      date: '2026-04-13T00:00:00.000Z', // Monday
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      attendees: ['Nahom T.', 'Sara M.', 'Kofi M.', 'Team'],
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      description: 'Weekly roundtable to decide which stories lead the Shega Intelligence Newsletter.'
    },
    {
      id: 'e2',
      title: 'JICA Sync',
      type: 'Sync',
      date: '2026-04-15T00:00:00.000Z', // Wednesday
      startTime: '02:00 PM',
      endTime: '03:00 PM',
      attendees: ['Tewodros S.', 'JICA Reps', 'Ops Team'],
      meetingLink: 'https://meet.google.com/xyz-pdqr-stuv',
      description: 'Bi-weekly status update on the JICA digitalization project.'
    },
    {
      id: 'e3',
      title: 'Mentorship Brown Bag',
      type: 'Workshop',
      date: '2026-04-17T00:00:00.000Z', // Friday
      startTime: '12:30 PM',
      endTime: '01:30 PM',
      attendees: ['All Staff', 'Mentees'],
      meetingLink: 'https://meet.google.com/lmn-opqr-stu',
      description: 'Luch-and-learn session on advanced data visualization techniques.'
    }
  ];

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-accent-orange font-black uppercase text-[10px] tracking-[0.3em]">
            <CalendarIcon className="w-4 h-4" />
            Operations Timeline
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-text-primary">Institutional Calendar</h1>
          <p className="text-[11px] text-text-secondary uppercase font-bold tracking-widest opacity-60">Synchronized coordination across Shega nodes</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-bg-surface border border-border-dim rounded-xl p-1 gap-1">
             <button className="p-2 hover:bg-bg-elevated rounded-lg transition-colors"><ChevronLeft className="w-4 h-4" /></button>
             <span className="px-4 text-[11px] font-black uppercase tracking-widest">April 2026</span>
             <button className="p-2 hover:bg-bg-elevated rounded-lg transition-colors"><ChevronRight className="w-4 h-4" /></button>
          </div>
          <button className="bg-bg-surface border border-border-dim hover:border-accent-orange text-[10px] font-black uppercase tracking-widest px-4 py-3 rounded-xl transition-all flex items-center gap-2">
            <Plus className="w-3.5 h-3.5" />
            New Event
          </button>
        </div>
      </header>

      <div className="grid grid-cols-7 gap-[1px] bg-border-dim border border-border-dim rounded-[2rem] overflow-hidden shadow-2xl">
        {weekDays.map(day => (
          <div key={day} className="bg-bg-elevated py-4 text-center text-[10px] font-black uppercase tracking-widest text-text-secondary">
            {day}
          </div>
        ))}
        
        {/* Placeholder cells to fill the calendar grid for April 2026 (April 1st is Wednesday) */}
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-bg-deep/30 min-h-[140px]" />
        ))}

        {Array.from({ length: 30 }).map((_, i) => {
          const day = i + 1;
          const dateStr = `2026-04-${day.toString().padStart(2, '0')}T00:00:00.000Z`;
          const dayEvents = events.filter(e => e.date === dateStr);

          return (
            <div key={day} className={cn(
              "bg-bg-surface min-h-[140px] p-2 flex flex-col gap-1 transition-colors hover:bg-bg-elevated/50 cursor-pointer group",
              day === 16 && "ring-2 ring-inset ring-accent-blue"
            )}>
              <div className="flex justify-between items-center mb-1">
                <span className={cn(
                  "text-xs font-black w-6 h-6 flex items-center justify-center rounded-lg transition-all",
                  day === 16 ? "bg-accent-blue text-white" : "text-text-secondary group-hover:text-text-primary"
                )}>
                  {day}
                </span>
              </div>
              
              <div className="flex flex-col gap-1">
                {dayEvents.map(event => (
                  <button 
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(event);
                    }}
                    className={cn(
                      "text-[9px] font-bold p-1.5 rounded-lg text-left truncate transition-all flex items-center gap-1.5",
                      event.type === 'Pitch' ? "bg-accent-blue/10 text-accent-blue border border-accent-blue/20" :
                      event.type === 'Sync' ? "bg-accent-orange/10 text-accent-orange border border-accent-orange/20" :
                      "bg-accent-green/10 text-accent-green border border-accent-green/20"
                    )}
                  >
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full shrink-0",
                      event.type === 'Pitch' ? "bg-accent-blue" :
                      event.type === 'Sync' ? "bg-accent-orange" :
                      "bg-accent-green"
                    )} />
                    {event.title}
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        {/* Padding for May */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={`empty-end-${i}`} className="bg-bg-deep/30 min-h-[140px]" />
        ))}
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-deep/80 backdrop-blur-md"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-bg-surface border border-border-dim rounded-[2.5rem] w-full max-w-lg shadow-[0_64px_128px_rgba(0,0,0,0.8)] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className={cn(
                "h-2",
                selectedEvent.type === 'Pitch' ? "bg-accent-blue" :
                selectedEvent.type === 'Sync' ? "bg-accent-orange" :
                "bg-accent-green"
              )} />
              
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-text-secondary tracking-[0.3em]">{selectedEvent.type} EVENT</span>
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-text-primary">{selectedEvent.title}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="p-2 hover:bg-bg-elevated rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-bg-deep rounded-xl flex items-center justify-center border border-border-dim">
                      <Clock className="w-5 h-5 text-accent-blue" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-black text-text-secondary tracking-widest">Time Buffer</div>
                      <div className="text-[13px] font-bold">{selectedEvent.startTime} - {selectedEvent.endTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-bg-deep rounded-xl flex items-center justify-center border border-border-dim">
                      <MapPin className="w-5 h-5 text-accent-orange" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-black text-text-secondary tracking-widest">Digital Node</div>
                      <a href={selectedEvent.meetingLink} target="_blank" rel="noreferrer" className="text-[13px] font-bold text-accent-blue hover:underline flex items-center gap-1">
                        Connect <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase font-black tracking-widest text-text-secondary">Context & Brief</h4>
                  <p className="text-[13px] font-medium leading-relaxed bg-bg-deep p-4 rounded-2xl border border-border-dim">
                    {selectedEvent.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase font-black tracking-widest text-text-secondary">Confined Attendees ({selectedEvent.attendees.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.attendees.map(person => (
                      <span key={person} className="flex items-center gap-1.5 bg-bg-elevated border border-border-dim px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-tight">
                        <Users className="w-3 h-3" />
                        {person}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-border-dim flex gap-4">
                  <button className="flex-1 bg-accent-blue text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:brightness-110 shadow-lg">
                    Add to Calendar Sync
                  </button>
                  <button className="flex-1 border border-border-dim hover:bg-bg-elevated py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-colors">
                    Edit Brief
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
