const Signin = () => {
  return (
    <>
      <div className='bg-[#1D2438] w-full h-screen flex flex-col items-center'>
        {/* TOPBAR */}
        <div className='w-full flex p-5 justify-between items-center'>
          <span className='text-3xl font-heading font-extrabold text-primary'>ExcalColab</span>
          <div className='flex gap-5 text-white/40'>
            <button>About</button>
            <button>Help</button>
          </div>
        </div>
        {/* MAIN_SECTION */}
        <div className='flex w-full p-10'>
          {/* TEXT   */}
          <div className='flex flex-col flex-1 justify-start items-start pl-7'>
            <p className='font-body text-white text-6xl '>
              Where ideas find their <span className='text-primary italic'>light</span>.
            </p>
            <p className='text-white/40 text-wrap text-lg py-5'>
              Access your infinite canvas. Collaborate in real-time with the world's most intuitive design space.
            </p>
            {/* CARDS */}
            <div className='flex w-full gap-10 pt-15'>
              <div className='flex flex-1 flex-col justify-between h-48 bg-[#222A3D] py-4 px-10 text-[#89CEFF] transition-all hover:-translate-y-2'>
                <p>Logo</p>
                <p>Precision Tools</p>
              </div>
              <div className='flex flex-1 flex-col justify-between h-48 bg-[#7645E0]/20 py-4 px-10 text-[#D0BCFF] transition-all hover:-translate-y-2'>
                <p>Logo</p>
                <p>Life Sync</p>
              </div>
            </div>
          </div>
          {/* CARD */}
          <div className='flex-1 pl-25'>
            <div className='min-w-sm max-w-lg border-white/10 border shadow-2xl shadow-[#000000] flex flex-col p-10 rounded-xl overflow-hidden h-128'>
              <p className='text-3xl font-bold text-[#DAE2FD] font-heading'>Sign In</p>
              <p className='mt-4 text-lg  text-[#DAE2FD] font-body'>Welcome back to your workspace..</p>
              {/* input box and button */}
              <div className='flex flex-col gap-8 mt-10'>
                <input
                  className='border border-white/25 rounded-xl p-2 text-white/80'
                  placeholder='Enter Email'
                  type='email' 
                />
                <input
                  className='border border-white/25 rounded-xl p-2 text-white/80'
                  placeholder='Enter Password'
                  type='password'
                />
                <button className='bg-primary mt-6 p-3 rounded-xl text-neutral font-body font-bold hover:cursor-pointer hover:-translate-y-1 transition-all'>
                  Sign In
                </button>
                <p className='text-white/80'>
                  Don't have a account{' '}
                  <span>
                    <button className='text-primary hover:cursor-pointer underline'>Sign up</button>
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

export default Signin;
