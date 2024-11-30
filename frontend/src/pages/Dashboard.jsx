import { useSignOut, useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Room from '../components/Room';
import RoomModal from '../components/RoomModal';
import BookingModal from '../components/BookingModal';

export default function Dashboard() {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();

  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/rooms/my-rooms', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch rooms');
      }

      const data = await response.json();
      setRooms(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        signOut();
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.log('Response status:', response.status);
        console.log('Error data:', errorData);
        throw new Error(errorData.message || 'Logout failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!isAuthenticated()) {
    return <Navigate to='/login' />;
  }
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='text-xl text-gray-600'>Loading...</div>
      </div>
    );
  }
  // if (error) return <div>Error: {error}</div>;
  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Header */}
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-2xl font-semibold text-gray-900'>
                Welcome, {auth().username}
              </h1>
            </div>
            <div className='flex gap-4'>
              <button
                onClick={() => setShowRoomModal(true)}
                className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
              >
                Add Room
              </button>
              <button
                onClick={() => setShowBookingModal(true)}
                className='px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700'
              >
                New Booking
              </button>
              <button
                onClick={handleLogout}
                className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors'
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='bg-white rounded-lg shadow p-6'>
          <div className='mb-6'>
            <h2 className='text-xl font-semibold text-gray-900'>My Rooms</h2>
          </div>

          {error && (
            <div className='mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded'>
              {error}
            </div>
          )}

          <Room
            rooms={rooms}
            fetchRooms={fetchRooms}
            setShowBookingModal={setShowBookingModal}
          />
        </div>
      </main>

      {/* Modals */}
      {showRoomModal && (
        <RoomModal
          setShowRoomModal={setShowRoomModal}
          fetchRooms={fetchRooms}
        />
      )}

      {showBookingModal && (
        <BookingModal
          setShowBookingModal={setShowBookingModal}
          rooms={rooms}
          fetchRooms={fetchRooms}
        />
      )}
    </div>
  );
}
