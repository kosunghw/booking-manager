import moment from 'moment';

const BookingInfo = ({ event, setShowBookingInfo, onEdit, onDelete }) => {
  // Close modal when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowBookingInfo(false);
    }
  };

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
      onClick={handleOutsideClick}
    >
      <div className='bg-white rounded-lg p-6 w-full max-w-md'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>Room {event.roomNumber}</h2>

          <button
            onClick={() => setShowBookingInfo(false)}
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
        <div className='flex justify-end gap-2 pt-4'>
          <button
            onClick={onEdit}
            className='px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className='px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingInfo;
