import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import octoAnimation from '../../resources/octo-lottie.json';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-h-screen bg-gradient-to-b from-veryDarkBlue from-0.01% to-darkBlue to-99.99% overflow-hidden">
      <Lottie animationData={octoAnimation} loop />
    </div>
  );
};

export default Welcome;
