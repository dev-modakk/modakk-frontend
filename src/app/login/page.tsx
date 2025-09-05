'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LuGift, LuArrowLeft } from 'react-icons/lu';

const LoginPage: React.FC = () => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');

  // Phone number (digits only) and validation
  const [rawPhone, setRawPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // OTP state
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // ---------- Helpers ----------
  const isValidIndianMobile = (digits: string) => /^[6-9]\d{9}$/.test(digits);
  const toE164 = (digits: string) => `+91${digits}`;
  const formatIndianMobile = (digits: string) =>
    digits.replace(/(\d{5})(\d{0,5})/, (_, a, b) => (b ? `${a} ${b}` : a));

  // ---------- Effects ----------
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

  useEffect(() => {
    if (step === 'otp') {
      // Focus first OTP box on step change
      const first = document.getElementById('otp-0') as HTMLInputElement | null;
      first?.focus();
    }
  }, [step]);

  // ---------- Handlers ----------
  const handleGoogleLogin = () => {
    console.log('Google login initiated');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // keep only digits
    let d = e.target.value.replace(/\D/g, '');

    // if user pasted +91XXXXXXXXXX or 91XXXXXXXXXX, strip the country code
    if (d.startsWith('91') && d.length > 10) d = d.slice(2);
    if (d.length > 10) d = d.slice(0, 10);

    setRawPhone(d);
    if (phoneError) setPhoneError(null);
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidIndianMobile(rawPhone)) {
      setPhoneError('Enter a valid 10-digit Indian mobile number starting with 6–9.');
      return;
    }

    setIsLoading(true);

    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setCountdown(60);
      console.log('OTP sent to:', toE164(rawPhone)); // Send +91XXXXXXXXXX to backend
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return; // allow only a single digit

    const next = [...otp];
    next[index] = value;
    setOtp(next);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement | null;
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement | null;
      prevInput?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement | null;
      prevInput?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement | null;
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) return;

    setIsLoading(true);

    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsLoading(false);
      console.log('OTP verified:', otpString);
      // Handle successful login
    }, 1500);
  };

  const handleResendOtp = () => {
    if (!isValidIndianMobile(rawPhone)) return;
    setCountdown(60);
    console.log('Resending OTP to:', toE164(rawPhone));
  };

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <LuGift className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Sign In to Modakk
          </h1>

          <p className="text-lg text-slate-600">
            {step === 'phone'
              ? 'Enter your mobile number to continue'
              : 'Enter the 6-digit code sent to your phone'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          {step === 'phone' && (
            <>
              {/* Google button */}
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors duration-200 mb-6 font-medium text-slate-700"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.91l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500 font-medium">Or continue with</span>
                </div>
              </div>

              {/* Phone form */}
              <form onSubmit={handlePhoneSubmit} className="space-y-6" noValidate>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 py-3 border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm rounded-l-xl">
                      +91
                    </span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      pattern="[6-9][0-9]{9}"
                      autoComplete="tel-national"
                      required
                      value={formatIndianMobile(rawPhone)}
                      onChange={handlePhoneChange}
                      className={`flex-1 px-4 py-3 border ${phoneError ? 'border-red-500' : 'border-slate-300'
                        } rounded-r-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                      placeholder="98765 43210"
                      aria-invalid={!!phoneError}
                      aria-describedby={phoneError ? 'phone-error' : undefined}
                    />
                  </div>
                  {phoneError && (
                    <p id="phone-error" className="mt-2 text-sm text-red-600">
                      {phoneError}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-slate-500">We'll send you a verification code</p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !isValidIndianMobile(rawPhone)}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending code...
                    </>
                  ) : (
                    'Send verification code'
                  )}
                </button>
              </form>
            </>
          )}

          {step === 'otp' && (
            <>
              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={() => setStep('phone')}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                  aria-label="Back to phone"
                >
                  <LuArrowLeft className="w-4 h-4 text-slate-600" />
                </button>
                <span className="text-sm text-slate-600">
                  Code sent to +91 {formatIndianMobile(rawPhone)}
                </span>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-4">
                    Verification Code
                  </label>
                  <div className="flex gap-2 justify-center">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-12 text-center text-lg font-semibold border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        aria-label={`OTP digit ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  {countdown > 0 ? (
                    <p className="text-sm text-slate-500">Resend code in {countdown}s</p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                    >
                      Resend verification code
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || otp.join('').length !== 6}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Verifying...
                    </>
                  ) : (
                    'Verify and continue'
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Footer links */}
        <div className="text-center">
          <p className="text-slate-600">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              Create account
            </Link>
          </p>
        </div>

        <div className="text-center text-xs text-slate-500 space-y-1">
          <p>
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-blue-600 hover:text-blue-700">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
