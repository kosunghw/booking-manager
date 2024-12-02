import { useSignOut, useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { useEffect, useState } from 'react';

export default function Room({ rooms, fetchRooms, setShowBookingModal }) {
  return (
    <div className='space-y-4'>
      {/* Room List */}
      {rooms.map((room) => (
        <div
          key={room.room_id}
          className='flex items-center justify-between bg-white p-4 rounded-lg shadow-sm'
        >
          <div className='font-medium'>Room {room.room_number}</div>

          <button
            onClick={() => handleDelete(room.room_id)}
            className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700'
          >
            Delete
          </button>
        </div>
      ))}

      {/* Empty State */}
      {rooms.length === 0 && (
        <div className='text-center py-8 bg-white rounded-lg'>
          <p className='text-gray-500'>
            No rooms available. Add a room to get started.
          </p>
        </div>
      )}
    </div>
  );
}
