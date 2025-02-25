import { useState } from 'react';
import axios from 'axios';

function BookingModal({ setShowBookingModal, rooms, fetchBookings }) {
  const [formData, setFormData] = useState({
    room_id: '',
    customer_name: '',
    phone_number: '',
    check_in: '',
    check_out: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post(
        `https://booking-manager-43gf.onrender.com/api/reservations`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        await fetchBookings();
        setShowBookingModal(false);
      } else {
        throw new Error(response.data.message || 'Failed to create booking');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Close modal when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowBookingModal(false);
    }
  };

  return (
    // Fixed overlay
    <div
      className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'
      onClick={handleOutsideClick}
    >
      {/* Modal container - centered */}
      <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
        <div className='mt-3'>
          {/* Header */}
          <div className='flex justify-between items-center pb-3'>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>
              New Booking
            </h3>
            <button
              onClick={() => setShowBookingModal(false)}
              className='text-gray-400 hover:text-gray-500 focus:outline-none'
            >
              <span className='text-2xl'>&times;</span>
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className='mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm'>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <div className='mb-4'>
                <label
                  htmlFor='room_id'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Select Room
                </label>
                <select
                  id='room_id'
                  value={formData.room_id}
                  onChange={(e) =>
                    setFormData({ ...formData, room_id: e.target.value })
                  }
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                >
                  <option value=''>Select a room</option>
                  {rooms.map((room) => (
                    <option key={room.room_id} value={room.room_id}>
                      Room {room.room_number}
                    </option>
                  ))}
                </select>
              </div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Customer Name
              </label>
              <input
                type='text'
                required
                value={formData.customer_name}
                onChange={(e) =>
                  setFormData({ ...formData, customer_name: e.target.value })
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                placeholder='Enter customer name'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Phone Number
              </label>
              <input
                type='tel'
                required
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                placeholder='Enter phone number'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Check-in Date
              </label>
              <input
                type='date'
                required
                value={formData.check_in}
                onChange={(e) =>
                  setFormData({ ...formData, check_in: e.target.value })
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Check-out Date
              </label>
              <input
                type='date'
                required
                value={formData.check_out}
                onChange={(e) =>
                  setFormData({ ...formData, check_out: e.target.value })
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
              />
            </div>

            {/* Buttons */}
            <div className='flex justify-end gap-2 pt-4'>
              <button
                type='button'
                onClick={() => setShowBookingModal(false)}
                disabled={loading}
                className='px-4 py-2 text-gray-700 text-sm font-medium rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-400'
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
                className='px-4 py-2 text-white text-sm font-medium rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
                style={{
                  backgroundColor: '#45503B',
                  color: '#F8BE5C',
                }}
              >
                {loading ? 'Creating...' : 'Create Booking'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
