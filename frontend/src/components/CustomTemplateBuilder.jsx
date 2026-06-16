/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'
import { Check, Columns2, Columns3, AlignLeft, AlignCenter, SplitSquareHorizontal, ArrowUp, ArrowDown } from 'lucide-react'

const SECTION_LABELS = {
  summary: 'Summary',
  workExperience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
  languages: 'Languages',
  interests: 'Interests',
}

const PRESET_COLORS = [
  { name: 'Light Pink', value: '#E88FA2' },
  { name: 'Hot Pink', value: '#ff2d78' },
  { name: 'Violet', value: '#7c3aed' },
  { name: 'Amber', value: '#d97706' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'Teal', value: '#0d9488' },
]

const LAYOUT_OPTIONS = [
  { id: 'single', label: 'Single Column', icon: AlignLeft },
  { id: 'two-column-left', label: 'Two Column (Left)', icon: Columns2 },
  { id: 'two-column-right', label: 'Two Column (Right)', icon: Columns3 },
]

const HEADER_OPTIONS = [
  { id: 'left-aligned', label: 'Left Aligned', icon: AlignLeft },
  { id: 'centered', label: 'Centered', icon: AlignCenter },
  { id: 'split', label: 'Split', icon: SplitSquareHorizontal },
]

const CustomTemplateBuilder = ({ config, onChange, resumeData }) => {
  const dynamicSectionLabels = { ...SECTION_LABELS }
  if (resumeData?.customSections) {
    resumeData.customSections.forEach(sec => {
      if (sec.id) {
        dynamicSectionLabels[sec.id] = sec.title || 'Custom Section'
      }
    })
  }

  // Ensure any newly added sections that aren't in sectionOrder are appended
  const currentOrder = config.sectionOrder || Object.keys(SECTION_LABELS);
  const allAvailableKeys = Object.keys(dynamicSectionLabels);
  const missingKeys = allAvailableKeys.filter(k => !currentOrder.includes(k));
  const effectiveSectionOrder = [...currentOrder, ...missingKeys];

  const updateConfig = (key, value) => {
    onChange({ ...config, [key]: value })
  }

  const updateVisibleSection = (section, isVisible) => {
    const visibleSections = { ...(config.visibleSections || {}) }
    visibleSections[section] = isVisible
    updateConfig('visibleSections', visibleSections)
  }

  const moveSection = (index, direction) => {
    const order = [...effectiveSectionOrder]
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= order.length) return
    const temp = order[index]
    order[index] = order[newIndex]
    order[newIndex] = temp
    updateConfig('sectionOrder', order)
  }

  return (
    <div className="space-y-6 p-4">
      {/* Layout Selection */}
      <div>
        <h3 className="text-sm font-bold text-stone-700 mb-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-neon-pink"></div>
          Layout
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {LAYOUT_OPTIONS.map(opt => {
            const Icon = opt.icon
            const isActive = config.layout === opt.id
            return (
              <button
                key={opt.id}
                onClick={() => updateConfig('layout', opt.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-xs font-medium ${
                  isActive
                    ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan'
                    : 'border-stone-200 bg-stone-50 text-stone-500 hover:border-stone-300'
                }`}
              >
                <Icon size={18} />
                <span>{opt.label}</span>
                {isActive && <Check size={12} className="text-neon-cyan" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Header Style */}
      <div>
        <h3 className="text-sm font-bold text-stone-700 mb-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan"></div>
          Header Style
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {HEADER_OPTIONS.map(opt => {
            const Icon = opt.icon
            const isActive = config.headerStyle === opt.id
            return (
              <button
                key={opt.id}
                onClick={() => updateConfig('headerStyle', opt.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-xs font-medium ${
                  isActive
                    ? 'border-neon-pink bg-neon-pink/10 text-neon-pink'
                    : 'border-stone-200 bg-stone-50 text-stone-500 hover:border-stone-300'
                }`}
              >
                <Icon size={18} />
                <span>{opt.label}</span>
                {isActive && <Check size={12} className="text-neon-pink" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Accent Color */}
      <div>
        <h3 className="text-sm font-bold text-stone-700 mb-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan"></div>
          Accent Color
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {PRESET_COLORS.map(color => (
            <button
              key={color.value}
              onClick={() => updateConfig('accentColor', color.value)}
              className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                config.accentColor === color.value ? 'border-stone-300 scale-110 shadow-md' : 'border-transparent shadow-sm'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-stone-500">Custom:</label>
          <input
            type="color"
            value={config.accentColor || '#E88FA2'}
            onChange={(e) => updateConfig('accentColor', e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border border-stone-200"
          />
          <span className="text-xs text-stone-400 font-mono">{config.accentColor}</span>
        </div>
      </div>

      {/* Section Visibility & Order */}
      <div>
        <h3 className="text-sm font-bold text-stone-700 mb-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-neon-pink"></div>
          Sections
        </h3>
        <div className="space-y-1.5">
          {effectiveSectionOrder.map((section, index) => {
            // Only render sections that still exist
            if (!dynamicSectionLabels[section]) return null;
            return (
            <motion.div
              key={section}
              layout
              className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200"
            >
              <label className="flex items-center gap-2 flex-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.visibleSections?.[section] !== false}
                  onChange={(e) => updateVisibleSection(section, e.target.checked)}
                  className="w-4 h-4 rounded accent-neon-pink"
                />
                <span className={`text-xs font-bold ${
                  config.visibleSections?.[section] !== false ? 'text-stone-700' : 'text-stone-400 line-through'
                }`}>
                  {dynamicSectionLabels[section]}
                </span>
              </label>
              <div className="flex gap-1">
                <button
                  onClick={() => moveSection(index, -1)}
                  disabled={index === 0}
                  className="p-1 rounded text-stone-400 hover:text-neon-pink disabled:opacity-30 transition-colors"
                >
                  <ArrowUp size={12} />
                </button>
                <button
                  onClick={() => moveSection(index, 1)}
                  disabled={index === effectiveSectionOrder.length - 1}
                  className="p-1 rounded text-stone-400 hover:text-neon-pink disabled:opacity-30 transition-colors"
                >
                  <ArrowDown size={12} />
                </button>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default CustomTemplateBuilder
