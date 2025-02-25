# RoomBook - Accommodation Management System

RoomBook is a simple yet powerful room and booking management system for small accommodation providers. This application helps you manage rooms, track bookings, and visualize occupancy through an intuitive calendar interface.

## Features

- **User Authentication:** Secure login and registration system
- **Room Management:** Create rooms with custom colors for easy identification
- **Booking System:** Add, edit, and delete bookings with customer details
- **Calendar View:** Visual representation of all bookings with color-coding by room
- **Responsive Design:** Works on desktop and mobile devices

## Tech Stack

### Frontend

- React.js
- TailwindCSS
- react-big-calendar
- date-fns
- axios
- react-auth-kit
- react-colorful

### Backend

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v14+)
- PostgreSQL database

### Backend Setup

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file with the following variables:
   ```
   PORT=5000
   DATABASE_URL=your_postgres_connection_string
   JWT_SECRET=your_secret_key
   ```
5. Start the server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```
   npm start
   ```

## Database Schema

The application uses the following main tables:

- **users**: Stores user authentication information
- **rooms**: Stores room information including room number and color
- **bookings**: Stores booking details with customer information and dates

## Usage

1. Register for an account or login
2. Add rooms with custom colors for identification
3. Create bookings by selecting a room and entering customer details
4. View all bookings in the calendar with color-coding by room
5. Click on a booking to view details, edit, or delete

## Calendar Usage

The calendar view provides three different layouts:

- Monthly view (default): See all bookings across a month
- Weekly view: Focus on a specific week
- Daily view: See bookings for a specific day

## Deployment

The application is currently deployed at:

- Frontend: https://booking-manager-lake.vercel.app
- Backend: https://booking-manager-43gf.onrender.com/api

## Known Issues

- Bookings sometimes appear in black when the rooms aren't loaded yet
- Room deletion doesn't cascade to bookings

## Future Enhancements

- User roles (admin, staff)
- Booking statistics and occupancy rates
- Email notifications for bookings
- Customer management system
- Room availability search
- Payment integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

GitHub: [kosunghw](https://github.com/kosunghw)
