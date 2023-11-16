import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  //If user is logged in and navigates to this page redirect to dashboard page or login page
  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        backgroundColor: '#fffff',
      }}
    >
      <h1 className="text-3xl font-bold underline">Welcome Page</h1>
      <button
        type="button"
        onClick={() => {
          navigate('/register');
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign up
      </button>
    </div>
  );
};

export default Welcome;
