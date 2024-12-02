import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import {
  format,
  parse,
  startOfWeek,
  getDay,
  parseISO,
  startOfDay,
  endOfDay,
} from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { enUS } from 'date-fns/locale';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function RoomCalendar({ rooms, handleDelete }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

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

  useEffect(() => {
    if (bookings.length > 0) {
      // Convert bookings into events for the calendar
      const convertedEvents = bookings.map((booking) => ({
        // title: `${booking.customer_name} (Room ${booking.room_number}). Phone: ${booking.phone_number}`,
        start: startOfDay(parseISO(booking.check_in)),
        end: endOfDay(parseISO(booking.check_out)),
        roomNumber: booking.room_number,
        roomColor: getColorFromId(booking),
      }));
      setEvents(convertedEvents);
    }
  }, [bookings]);

  const getColorFromId = (booking) => {
    const matchingRoom = rooms.find((room) => room.room_id === booking.room_id);
    return matchingRoom ? matchingRoom.room_color : null;
  };

  /**
   * 
   * // Helper function to check if a date has a booking
  const getBookingsForCell = (roomId, date) => {
    // Only return bookings if this is the start date of the booking within the visible range
    return bookings.filter((booking) => {
      const bookingStart = new Date(booking.check_in);
      const bookingEnd = new Date(booking.check_out);
      const cellDate = new Date(date);

      // Reset time part to compare dates only
      bookingStart.setHours(0, 0, 0, 0);
      bookingEnd.setHours(0, 0, 0, 0);
      cellDate.setHours(0, 0, 0, 0);

      // Check if this is either the booking start date or the first visible date for this booking
      const weekStart = getWeekDates()[0];
      const visibleStartDate =
        bookingStart < weekStart ? weekStart : bookingStart;

      return (
        booking.room_id === roomId &&
        cellDate.getTime() === visibleStartDate.getTime() &&
        cellDate <= bookingEnd
      );
    });
  };

  const getWeekDates = () => {
    const dates = [];
    const startDate = new Date(currentDate);
    startDate.setHours(0, 0, 0, 0); // Reset time part

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      // Reset hours for each date to ensure consistent comparison
      date.setHours(0, 0, 0, 0);
      dates.push(date);
    }
    return dates;
  };

  // Update booking style calculation
  const getBookingStyle = (booking) => {
    const startDate = new Date(booking.check_in + 'T00:00:00');
    const endDate = new Date(booking.check_out + 'T00:00:00');
    const weekDates = getWeekDates();

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const startIndex = weekDates.findIndex(
      (date) => date.getTime() === startDate.getTime()
    );
    const endIndex = weekDates.findIndex(
      (date) => date.getTime() === endDate.getTime()
    );

    // Position calculation
    // Start from the middle of first cell
    const left = startIndex * 100 + 50;
    // Width should extend to the middle of the last cell
    // +1 for full days, then -50% at start and -50% at end
    const width = (endIndex - startIndex + 1) * 100 - 100;

    return {
      position: 'absolute',
      left: `${left}%`,
      width: `${width}%`,
      top: '10%',
      height: '80%',
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '0.25rem',
      borderRadius: '0.25rem',
      fontSize: '0.875rem',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      zIndex: 10,
    };
  };

  function nextDay() {
    const next = new Date(currentDate);
    next.setDate(currentDate.getDate() + 1);
    setCurrentDate(next);
  }

  function prevDay() {
    const next = new Date(currentDate);
    next.setDate(currentDate.getDate() - 1);
    setCurrentDate(next);
  }

  // Jump to specific month
  function handleMonthChange(month) {
    const newDate = new Date(currentDate);
    newDate.setMonth(month);
    setCurrentDate(newDate);
  }
   */

  const eventStyleGetter = (event) => {
    console.log(event);
    const backgroundColor = event.roomColor || '#000';
    return {
      style: {
        backgroundColor,
        color: 'white',
        borderRadius: '5px',
        padding: '5px',
        height: '10px',
      },
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-4'>
      <h1 className='text-center text-2xl font-bold my-4'>
        Room Booking Calendar
      </h1>
      <div className='flex justify-center mb-4'>
        {/* Room Color Legend */}
        <div>
          {rooms.map((room) => (
            <div key={room.room_id} className='flex items-center mb-2'>
              <div
                className='w-4 h-4 mr-2'
                style={{ backgroundColor: room.room_color }}
              ></div>
              <span>Room {room.room_number}</span>
              <button
                className='ml-2 text-red-500 hover:text-red-700'
                onClick={() => handleDelete(room.room_id)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-4 h-4'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.436-2.845 3-2.845s3 1.281 3 2.845z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        defaultView='month' // Show full month view
        views={['month']} // Only show the month view
        startAccessor='start'
        endAccessor='end'
        style={{ height: 600 }}
        eventPropGetter={eventStyleGetter} // Apply custom colors
      />
    </div>
  );
}

export default RoomCalendar;
