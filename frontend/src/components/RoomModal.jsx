import { useState } from 'react';

export default function RoomModal({ setShowRoomModal, fetchRooms }) {
  const [roomNumber, setRoomNumber] = useState('');

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
        setShowRoomModal(false);
      }
      await fetchRooms();
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };
  return (
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
              setShowRoomModal(false);
              setRoomNumber('');
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
