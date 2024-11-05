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
  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <h1>Welcome to Dashboard, {auth().username}</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => setShowRoomModal(true)}>Add Room</button>

      <h1>My Rooms</h1>
      <Room
        rooms={rooms}
        fetchRooms={fetchRooms}
        setShowBookingModal={setShowBookingModal}
      />

      {showRoomModal && (
        <RoomModal
          setShowRoomModal={setShowRoomModal}
          fetchRooms={fetchRooms}
        />
      )}

      {showBookingModal && (
        <BookingModal setShowBookingModal={setShowBookingModal} />
      )}
    </div>
  );
}
