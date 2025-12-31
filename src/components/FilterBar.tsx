import React from 'react';
import { SKILL_OPTIONS } from '../types';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  selectedSkill: string | null;
  onSelectSkill: (skill: string | null) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ selectedSkill, onSelectSkill }) => {
  return (
    <div className="w-full mb-8 overflow-x-auto pb-4 custom-scrollbar">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-cosmic-silver text-sm font-medium mr-2">
          <Filter size={16} className="text-cosmic-cyan" />
          <span>Filter:</span>
        </div>
        
        <button
          onClick={() => onSelectSkill(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            selectedSkill === null
              ? 'bg-cosmic-cyan text-cosmic-navy shadow-[0_0_15px_rgba(6,215,244,0.3)]'
              : 'bg-white/5 text-cosmic-silver hover:bg-white/10 hover:text-white'
          }`}
        >
          All Talents
        </button>

        {SKILL_OPTIONS.map((skill) => (
          <button
            key={skill}
            onClick={() => onSelectSkill(selectedSkill === skill ? null : skill)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              selectedSkill === skill
                ? 'bg-cosmic-cyan text-cosmic-navy shadow-[0_0_15px_rgba(6,215,244,0.3)]'
                : 'bg-white/5 text-cosmic-silver hover:bg-white/10 hover:text-white'
            }`}
          >
            {skill}
          </button>
        ))}
      </div>
    </div>
  );
};