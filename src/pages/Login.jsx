import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('student'); // student, teacher, admin
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  // Validation functions
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

  // Handle input changes with real-time validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (touched.email) {
      const emailError = validateEmail(value);
      setErrors(prev => ({
        ...prev,
        email: emailError
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    if (touched.password) {
      const passwordError = validatePassword(value);
      setErrors(prev => ({
        ...prev,
        password: passwordError
      }));
    }
  };

  // Handle input blur (when user leaves the field)
  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    let error = '';
    if (field === 'email') {
      error = validateEmail(email);
    } else if (field === 'password') {
      error = validatePassword(password);
    }

    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      email: true,
      password: true
    });

    // Validate all fields
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    const newErrors = {
      email: emailError,
      password: passwordError
    };

    setErrors(newErrors);

    // If no errors, proceed with login
    if (!emailError && !passwordError) {
      console.log('Login attempt:', { email, password, userRole });
      
      // Navigate based on user role
      if (userRole === 'admin') {
        navigate('/admin');
      } else if (userRole === 'student') {
        navigate('/student/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };

  // Quick login buttons for demo
  const handleQuickLogin = (role) => {
    setUserRole(role);
    setEmail('demo@example.com');
    setPassword('123456');
    
    // Simulate login
    setTimeout(() => {
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'student') {
        navigate('/student/dashboard');
      } else {
        navigate('/dashboard');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        {/* Back to Home Button */}
        <div className="w-full max-w-lg mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="w-full max-w-lg p-10">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center space-x-2 mb-4">
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
            <p className="text-gray-600">Sign in to continue your Korean learning journey</p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Sign in as:
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setUserRole('student')}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                  userRole === 'student'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-bold">S</span>
                  </div>
                  <span>Student</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setUserRole('teacher')}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                  userRole === 'teacher'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs font-bold">T</span>
                  </div>
                  <span>Teacher</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setUserRole('admin')}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                  userRole === 'admin'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="w-3 h-3 text-purple-600" />
                  </div>
                  <span>Admin</span>
                </div>
              </button>
            </div>
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
              leftIcon={<Mail className="w-5 h-5" />}
              error={errors.email}
              required
            />

            <div>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => handleBlur('password')}
                placeholder="Enter your password"
                leftIcon={<Lock className="w-5 h-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
                error={errors.password}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
            >
              Sign In as {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </Button>

            <div className="text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <button
                type="button"
                onClick={handleSignUpClick}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up
              </button>
            </div>
          </form>

          {/* Quick Demo Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Quick Demo</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleQuickLogin('student')}
              >
                Demo Student
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleQuickLogin('teacher')}
              >
                Demo Teacher
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleQuickLogin('admin')}
              >
                Demo Admin
              </Button>
            </div>
          </div>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" size="md" className="w-full">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>

              <Button variant="outline" size="md" className="w-full">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Learn Korean with KoreanHwa</h1>
            <p className="text-xl opacity-90 mb-8">Join thousands of students mastering Korean</p>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span className="text-lg">Interactive lessons</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span className="text-lg">Native speakers</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span className="text-lg">Progress tracking</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-white bg-opacity-10 rounded-full"></div>
      </div>
    </div>
  );
};

export default Login;
