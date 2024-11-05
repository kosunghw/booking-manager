import { useSignOut, useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { useEffect, useState } from 'react';

export default function Room({ rooms, fetchRooms, setShowBookingModal }) {
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
  return (
    <div>
      {rooms.map((room) => (
        <div key={room.room_id}>
          Room Number: {room.room_number}
          <button
            onClick={() => {
              handleDelete(room.room_id);
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setShowBookingModal(true);
            }}
          >
            Add booking
          </button>
        </div>
      ))}
    </div>
  );
}
