// src/pages/Settings.jsx
import { useState } from 'react';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const [isDeleting, setIsDeleting] = useState(false);
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/delete`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );

      if (response.ok) {
        signOut();
        navigate('/register');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to delete account');
      }
    } catch (error) {
      alert('An error occurred while deleting your account');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='max-w-3xl mx-auto'>
      <h2 className='text-2xl font-bold mb-6'>Account Settings</h2>

      <div className='bg-white shadow rounded-lg p-6'>
        <h3 className='text-lg font-semibold text-red-600 mb-4'>Danger Zone</h3>
        <p className='text-gray-600 mb-4'>
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button
          onClick={handleDeleteAccount}
          disabled={isDeleting}
          className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400'
        >
          {isDeleting ? 'Deleting...' : 'Delete Account'}
        </button>
      </div>
    </div>
  );
}
