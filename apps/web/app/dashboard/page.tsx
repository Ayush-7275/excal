'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [joinCode, setJoinCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Auth Guard: Kick them out if they aren't logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
    }
  }, [router]);

  const handleCreateRoom = async () => {
    setIsCreating(true);
    // TODO: Make POST request to your /room endpoint here
    // const res = await fetch(...)
    // const data = await res.json()
    // router.push(`/canvas/${data.roomId}`)
    
    // Simulating API delay for now:
    setTimeout(() => router.push('/canvas/123'), 1000); 
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinCode.trim()) {
      router.push(`/canvas/${joinCode}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div className='min-h-screen bg-[#0C1427] text-[#DAE2FD] font-body'>
      {/* Header */}
      <header className='flex justify-between items-center p-6 border-b border-white/10 bg-[#060E20]'>
        <h1 className='text-2xl font-extrabold text-[#8B5CF6] font-heading'>ExcaliCollab</h1>
        <button 
          onClick={handleLogout}
          className='text-white/60 hover:text-white transition-colors text-sm font-bold'
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className='max-w-4xl mx-auto mt-16 p-6'>
        <h2 className='text-4xl font-bold mb-2'>Welcome back.</h2>
        <p className='text-[#404c6c] text-lg mb-12'>What would you like to design today?</p>

        {/* Action Split */}
        <div className='grid md:grid-cols-2 gap-6'>
          
          {/* Create Room Card */}
          <div className='bg-[#131B2E] border border-white/10 rounded-2xl p-8 flex flex-col items-start justify-between h-64 hover:border-[#8B5CF6]/50 transition-colors'>
            <div>
              <h3 className='text-2xl font-bold mb-2'>New Workspace</h3>
              <p className='text-[#404c6c]'>Start a fresh canvas and invite your team to collaborate in real-time.</p>
            </div>
            <button 
              onClick={handleCreateRoom}
              disabled={isCreating}
              className='bg-[#8B5CF6] text-white w-full py-3 rounded-xl font-bold hover:-translate-y-1 transition-all disabled:opacity-50'
            >
              {isCreating ? 'Creating...' : '+ Create Board'}
            </button>
          </div>

          {/* Join Room Card */}
          <div className='bg-[#131B2E] border border-white/10 rounded-2xl p-8 flex flex-col items-start justify-between h-64 hover:border-[#89CEFF]/50 transition-colors'>
            <div>
              <h3 className='text-2xl font-bold mb-2'>Join Workspace</h3>
              <p className='text-[#404c6c]'>Have an invite code? Enter it below to jump directly into the action.</p>
            </div>
            <form onSubmit={handleJoinRoom} className='w-full flex gap-2'>
              <input 
                type="text" 
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="Enter Room ID" 
                className='flex-1 bg-transparent border border-white/25 rounded-xl p-3 text-white/80 outline-none focus:border-[#89CEFF]'
                required
              />
              <button 
                type="submit"
                className='bg-[#89CEFF] text-[#0C1427] px-6 rounded-xl font-bold hover:-translate-y-1 transition-all'
              >
                Join
              </button>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}