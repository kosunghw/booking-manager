// src/pages/Settings.jsx
import { useState } from 'react';
import { useSignOut, useAuthUser, useAuthHeader } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Settings() {
  const [isDeleting, setIsDeleting] = useState(false);
  const signOut = useSignOut();
  const navigate = useNavigate();
  const auth = useAuthUser();
  const username = auth()?.username;
  const authHeader = useAuthHeader();
  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await axios.delete(
        'https://booking-manager-43gf.onrender.com/api/users/delete',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader(),
          },
        }
      );

      if (response.status === 200) {
        signOut();
        navigate('/login');
      } else {
        alert(response.data.message || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Delete account error:', error);
      alert(
        error.response?.data?.message ||
          'An error occurred while deleting your account'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='max-w-3xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>Hello, {username}</h1>
      <h2 className='text-2xl font-bold mb-6'>Account Settings</h2>

      <div className='bg-white shadow rounded-lg p-6'>
        <p className='text-gray-600 mb-4'>
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button
          onClick={handleDeleteAccount}
          disabled={isDeleting}
          className='px-4 py-2  text-white rounded-md hover:opacity-80 disabled:bg-red-400'
          style={{
            backgroundColor: '#F8BE5C',
            color: '#45503B',
          }}
        >
          {isDeleting ? 'Deleting...' : 'Delete Account'}
        </button>
      </div>
    </div>
  );
}
