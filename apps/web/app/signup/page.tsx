'use client';

import { useRef } from 'react';
import { useSignup } from '../../hooks/useSignup';
import { useRouter } from 'next/navigation';


const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter()

  const { signup, isLoading } = useSignup();

  const handleSubmit = () => {
    const username = usernameRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    signup({ username, email, password });
  };

  return (
    <>
      <div>
        <div className='bg-[#0C1427] w-full h-screen flex items-center justify-center '>
          <div className='border-white/10 border shadow shadow-neutral-50/30 flex rounded-2xl overflow-hidden h-128'>
            {/* 1st part */}
            <div className='w-96 pl-8 pt-6 bg-[#060E20]'>
              <h1 className='text-4xl font-extrabold text-[#8B5CF6] mb-8 font-heading'>ExcaliCollab</h1>
              <p className='font-body text-2xl text-[#DAE2FD] font-bold'>
                Design in <span className='text-2xl text-[#89CEFF] font-bold italic'>real time</span> with your team.
              </p>
              <p className='text-lg text-[#404c6c] mt-1 font-body'>
                Experience the raw speed of a sketch tool with the precision of a professional design suite.
              </p>
            </div>
            {/* 2nd part */}
            <div className='w-96 flex p-12 flex-col gap-3 bg-[#131B2E]'>
              <p className='text-3xl font-bold text-[#DAE2FD] font-heading '>Create Account</p>
              <p className='text-xl  text-[#DAE2FD] font-body'>Start your collaborative journey today.</p>
              {/* input box and button */}
              <div className='flex flex-col gap-4 mt-4'>
                <input
                  ref={usernameRef}
                  className='border border-white/25 rounded-xl p-2 text-white/80'
                  placeholder='Enter Username'
                  type='text'
                />
                <input
                ref={emailRef}
                  className='border border-white/25 rounded-xl p-2 text-white/80'
                  placeholder='Enter Email'
                  type='email'
                />
                <input
                ref={passwordRef}
                  className='border border-white/25 rounded-xl p-2 text-white/80'
                  placeholder='Enter Password'
                  type='password'
                />
                <button onClick={handleSubmit} className='bg-primary mt-2 p-3 rounded-xl text-neutral font-body font-bold hover:cursor-pointer hover:-translate-y-1 transition-all'>
                  Create Account
                </button>
                <p className='text-white/80'>
                  Already have an account?{' '}
                  <span>
                    <button onClick={()=>router.push('/signin')} className='text-primary hover:cursor-pointer underline'>Sign in</button>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
