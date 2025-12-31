import React, { useState } from 'react';
import { useTalents } from '../hooks/useTalents';
import { TalentCard } from '../components/TalentCard';
import { FilterBar } from '../components/FilterBar';
import { Loader } from '../components/ui/Loader';
import { Search } from 'lucide-react';

export const Home: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const { talents, loading, error } = useTalents(selectedSkill);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 text-center border-b border-white/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cosmic-blue/20 via-cosmic-navy to-cosmic-navy">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Discover Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-cosmic-cyan to-cosmic-blue">Top Talent</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-cosmic-silver">
          MegacosmX closes the discovery gap. Find verified engineers, designers, and innovators ready to launch your next mission.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-cosmic-navy border border-white/5 rounded-2xl shadow-2xl p-6 sm:p-8">
          
          <FilterBar selectedSkill={selectedSkill} onSelectSkill={setSelectedSkill} />

          {loading ? (
            <Loader />
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400 mb-2">System Malfunction</p>
              <p className="text-cosmic-silver text-sm">{error}</p>
            </div>
          ) : talents.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Search className="text-cosmic-silver/50" size={32} />
              </div>
              <h3 className="text-lg font-medium text-white mb-1">No Talent Found</h3>
              <p className="text-cosmic-silver text-sm">Try adjusting your filters to explore more options.</p>
              <button 
                onClick={() => setSelectedSkill(null)}
                className="mt-4 text-cosmic-cyan hover:underline text-sm"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {talents.map((talent) => (
                <TalentCard key={talent.id} talent={talent} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};