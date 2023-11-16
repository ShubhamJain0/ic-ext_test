import '../App.css';

import { authDetails } from '../utils/constants';

const Authorize = () => {
  const handleOnAuthorize = () => {
    /* window.open(
      `https://webflow.com/oauth/authorize?response_type=code&client_id=${authDetails.client_ID}&scope=${authDetails.scope}`,
      '_blank',
    ); */
    window.location.href = `https://webflow.com/oauth/authorize?response_type=code&client_id=${authDetails.client_ID}&scope=${authDetails.scope}`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className="header">🚀 Image Optimiser</p>
        <p>
          In order to optimise images we need access to your cms data. Please authorize
          this app to grant permission.
        </p>
        <button type="button" onClick={handleOnAuthorize}>
          Authorize app
        </button>
        <div className="body">By Thunderclap</div>
      </header>
    </div>
  );
};

export default Authorize;
