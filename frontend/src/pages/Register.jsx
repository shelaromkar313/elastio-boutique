import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await register(name, email, password);
      // After successful registration, redirect to login
      navigate('/login');
    } catch (err) {
      let errorMessage = 'Failed to register. Please try again.';
      if (err.response?.data) {
        // Handle Laravel validation errors returned as JSON strings or objects
        try {
          const errors = typeof err.response.data === 'string' ? JSON.parse(err.response.data) : err.response.data;
          const firstErrorKey = Object.keys(errors)[0];
          errorMessage = errors[firstErrorKey][0];
        } catch (e) {
          errorMessage = err.response.data.message || errorMessage;
        }
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 m-4 bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl shadow-pink-500/10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-500">Create Account</h2>
          <p className="text-gray-400 mt-2">Join us to start shopping</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-white placeholder-gray-500 transition-all"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-white placeholder-gray-500 transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-white placeholder-gray-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-pink-500/50 disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-400 hover:text-pink-300 font-medium transition-colors">
            Sign in here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
