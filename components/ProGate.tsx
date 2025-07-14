

import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProGate: React.FC = () => {
  const { user, goPro, logout } = useAuth();

  const handleUpgrade = () => {
    // In a real app, this would trigger a payment flow.
    // For this version, we'll just upgrade the user directly.
    goPro();
    alert('You have been upgraded to Pro!');
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-800/50 p-8 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700 text-center">
      <div className="flex justify-end w-full">
        <button onClick={logout} className="text-slate-400 hover:text-white transition">Logout</button>
      </div>
      <h1 className="text-4xl font-bold text-cyan-400 mb-4">Go Pro!</h1>
      <p className="text-slate-300 text-lg mb-8">
        Welcome, {user?.name}! Unlock the full quiz experience to test your knowledge and earn certificates.
      </p>

      <button
        onClick={handleUpgrade}
        className="w-full max-w-xs mx-auto bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg text-lg transition-colors flex items-center justify-center mb-8"
      >
        Upgrade to Pro
      </button>

      <p className="text-slate-500 mt-8 text-sm">
        An initiative by Concrete Technology Group | <a href="https://annapoornainfo.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">annapoornainfo.com</a>
      </p>
    </div>
  );
};

export default ProGate;