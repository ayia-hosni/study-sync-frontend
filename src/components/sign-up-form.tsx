import React, { useState } from 'react';
import { StarIcon } from './icons/star-icon';
import { GoogleIcon } from './icons/google-icon';
import { FacebookIcon } from './icons/facebook-icon';
import { FormField } from './ui/form-field';
import { SocialButton } from './ui/social-button';
import { CustomCheckbox } from './ui/custom-checkbox';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'Create a strong password',
    confirmPassword: 'Confirm your password',
    agreeToTerms: false
  });

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const handleGoogleSignUp = () => {
    console.log('Google sign up clicked');
    // Handle Google OAuth logic here
  };

  const handleFacebookSignUp = () => {
    console.log('Facebook sign up clicked');
    // Handle Facebook OAuth logic here
  };

  const handleSignIn = () => {
    console.log('Sign in clicked');
    // Handle navigation to sign in page
  };

  return (
    <main className="max-w-none w-full min-h-screen flex flex-col items-center box-border bg-white mx-auto px-0 py-4 max-md:max-w-[991px] max-sm:max-w-screen-sm max-sm:p-4">
      {/* Header Section */}
      <header className="text-center mb-8">
        <div className="w-12 h-12 flex items-center justify-center bg-[#702DFF] mb-[23px] rounded-[50%] mx-auto">
          <StarIcon />
        </div>
        <h1 className="text-[#202020] text-center text-2xl font-bold leading-9 mb-[9px] max-sm:text-xl max-sm:leading-[30px]">
          Create Account
        </h1>
        <p className="text-[#7E7E7E] text-center text-sm font-normal leading-[21px] max-w-[351px] max-sm:text-[13px] max-sm:leading-[19px] max-sm:max-w-[300px]">
          Join StudySync and start your learning journey today
        </p>
      </header>

      {/* Form Section */}
      <section className="w-[450px] border shadow-[0px_14px_42px_0px_rgba(8,15,52,0.06)] box-border bg-white p-[33px] rounded-[20px] border-solid border-[#F0F0F0] max-md:w-[90%] max-md:max-w-[450px] max-md:p-6 max-sm:w-full max-sm:max-w-[400px] max-sm:p-5 max-sm:rounded-2xl">
        <form onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div className="flex gap-4 mb-6 max-md:flex-col max-md:gap-4 max-sm:gap-3">
            <FormField
              label="First Name"
              type="text"
              placeholder="John"
              value={formData.firstName}
              onChange={(value) => updateField('firstName', value)}
            />
            <FormField
              label="Last Name"
              type="text"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(value) => updateField('lastName', value)}
            />
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <FormField
              label="Email Address"
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={(value) => updateField('email', value)}
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <FormField
              label="Password"
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(value) => updateField('password', value)}
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <FormField
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(value) => updateField('confirmPassword', value)}
            />
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start gap-3 mb-6 max-sm:items-start">
            <CustomCheckbox
              checked={formData.agreeToTerms}
              onChange={(checked) => updateField('agreeToTerms', checked)}
            />
            <div className="text-sm leading-[21px] max-sm:text-[13px] max-sm:leading-[19px]">
              <span className="text-[#202020] font-normal">I agree to the </span>
              <button 
                type="button" 
                className="text-[#36C] font-normal hover:underline"
                onClick={() => console.log('Terms of Service clicked')}
              >
                Terms of Service
              </button>
              <span className="text-[#202020] font-normal"> and </span>
              <button 
                type="button" 
                className="text-[#36C] font-normal hover:underline"
                onClick={() => console.log('Privacy Policy clicked')}
              >
                Privacy Policy
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full h-12 cursor-pointer bg-[#702DFF] mb-6 rounded-xl border-none hover:bg-[#5a24cc] transition-colors max-sm:h-11"
            disabled={!formData.agreeToTerms}
          >
            <span className="text-white text-center text-sm font-semibold leading-[21px]">
              Create Account
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center relative mb-4">
            <div className="flex-1 h-px bg-[#F0F0F0]" />
            <span className="text-[#7E7E7E] text-center text-xs font-normal leading-[18px] bg-white px-4 py-0">
              Or sign up with
            </span>
            <div className="flex-1 h-px bg-[#F0F0F0]" />
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-3 mb-6 max-md:flex-col max-md:items-center">
            <SocialButton
              icon={<GoogleIcon />}
              text="Google"
              onClick={handleGoogleSignUp}
            />
            <SocialButton
              icon={<FacebookIcon />}
              text="Facebook"
              onClick={handleFacebookSignUp}
            />
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <span className="text-[#7E7E7E] text-sm font-normal leading-[21px] mr-1">
              Already have an account?
            </span>
            <button 
              type="button"
              onClick={handleSignIn}
              className="text-[#36C] text-sm font-semibold leading-[21px] hover:underline"
            >
              Sign in
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};
