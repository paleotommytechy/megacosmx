import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Loader } from '../components/ui/Loader';
import { ShieldAlert, CheckCircle, Clock, XCircle } from 'lucide-react';
import { FORCE_MOCK_DATA } from '../constants';

// Simplified type for the join query
type RequestWithTalent = {
  id: number;
  created_at: string;
  client_name: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  talents: {
    name: string;
  } | null;
};

export const AdminDashboard: React.FC = () => {
  const [requests, setRequests] = useState<RequestWithTalent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      
      const env = (import.meta as any).env || {};

      // Since RLS policies might block this without auth, we handle error gracefully
      // In a real app, this page would be protected by an Auth Guard component
      
      if (FORCE_MOCK_DATA || !env.VITE_SUPABASE_URL) {
        setRequests([
          {
            id: 1,
            created_at: new Date().toISOString(),
            client_name: 'Stark Industries',
            message: 'Need a reactor interface designed.',
            status: 'pending',
            talents: { name: 'Elena Voss' }
          }
        ]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('requests')
          .select(`
            *,
            talents (
              name
            )
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        // @ts-ignore - Supabase types join inference can be tricky without deep setup
        setRequests(data as RequestWithTalent[]);
      } catch (err: any) {
        console.error("Admin Fetch Error:", err);
        setError("Access Restricted. Ensure you are logged in as an administrator.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <div className="pt-20"><Loader /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Mission Control</h1>
        <div className="px-3 py-1 bg-cosmic-blue/20 text-cosmic-blue text-xs font-mono rounded border border-cosmic-blue/30">
          ADMIN MODE
        </div>
      </div>

      {error ? (
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl flex items-center gap-4 text-red-400">
          <ShieldAlert size={32} />
          <div>
            <h3 className="font-semibold text-lg">Access Denied</h3>
            <p className="text-sm opacity-80">{error}</p>
          </div>
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-xl border border-white/5">
          <p className="text-cosmic-silver">No active requests found.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.map((req) => (
            <div key={req.id} className="bg-black/40 border border-white/10 rounded-lg p-6 flex flex-col md:flex-row gap-6 hover:border-cosmic-blue/30 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-white">{req.client_name}</h3>
                  <span className="text-xs text-cosmic-silver bg-white/5 px-2 py-0.5 rounded">
                    Requesting: <span className="text-cosmic-cyan">{req.talents?.name || 'Unknown'}</span>
                  </span>
                </div>
                <p className="text-cosmic-silver text-sm mb-4">{req.message}</p>
                <div className="text-xs text-cosmic-silver/50 font-mono">
                  ID: #{req.id} • {new Date(req.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center md:flex-col justify-center gap-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1.5
                  ${req.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : ''}
                  ${req.status === 'accepted' ? 'bg-green-500/10 text-green-500' : ''}
                  ${req.status === 'rejected' ? 'bg-red-500/10 text-red-500' : ''}
                `}>
                  {req.status === 'pending' && <Clock size={12} />}
                  {req.status === 'accepted' && <CheckCircle size={12} />}
                  {req.status === 'rejected' && <XCircle size={12} />}
                  {req.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};