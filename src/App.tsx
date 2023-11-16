import './App.css';

import { authDetails } from './utils/constants';

function App() {
  const handleOnAuthorize = () => {
    window.open(
      `https://webflow.com/oauth/authorize?response_type=code&client_id=${authDetails.client_ID}&scope=${authDetails.scope}`,
      '_blank',
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className="header">🚀 Image Optimiser</p>
        <button type="button" onClick={handleOnAuthorize}>
          Authorize app
        </button>
        <div className="body">By Thunderclap</div>
      </header>
    </div>
  );
}

export default App;
