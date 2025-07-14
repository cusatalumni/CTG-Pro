import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../Spinner';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
        const success = login({ email, password });
        if (!success) {
            setError('Invalid email or password.');
        }
        setLoading(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-white">Welcome Back!</h2>
       {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-md text-center">{error}</p>}
      <div>
        <label htmlFor="email-login" className="block text-sm font-medium text-slate-300">Email</label>
        <input
          id="email-login"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mt-1 p-3 bg-slate-800 border-2 border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="password-login" className="block text-sm font-medium text-slate-300">Password</label>
        <input
          id="password-login"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mt-1 p-3 bg-slate-800 border-2 border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg text-lg transition-colors flex items-center justify-center disabled:bg-slate-700 disabled:cursor-not-allowed"
      >
        {loading ? <Spinner /> : 'Log In'}
      </button>
    </form>
  );
};

export default Login;
