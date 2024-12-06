import React, { useState, useEffect, useCallback } from 'react';
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
import RoomColorLegend from './RoomColorLegend';
import BookingInfo from './BookingInfo';

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

function RoomCalendar({
  rooms,
  handleDelete,
  events,
  setEvents,
  setSelectedEvent,
  bookings,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (bookings.length > 0) {
      // Convert bookings into events for the calendar
      const convertedEvents = bookings.map((booking) => ({
        // title: `${booking.customer_name} (Room ${booking.room_number}). Phone: ${booking.phone_number}`,
        start: startOfDay(parseISO(booking.check_in)),
        end: endOfDay(parseISO(booking.check_out)),
        roomNumber: booking.room_number,
        roomColor: getColorFromId(booking),
        title: `${booking.customer_name}`,
        resource: {
          customerName: booking.customer_name,
          phoneNumber: booking.phone_number,
          bookingId: booking.booking_id,
        },
      }));
      setEvents(convertedEvents);
    }
  }, [bookings]);

  const getColorFromId = (booking) => {
    const matchingRoom = rooms.find((room) => room.room_id === booking.room_id);
    return matchingRoom ? matchingRoom.room_color : null;
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = event.roomColor || '#000';
    return {
      style: {
        backgroundColor,
        color: 'white',
        borderRadius: '5px',
        padding: '5px',
        height: '30px',
      },
    };
  };

  // Handle Booking click
  const handleEventClick = useCallback((event) => setSelectedEvent(event), []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-4'>
      <h1 className='text-center text-2xl font-bold my-4'>
        Room Booking Calendar
      </h1>
      <div className='flex justify-center mb-4'>
        <RoomColorLegend rooms={rooms} onDeleteRoom={handleDelete} />
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        defaultView='month' // Show full month view
        // views={['month']} // Only show the month view
        startAccessor='start'
        endAccessor='end'
        style={{ height: 1000 }}
        eventPropGetter={eventStyleGetter} // Apply custom colors
        onSelectEvent={handleEventClick}
      />
    </div>
  );
}

export default RoomCalendar;

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
