import { useIsAuthenticated } from 'react-auth-kit';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import RoomModal from '../components/RoomModal';
import BookingModal from '../components/BookingModal';
import RoomCalendar from '../components/RoomCalendar';
import BookingInfo from '../components/BookingInfo';
import BookingEditModal from '../components/BookingEditModal';
import RoomColorLegend from '../components/RoomColorLegend';

export default function Dashboard() {
  const isAuthenticated = useIsAuthenticated();

  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showBookingInfo, setShowBookingInfo] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [events, setEvents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);

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

  // Fetch bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/reservations', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch bookings');
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        console.error('Unexpected data structure:', data);
        setBookings([]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);

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

  const handleDeleteBooking = async () => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/reservations/${selectedEvent.resource.bookingId}`,
          {
            method: 'DELETE',
            credentials: 'include',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to delete booking');
        }

        setSelectedEvent(null);
        fetchBookings();
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
    setShowBookingInfo(false);
  };

  const handleEditBooking = () => {
    setShowEditModal(true);
    setShowBookingInfo(false);
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
    <>
      {/* Main Content */}
      <div className=' p-4 rounded-lg mb-6'>
        <div className='flex justify-between items-end'>
          {/* Legend on the left */}
          <div>
            <RoomColorLegend rooms={rooms} onDeleteRoom={handleDelete} />
          </div>

          {/* Action buttons on the right */}
          <div className='flex gap-4 mt-0'>
            <button
              onClick={() => setShowRoomModal(true)}
              className='px-4 py-2 rounded-md hover:opacity-80 transition-colors'
              style={{
                backgroundColor: '#45503B',
                color: '#F8BE5C',
              }}
            >
              Add Room
            </button>
            <button
              onClick={() => setShowBookingModal(true)}
              className='px-4 py-2 rounded-md hover:opacity-80 transition-colors'
              style={{
                backgroundColor: '#45503B',
                color: '#F8BE5C',
              }}
            >
              New Booking
            </button>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className='mb-8'>
        <RoomCalendar
          rooms={rooms}
          events={events}
          setEvents={setEvents}
          setSelectedEvent={setSelectedEvent}
          setShowBookingInfo={setShowBookingInfo}
          bookings={bookings}
        />
      </div>

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
          fetchBookings={fetchBookings}
        />
      )}

      {showBookingInfo && (
        <BookingInfo
          event={selectedEvent}
          setShowBookingInfo={setShowBookingInfo}
          onDelete={handleDeleteBooking}
          onEdit={handleEditBooking}
        />
      )}

      {showEditModal && (
        <BookingEditModal
          setShowEditModal={setShowEditModal}
          selectedEvent={selectedEvent}
          fetchBookings={fetchBookings}
        />
      )}
    </>
  );
}
