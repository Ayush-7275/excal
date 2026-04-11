'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HTTP_BACKEND } from '../../config';

// Define the Room type based on your Prisma schema
interface Room {
  id: number;
  slug: string;
}

export default function Dashboard() {
  const router = useRouter();

  const [joinCode, setJoinCode] = useState('');
  const [roomName, setRoomName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // New state for storing the user's rooms
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);

  // Auth Guard & Fetch Rooms
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }

    // Fetch the user's rooms as soon as the dashboard loads
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${HTTP_BACKEND}/rooms`, {
          headers: { authorization: token }
        });
        if (res.ok) {
          const data = await res.json();
          setRooms(data.rooms || []);
        }
      } catch (error) {
        console.error('Failed to load rooms', error);
      } finally {
        setIsLoadingRooms(false);
      }
    };

    fetchRooms();
  }, [router]);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) return;

    setIsCreating(true);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${HTTP_BACKEND}/room`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token || ''
        },
        body: JSON.stringify({ name: roomName })
      });

      const data = await res.json();

      if (res.ok) {
        router.push(`/canvas/${data.roomid}?token=${token}`);
      } else {
        alert(data.message || 'Error creating room');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinCode.trim()) {
      const token = localStorage.getItem('token');
      router.push(`/canvas/${joinCode}?token=${token}`);
    }
  };

  // New function to handle deletion
  const handleDeleteRoom = async (roomId: number, roomName: string) => {
    // Prevent accidental clicks
    if (!confirm(`Are you sure you want to delete "${roomName}"? This cannot be undone.`)) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${HTTP_BACKEND}/room/${roomId}`, {
        method: 'DELETE',
        headers: { authorization: token || '' }
      });

      if (res.ok) {
        // Instantly remove the room from the UI without reloading the page
        setRooms((prev) => prev.filter((room) => room.id !== roomId));
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to delete room');
      }
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div className='min-h-screen bg-[#0C1427] text-[#DAE2FD] font-body pb-24'>
      {/* Header */}
      <header className='flex justify-between items-center p-6 border-b border-white/10 bg-[#060E20]'>
        <h1 className='text-2xl font-extrabold text-[#8B5CF6] font-heading'>ExcaliCollab</h1>
        <button onClick={handleLogout} className='text-white/60 hover:text-white transition-colors text-sm font-bold'>
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className='max-w-4xl mx-auto mt-16 p-6'>
        <h2 className='text-4xl font-bold mb-2'>Welcome back.</h2>
        <p className='text-[#404c6c] text-lg mb-12'>What would you like to design today?</p>

        {/* Action Split */}
        <div className='grid md:grid-cols-2 gap-6 mb-16'>
          {/* Create Room Card */}
          <div className='bg-[#131B2E] border border-white/10 rounded-2xl p-8 flex flex-col items-start justify-between h-64 hover:border-[#8B5CF6]/50 transition-colors'>
            <div>
              <h3 className='text-2xl font-bold mb-2'>New Workspace</h3>
              <p className='text-[#404c6c]'>Start a fresh canvas and invite your team to collaborate in real-time.</p>
            </div>
            <form onSubmit={handleCreateRoom} className='w-full flex gap-2'>
              <input
                type='text'
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder='Workspace Name'
                className='flex-1 bg-transparent border border-white/25 rounded-xl p-3 text-white/80 outline-none focus:border-[#8B5CF6]'
                required
              />
              <button
                type='submit'
                disabled={isCreating}
                className='bg-[#8B5CF6] text-white px-6 rounded-xl font-bold hover:-translate-y-1 transition-all disabled:opacity-50'
              >
                {isCreating ? '...' : 'Create'}
              </button>
            </form>
          </div>

          {/* Join Room Card */}
          <div className='bg-[#131B2E] border border-white/10 rounded-2xl p-8 flex flex-col items-start justify-between h-64 hover:border-[#89CEFF]/50 transition-colors'>
            <div>
              <h3 className='text-2xl font-bold mb-2'>Join Workspace</h3>
              <p className='text-[#404c6c]'>Have an invite code? Enter it below to jump directly into the action.</p>
            </div>
            <form onSubmit={handleJoinRoom} className='w-full flex gap-2'>
              <input
                type='text'
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder='Enter Room ID'
                className='flex-1 bg-transparent border border-white/25 rounded-xl p-3 text-white/80 outline-none focus:border-[#89CEFF]'
                required
              />
              <button
                type='submit'
                className='bg-[#89CEFF] text-[#0C1427] px-6 rounded-xl font-bold hover:-translate-y-1 transition-all'
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* ── YOUR WORKSPACES SECTION ── */}
        <div>
          <h3 className='text-2xl font-bold mb-6 text-white'>Your Workspaces</h3>

          {isLoadingRooms ? (
            <p className='text-[#404c6c]'>Loading workspaces...</p>
          ) : rooms.length === 0 ? (
            <div className='border border-white/10 rounded-2xl p-8 text-center bg-[#131B2E]/50'>
              <p className='text-[#404c6c]'>You haven't created any workspaces yet.</p>
            </div>
          ) : (
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className='bg-[#131B2E] border border-white/10 rounded-xl p-5 flex flex-col justify-between h-36 hover:border-white/30 transition-all group'
                >
                  <div>
                    <h4 className='text-lg font-bold text-[#DAE2FD] truncate' title={room.slug}>
                      {room.slug}
                    </h4>
                    <p className='text-[#404c6c] text-sm mt-1'>ID: {room.id}</p>
                  </div>

                  <div className='flex justify-between items-center mt-4'>
                    {/* Enter Button */}
                    <button
                      onClick={() => {
                        const token = localStorage.getItem('token');
                        router.push(`/canvas/${room.id}?token=${token}`);
                      }}
                      className='text-sm font-bold text-[#89CEFF] hover:text-white transition-colors'
                    >
                      Enter Board &rarr;
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteRoom(room.id, room.slug)}
                      className='text-white/30 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100'
                      title='Delete Workspace'
                    >
                      {/* delete svg */}
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='M3 6h18'></path>
                        <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'></path>
                        <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'></path>
                        <line x1='10' y1='11' x2='10' y2='17'></line>
                        <line x1='14' y1='11' x2='14' y2='17'></line>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
