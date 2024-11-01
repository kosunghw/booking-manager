import { useSignOut, useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const auth = useAuthUser();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        signOut();
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.log('Response status:', response.status);
        console.log('Error data:', errorData);
        throw new Error(errorData.message || 'Logout failed');
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(auth());
  return (
    <>
      <h1>Welcome to Dashboard, {auth().username}</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
