'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      router.push('/chat');
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    } else {
      alert('Check your email to confirm your account!');
    }
    setLoading(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background Gradient Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black animate-gradient-xy"
      />

      {/* Glow Orbs */}
      <motion.div
        className="absolute w-72 h-72 bg-indigo-600 rounded-full blur-3xl opacity-30"
        animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-30"
        animate={{ x: [0, -120, 120, 0], y: [0, 80, -80, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
      />

      {/* Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 10 }}
        className="relative z-10 bg-gray-800/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-sm"
      >
        {/* Title */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold text-center text-white mb-6"
        >
          Welcome Back 🚀
        </motion.h1>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <motion.input
            whileFocus={{ scale: 1.02, boxShadow: '0 0 15px rgba(99,102,241,0.5)' }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <motion.input
            whileFocus={{ scale: 1.02, boxShadow: '0 0 15px rgba(99,102,241,0.5)' }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="relative w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg 
                       shadow-md hover:bg-indigo-500 transition duration-300 
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              />
            ) : (
              'Log In'
            )}
          </motion.button>

          {/* Sign Up Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={handleSignUp}
            disabled={loading}
            className="w-full py-3 bg-gray-600 text-white font-semibold rounded-lg 
                       shadow-md hover:bg-gray-500 transition duration-300 
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign Up
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
