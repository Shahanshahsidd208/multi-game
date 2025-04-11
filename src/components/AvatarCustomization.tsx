import React from 'react';
import { motion } from 'framer-motion';
import { Paintbrush, Eye } from 'lucide-react';

interface AvatarCustomizationProps {
  onSave: (color: string, eyes: string) => void;
  onClose: () => void;
}

export function AvatarCustomization({ onSave, onClose }: AvatarCustomizationProps) {
  const [selectedColor, setSelectedColor] = React.useState('#6366F1');
  const [selectedEyes, setSelectedEyes] = React.useState('funny');

  const colors = [
    '#6366F1', // Indigo
    '#EC4899', // Pink
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#8B5CF6', // Purple
    '#EF4444', // Red
    '#3B82F6', // Blue
    '#14B8A6', // Teal
  ];

  const eyes = [
    { id: 'funny', label: '😄' },
    { id: 'sleepy', label: '😴' },
    { id: 'angry', label: '😠' },
    { id: 'cool', label: '😎' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-2xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-purple-200">Customize Your Avatar</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Paintbrush className="w-5 h-5" />
              Choose Color
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-lg transition-all ${
                    selectedColor === color
                      ? 'ring-2 ring-purple-400 scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Choose Eyes
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {eyes.map((eye) => (
                <button
                  key={eye.id}
                  onClick={() => setSelectedEyes(eye.id)}
                  className={`w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-2xl transition-all ${
                    selectedEyes === eye.id
                      ? 'ring-2 ring-purple-400 scale-110'
                      : 'hover:scale-105'
                  }`}
                >
                  {eye.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <div className="bg-white/10 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full"
                  style={{ backgroundColor: selectedColor }}
                >
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    {eyes.find((e) => e.id === selectedEyes)?.label}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Preview</h4>
                  <p className="text-sm text-purple-200">Your avatar appearance</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => onSave(selectedColor, selectedEyes)}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}