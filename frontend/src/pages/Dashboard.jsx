import { useSignOut, useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

export default function Dashboard() {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();

  const [showModal, setShowModal] = useState(false);
  const [roomNumber, setRoomNumber] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          roomNumber: roomNumber,
        }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      if (!response.ok) {
        const error = await response.json();
        console.log('Error response:', error);
      }

      if (response.ok) {
        setRoomNumber('');
        setShowModal(false);
      }
      await fetchRooms();
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const handleDelete = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/rooms/${roomId}`,
          {
            method: 'DELETE',
            credentials: 'include',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to delete room');
        }

        fetchRooms();
      } catch (error) {
        console.error('Delete error:', error);
      }
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
      <button onClick={() => setShowModal(true)}>Add Room</button>

      <h1>My Rooms</h1>
      {rooms.map((room) => (
        <div key={room.room_id}>
          Room Number: {room.room_number}
          <button
            onClick={() => {
              handleDelete(room.room_id);
            }}
          >
            Delete
          </button>
        </div>
      ))}

      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <h2>Add New Room</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor='roomNumber'>Room Number:</label>
              <input
                type='text'
                id='roomNumber'
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                required
              />
              <button type='submit'>Create Room</button>
              <button
                type='button'
                onClick={() => {
                  setShowModal(false);
                  setRoomNumber('');
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
