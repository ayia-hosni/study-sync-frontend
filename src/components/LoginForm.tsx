import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { InputField } from '@/components/ui/input-field';
import { SocialButton } from '@/components/ui/social-button';
import { CustomCheckbox } from '@/components/ui/custom-checkbox';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  onSocialLogin?: (provider: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onForgotPassword,
  onSignUp,
  onSocialLogin,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const handleFormSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success('Sign in successful!');
      onSubmit?.(data);
    } catch (error) {
      toast.error('Sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider} login clicked`);
    onSocialLogin?.(provider);
  };

  const handleForgotPassword = () => {
    toast.info('Forgot password clicked');
    onForgotPassword?.();
  };

  const handleSignUp = () => {
    toast.info('Sign up clicked');
    onSignUp?.();
  };

  return (
    <section
      className="bg-white shadow-[0px_8px_24px_rgba(8,15,52,0.06)] border flex w-full flex-col items-stretch p-6 rounded-2xl border-[rgba(240,240,240,1)] border-solid max-w-md mx-auto max-md:px-4"
      aria-labelledby="login-heading"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <fieldset disabled={isLoading} className="space-y-4">
          <legend className="sr-only">Sign in to your account</legend>
          <InputField
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            {...register('email')}
            error={errors.email?.message}
            icon={
              <img
                src="https://api.builder.io/api/v1/image/assets/f16bc7bb09694689bc28cb8eb3e754f2/0a6f60e98c6ac83cf1dfd3c288855ed3b8020296?placeholderIfAbsent=true"
                alt=""
                className="aspect-[1] object-contain w-5 shrink-0"
                aria-hidden="true"
              />
            }
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register('password')}
            error={errors.password?.message}
            icon={
              <img
                src="https://api.builder.io/api/v1/image/assets/f16bc7bb09694689bc28cb8eb3e754f2/fed0e2ba522544fd165329cf691c73c4e593d897?placeholderIfAbsent=true"
                alt=""
                className="aspect-[1] object-contain w-5 shrink-0"
                aria-hidden="true"
              />
            }
          />
          <div className="flex w-full items-center justify-between gap-2 font-normal">
            <CustomCheckbox
              id="rememberMe"
              label="Remember me"
              {...register('rememberMe')}
            />
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-[rgba(51,102,204,1)] text-xs hover:underline focus:outline-none focus:underline"
            >
              Forgot password?
            </button>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[rgba(112,45,255,1)] flex flex-col items-center text-white font-semibold text-center justify-center w-full px-6 py-2.5 rounded-xl hover:bg-[rgba(112,45,255,0.9)] focus:outline-none focus:ring-2 focus:ring-[rgba(112,45,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </fieldset>
      </form>
      <div className="relative mt-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[rgba(240,240,240,1)]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-2 text-[rgba(126,126,126,1)] font-normal">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex items-stretch gap-2 mt-3">
        <SocialButton
          icon={<img src="https://api.builder.io/api/v1/image/assets/f16bc7bb09694689bc28cb8eb3e754f2/507ce938a5d2626e4f274496d0d43b2cc5fb90c7?placeholderIfAbsent=true" alt="Google" className="w-5 h-5" />}
          text="Google"
          onClick={() => handleSocialLogin('Google')}
        />
        <SocialButton
          icon={<img src="https://api.builder.io/api/v1/image/assets/f16bc7bb09694689bc28cb8eb3e754f2/7ee156e5932f1331a70b1d844a890223e56c5243?placeholderIfAbsent=true" alt="Facebook" className="w-5 h-5" />}
          text="Facebook"
          onClick={() => handleSocialLogin('Facebook')}
        />
      </div>
      <div className="self-center flex items-center gap-1 text-center mt-4">
        <span className="text-[rgba(126,126,126,1)] font-normal text-xs">
          Don't have an account?
        </span>
        <button
          type="button"
          onClick={handleSignUp}
          className="text-[rgba(51,102,204,1)] font-semibold hover:underline focus:outline-none focus:underline text-xs"
        >
          Sign up
        </button>
      </div>
    </section>
  );
};
