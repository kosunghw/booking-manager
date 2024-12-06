import React from 'react';

const RoomColorLegend = ({ rooms, onDeleteRoom }) => {
  return (
    <div className='flex flex-wrap gap-4 w-full max-w-md border-2 rounded-md p-4'>
      {rooms.map((room) => (
        <div key={room.room_id} className='flex items-center'>
          <div
            className='w-4 h-4 mr-2'
            style={{ backgroundColor: room.room_color }}
          ></div>
          <span>Room {room.room_number}</span>
          <button
            className='ml-2 text-red-500 hover:text-red-700'
            onClick={() => onDeleteRoom(room.room_id)}
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
  );
};

export default RoomColorLegend;
