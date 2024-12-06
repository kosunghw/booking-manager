import React from 'react';
import moment from 'moment';

const BookingInfo = ({ event, onClose }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>Room {event.roomNumber}</h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-500 focus:outline-none'
          >
            <span className='text-2xl'>&times;</span>
          </button>
        </div>
        <div className='space-y-2'>
          <p>
            <span className='font-medium'>Customer Name:</span>{' '}
            {event.resource.customerName}
          </p>
          <p>
            <span className='font-medium'>Phone Number:</span>{' '}
            {event.resource.phoneNumber}
          </p>
          <p>
            <span className='font-medium'>Check-in:</span>{' '}
            {moment(event.start).format('MM/DD/YYYY')}
          </p>
          <p>
            <span className='font-medium'>Check-out:</span>{' '}
            {moment(event.end).format('MM/DD/YYYY')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingInfo;
