import { useState } from 'react';

export default function RoomModal({ setShowRoomModal, fetchRooms }) {
  const [roomNumber, setRoomNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create room');
      }

      await fetchRooms();
      setRoomNumber('');
      setShowRoomModal(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowRoomModal(false);
    }
  };

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
      onClick={handleOutsideClick}
    >
      <div className='bg-white rounded-lg max-w-md w-full p-6 shadow-xl'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold text-gray-900'>Add New Room</h2>
          <button
            onClick={() => setShowRoomModal(false)}
            className='text-gray-400 hover:text-gray-500 focus:outline-none'
          >
            <span className='text-2xl'>&times;</span>
          </button>
        </div>

        {error && (
          <div className='mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='roomNumber'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Room Number
            </label>
            <input
              type='text'
              id='roomNumber'
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Enter room number'
            />
          </div>

          <div className='flex justify-end gap-2 pt-4'>
            <button
              type='button'
              onClick={() => {
                setShowRoomModal(false);
                setRoomNumber('');
              }}
              disabled={loading}
              className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={loading}
              className='px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
            >
              {loading ? 'Creating...' : 'Create Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
