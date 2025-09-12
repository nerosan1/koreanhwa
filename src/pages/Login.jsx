import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Button from '../components/common/Button';
import Header from '../components/layout/Header';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import Footer from '../components/layout/Footer';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('student');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (touched.email) {
      const emailError = validateEmail(value);
      setErrors(prev => ({ ...prev, email: emailError }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) {
      const passwordError = validatePassword(value);
      setErrors(prev => ({ ...prev, password: passwordError }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    let error = '';
    if (field === 'email') error = validateEmail(email);
    else if (field === 'password') error = validatePassword(password);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const newErrors = { email: emailError, password: passwordError };
    setErrors(newErrors);
    if (!emailError && !passwordError) {
      console.log('Login attempt:', { email, password, userRole });
      if (userRole === 'admin') navigate('/admin');
      else if (userRole === 'student') navigate('/student/dashboard');
      else navigate('/dashboard');
    }
  };

  const handleSignUpClick = () => navigate('/register');

  const handleQuickLogin = (role) => {
    setUserRole(role);
    setEmail('demo@example.com');
    setPassword('123456');
    setTimeout(() => {
      if (role === 'admin') navigate('/admin');
      else if (role === 'student') navigate('/student/dashboard');
      else navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Background Image with White Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://i.pinimg.com/1200x/72/52/60/7252601c70c5a2a2fbf96e8ed0c01da1.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-white opacity-50 z-0"></div>
      </div>
      <div className="relative min-h-screen flex">
        <div className="w-full flex flex-col justify-center items-end p-8 mr-10">
          {/* Back to Home Button */}
          <div className="w-full max-w-lg mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-black-400 hover:text-black-500 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <Card className="w-full max-w-lg p-10 bg-white/30 backdrop-blur-sm border border-yellow-400 rounded-lg shadow-lg">
            {/* Logo */}
            <div className="text-center mb-10">
              <h2 className="text-4xl font-extrabold text-black-400 mb-2">Welcome back!</h2>
              <p className="text-black-300">Sign in to continue your Korean learning journey</p>
            </div>
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => handleBlur('email')}
                placeholder="Enter your email address"
                leftIcon={<Mail className="w-5 h-5 text-black-400" />}
                error={errors.email}
                inputClassName="bg-gray-900 border-yellow-400 text-black-300 placeholder-yellow-500 focus:border-yellow-500 focus:ring-yellow-500"
                required
              />
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => handleBlur('password')}
                placeholder="Enter your password"
                leftIcon={<Lock className="w-5 h-5 text-black-400" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-black-400 hover:text-black-500"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
                error={errors.password}
                inputClassName="bg-gray-900 border-yellow-400 text-black-300 placeholder-yellow-500 focus:border-yellow-500 focus:ring-yellow-500"
                required
              />
              <div className="flex items-center justify-between text-black-300">
                <label className="flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="rounded border-yellow-400 text-black-400 focus:ring-yellow-500"
                  />
                  <span className="ml-2 text-sm">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-black-400 hover:text-black-500 font-medium transition-colors duration-300"
                >
                  Forgot password?
                </button>
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full bg-yellow-500 hover:bg-yellow-500 text-black-900 font-bold transition-colors duration-300"
              >
                Sign In as {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </Button>
              <div className="text-center text-black-300">
                <span>Don't have an account? </span>
                <button
                  type="button"
                  onClick={handleSignUpClick}
                  className="text-black-400 hover:text-black-500 font-medium transition-colors duration-300"
                >
                  Sign up
                </button>
              </div>
            </form>
            {/* Quick Demo Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="relative flex justify-center text-sm text-black-400 font-semibold px-2">
                  Quick Demo
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-yellow-400 text-black-400 hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                  onClick={() => handleQuickLogin('student')}
                >
                  Demo Student
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-yellow-400 text-black-400 hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                  onClick={() => handleQuickLogin('teacher')}
                >
                  Demo Teacher
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-yellow-400 text-black-400 hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                  onClick={() => handleQuickLogin('admin')}
                >
                  Demo Admin
                </Button>
              </div>
            </div>
            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="relative flex justify-center text-sm text-black-400 font-semibold px-2">
                  Or continue with
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full border-yellow-400 text-black-400 hover:bg-yellow-400 hover:text-gray-900 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="w-full border-yellow-400 text-black-400 hover:bg-yellow-400 hover:text-gray-900 transition-colors flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;