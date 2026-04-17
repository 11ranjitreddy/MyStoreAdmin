import { useState } from 'react';
import { Store, Mail, Lock, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('auth_token', 'demo-secret-token');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center mb-4">
          <Store className="text-[#FC8019] w-10 h-10" />
        </div>
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to SwiggyOps
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Superadmin Dashboard Authentication
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] sm:rounded-2xl border border-gray-100 sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019] transition-colors"
                  placeholder="admin@groceryapp.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019] transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#FC8019] focus:ring-[#FC8019]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm border-b border-transparent hover:border-[#FC8019]">
                <a href="#" className="font-semibold text-[#FC8019] hover:text-[#E37316]">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center px-4 py-3 bg-[#FC8019] text-white rounded-xl hover:bg-[#E37316] shadow-lg shadow-[#FC8019]/25 transition-all font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FC8019]"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign in securely
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-xs text-gray-500">
            For demo purposes, enter any email and password to continue.
          </div>
        </div>
      </div>
    </div>
  );
}
