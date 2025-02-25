import { useIsAuthenticated, useAuthHeader } from 'react-auth-kit';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import RoomModal from '../components/RoomModal';
import BookingModal from '../components/BookingModal';
import RoomCalendar from '../components/RoomCalendar';
import BookingInfo from '../components/BookingInfo';
import BookingEditModal from '../components/BookingEditModal';
import RoomColorLegend from '../components/RoomColorLegend';

export default function Dashboard() {
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();

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

  const API_BASE_URL = 'https://booking-manager-43gf.onrender.com/api';

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/rooms/my-rooms`, {
        headers: {
          Authorization: authHeader(),
        },
      });

      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setError(error.response?.data?.message || 'Failed to fetch rooms');
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
      const response = await axios.get(`${API_BASE_URL}/reservations`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader(),
        },
      });

      const data = response.data;

      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        console.error('Unexpected data structure:', data);
        setBookings([]);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError(error.response?.data?.message || 'Failed to fetch bookings');
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
        await axios.delete(`${API_BASE_URL}/rooms/${roomId}`, {
          headers: {
            Authorization: authHeader(),
          },
        });

        fetchRooms();
        fetchBookings();
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const handleDeleteBooking = async () => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await axios.delete(
          `${API_BASE_URL}/reservations/${selectedEvent.resource.bookingId}`,
          {
            headers: {
              Authorization: authHeader(),
            },
          }
        );

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
