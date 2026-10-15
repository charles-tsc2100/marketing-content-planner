import React, { useState } from 'react';
import { BrandIdentity } from '../types';
import { Check, Plus, Trash2, Palette, Target, Compass, Sparkles } from 'lucide-react';

interface BrandIdentityViewProps {
  brandIdentity: BrandIdentity;
  onUpdate: (partial: Partial<BrandIdentity>) => void;
  onOpenAiStudio: () => void;
}

export const BrandIdentityView: React.FC<BrandIdentityViewProps> = ({
  brandIdentity,
  onUpdate,
  onOpenAiStudio,
}) => {
  const [formData, setFormData] = useState<BrandIdentity>(brandIdentity);
  const [newPillar, setNewPillar] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const addPillar = () => {
    if (!newPillar.trim()) return;
    if (formData.pillars.includes(newPillar.trim())) return;
    const updated = [...formData.pillars, newPillar.trim()];
    setFormData(prev => ({ ...prev, pillars: updated }));
    onUpdate({ pillars: updated });
    setNewPillar('');
  };

  const removePillar = (index: number) => {
    const updated = formData.pillars.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, pillars: updated }));
    onUpdate({ pillars: updated });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header Intro */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Module 00 · Foundation</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Set Up + Brand Identity (การตั้งค่าและแบรนด์)
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            กำหนด DNA ของแบรนด์ เสาหลักของคอนเทนต์ (Content Pillars) โทนการสื่อสาร และเป้าหมายทางการเงิน เพื่อให้ระบบดึงไปใช้อัตโนมัติทุกเดือน
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenAiStudio}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>วิเคราะห์ Brand Tone ด้วย Gemini</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Basic Profile */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 shadow-xs">
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <span>ข้อมูลพื้นฐานของแบรนด์ (Brand Profile)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                ชื่อแบรนด์หรือช่อง (Brand / Creator Name)
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="เช่น KINN Studio"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                ชื่อผู้ใช้ / Handle (@username)
              </label>
              <input
                type="text"
                value={formData.handle}
                onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
                placeholder="เช่น @kinn.studio"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                คำอธิบายสั้นหรือ Bio ของช่อง
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={2}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="อธิบายจุดเด่นและสิ่งที่ผู้ชมจะได้รับเมื่อติดตามช่องคุณ..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Avatar Image URL (ลิงก์รูปโปรไฟล์)
              </label>
              <div className="flex gap-4 items-center">
                <img 
                  src={formData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} 
                  alt="Brand Profile"
                  className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <input
                  type="url"
                  value={formData.avatarUrl}
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                  className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Content Pillars */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                เสาหลักของคอนเทนต์ (Content Pillars)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                หมวดหมู่หลัก 4–5 เสา ที่ช่วยคุมความหลากหลายและจุดยืนของช่อง ไม่ให้หลุดโฟกัส
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {formData.pillars.map((pillar, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-mono text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span className="font-medium">{pillar}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removePillar(idx)}
                  className="text-slate-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                  title="Remove pillar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <input
              type="text"
              value={newPillar}
              onChange={(e) => setNewPillar(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addPillar(); } }}
              placeholder="เพิ่ม Content Pillar ใหม่ (เช่น Tips & Tricks, รีวิวลูกค้า, ไลฟ์สไตล์)..."
              className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={addPillar}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>เพิ่มเสาหลัก</span>
            </button>
          </div>
        </div>

        {/* Section 3: Tone of Voice & Audience Persona */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 shadow-xs">
          <h3 className="text-base font-semibold text-slate-900">
            กลุ่มเป้าหมาย & น้ำเสียงของแบรนด์ (Audience & Tone)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-indigo-600" />
                <span>กลุ่มเป้าหมายในอุดมคติ (Audience Persona)</span>
              </label>
              <textarea
                value={formData.audiencePersona}
                onChange={(e) => setFormData({ ...formData, audiencePersona: e.target.value })}
                rows={3}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="ระบุอายุ อาชีพ ปัญหาที่พวกเขาเจอ และสิ่งที่มีคุณค่าสำหรับพวกเขา..."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-indigo-600" />
                <span>น้ำเสียงและบุคลิกในการสื่อสาร (Tone of Voice)</span>
              </label>
              <textarea
                value={formData.toneOfVoice}
                onChange={(e) => setFormData({ ...formData, toneOfVoice: e.target.value })}
                rows={3}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="เช่น สุภาพเป็นกันเอง อธิบายเรื่องยากให้เข้าใจง่าย ไม่ขายตรงเกินไป..."
              />
            </div>
          </div>
        </div>

        {/* Section 4: Monthly Financial Targets */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-semibold text-slate-900">
            เป้าหมายทางการเงินต่อเดือน (Financial Benchmarks)
          </h3>
          <p className="text-xs text-slate-500">
            ใช้ในการคำนวณและแสดงผลใน Smart Dashboard และ Finance & ROI Tracker
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                เป้างบประมาณต่อเดือน (Monthly Budget Limit - ฿)
              </label>
              <input
                type="number"
                value={formData.monthlyBudgetGoal}
                onChange={(e) => setFormData({ ...formData, monthlyBudgetGoal: Number(e.target.value) || 0 })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                รวมค่าผลิตคอนเทนต์ + งบยิงโฆษณา (Ad Spend)
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                เป้ายอดขาย/รายได้ต่อเดือน (Monthly Revenue Target - ฿)
              </label>
              <input
                type="number"
                value={formData.monthlyRevenueGoal}
                onChange={(e) => setFormData({ ...formData, monthlyRevenueGoal: Number(e.target.value) || 0 })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                เป้ายอดขายที่ต้องการให้คอนเทนต์สร้างได้
              </span>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1.5 animate-fade-in">
              <Check className="w-4 h-4" />
              บันทึกข้อมูลเรียบร้อยแล้ว ทุกโมดูลซิงค์อัตโนมัติ
            </span>
          ) : <div />}

          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            บันทึกการตั้งค่าแบรนด์ (Save Brand Identity)
          </button>
        </div>
      </form>
    </div>
  );
};
