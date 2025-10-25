import React from 'react';
import { LoginForm } from '@/components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { LOGIN_MUTATION } from '@/graphql/mutations/login';
import { graphqlClient } from '@/lib/graphql-client'; // use raw client without token

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      // Use public client (no token) for login
      const client = graphqlClient();
      const data = await client.request(LOGIN_MUTATION, {
        input: { email, password }
      });

      const token = data?.login?.access_token;
      const user = data?.login?.user;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Redirecting to dashboard...');
        window.location.href = '/'; // redirect to home/dashboard
      } else {
        alert('Login failed. Please check credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Invalid email or password.');
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login clicked`);
  };

  return (
    <main className="bg-white overflow-hidden text-sm min-h-screen">
      <div className="bg-white flex w-full flex-col items-center justify-center px-4 py-8 max-md:max-w-full max-md:px-2">
        <div className="flex w-[400px] max-w-full flex-col items-center">
          <header className="text-center mb-4">
            <img
              src="https://api.builder.io/api/v1/image/assets/f16bc7bb09694689bc28cb8eb3e754f2/24d1ff8ea48fec879577618a09d910370ca5f3f8?placeholderIfAbsent=true"
              alt="Learning Platform Logo"
              className="aspect-[1] object-contain w-10 rounded-full mx-auto mb-2"
            />
            <h1 className="text-[rgba(32,32,32,1)] text-base font-bold text-center mt-2 mb-0">
              Welcome Back
            </h1>
            <p className="text-[rgba(126,126,126,1)] font-normal text-center mb-2 text-xs">
              Sign in to continue your learning journey
            </p>
          </header>

          <LoginForm
            onSubmit={handleLogin}
            onForgotPassword={handleForgotPassword}
            onSignUp={handleSignUp}
            onSocialLogin={handleSocialLogin}
          />
        </div>
      </div>
    </main>
  );
};

export default Login;
