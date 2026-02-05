import React from 'react';
import { Platform } from '../types';
import { Linkedin, Instagram, Facebook, MessageCircle } from 'lucide-react';

interface PlatformSelectorProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
}

// Custom Pinterest Icon mimicking the brand "P"
const PinterestIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C24.012 5.367 18.633 0 12.017 0z" />
  </svg>
);

const platforms = [
  { id: Platform.LINKEDIN, icon: Linkedin, color: 'hover:text-blue-500 hover:border-blue-500 peer-checked:bg-blue-600 peer-checked:border-blue-600' },
  { id: Platform.PINTEREST, icon: PinterestIcon, color: 'hover:text-red-500 hover:border-red-500 peer-checked:bg-red-600 peer-checked:border-red-600' },
  { id: Platform.INSTAGRAM, icon: Instagram, color: 'hover:text-pink-500 hover:border-pink-500 peer-checked:bg-pink-600 peer-checked:border-pink-600' },
  { id: Platform.FACEBOOK, icon: Facebook, color: 'hover:text-blue-600 hover:border-blue-600 peer-checked:bg-blue-700 peer-checked:border-blue-700' },
  { id: Platform.THREADS, icon: MessageCircle, color: 'hover:text-gray-400 hover:border-gray-400 peer-checked:bg-gray-700 peer-checked:border-gray-700' },
];

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({ selected, onChange }) => {
  return (
    <div className="grid grid-cols-5 gap-2 w-full">
      {platforms.map((p) => (
        <label key={p.id} className="cursor-pointer group relative">
          <input
            type="radio"
            name="platform"
            value={p.id}
            checked={selected === p.id}
            onChange={() => onChange(p.id)}
            className="peer sr-only"
          />
          <div className={`
            flex flex-col items-center justify-center p-3 rounded-xl border border-slate-700 bg-slate-800/50 
            transition-all duration-200 
            peer-checked:text-white text-slate-400
            ${p.color}
          `}>
            <p.icon className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium hidden sm:block">{p.id}</span>
          </div>
          <div className="absolute inset-0 rounded-xl ring-2 ring-transparent peer-checked:ring-offset-2 peer-checked:ring-offset-slate-900 peer-checked:ring-indigo-500 transition-all pointer-events-none"></div>
        </label>
      ))}
    </div>
  );
};