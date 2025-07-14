import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthScreen: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="w-full max-w-md mx-auto bg-slate-800/50 p-8 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700">
      <div className="flex justify-center mb-6 border-b border-slate-700">
        <button
          onClick={() => setIsLoginView(true)}
          className={`px-6 py-2 text-lg font-semibold transition-colors ${isLoginView ? 'text-white border-b-2 border-cyan-500' : 'text-slate-400'}`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLoginView(false)}
          className={`px-6 py-2 text-lg font-semibold transition-colors ${!isLoginView ? 'text-white border-b-2 border-cyan-500' : 'text-slate-400'}`}
        >
          Register
        </button>
      </div>
      {isLoginView ? <Login /> : <Register />}
    </div>
  );
};

export default AuthScreen;
