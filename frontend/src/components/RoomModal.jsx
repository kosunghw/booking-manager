import { useState } from 'react';
import ColorPicker from './ColorPicker';
import axios from 'axios';
import { useAuthHeader } from 'react-auth-kit';

export default function RoomModal({ setShowRoomModal, fetchRooms }) {
  const [roomNumber, setRoomNumber] = useState('');
  const [roomColor, setRoomColor] = useState('#FFFFFF');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const authHeader = useAuthHeader();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `https://booking-manager-43gf.onrender.com/api/rooms`,
        {
          roomNumber: roomNumber,
          roomColor: roomColor,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader(),
          },
        }
      );

      if (response.status === 201) {
        await fetchRooms();
        setRoomNumber('');
        setShowRoomModal(false);
        setRoomColor('#FFFFFF');
      } else {
        throw new Error(response.data.message || 'Failed to create room');
      }
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
            <label
              htmlFor='roomColor'
              className='block text-sm font-medium text-gray-700 mb-3 mt-3'
            >
              Room Color
            </label>
            <ColorPicker
              id='roomColor'
              value={roomColor}
              onChange={setRoomColor}
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
              className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:opacity-80 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400'
              style={{
                backgroundColor: '#F8BE5C',
                color: '#45503B',
              }}
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={loading}
              className='px-4 py-2 text-sm font-medium text-white hover:opacity-80 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
              style={{
                backgroundColor: '#45503B',
                color: '#F8BE5C',
              }}
            >
              {loading ? 'Creating...' : 'Create Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
