import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Loader from '../components/Loader';
import { getSiteToken } from '../utils/apis';

const AuthorizationStatus = () => {
  //based on query params show success/failure and update db with code
  const [statusData, setStatus] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const code = location.search.split('?code=');
  console.log('first', { location, code });
  const urlParams = new URL(window.location.href).searchParams;
  const xCode = urlParams.get('code');
  const error = urlParams.get('error');
  const errorMessage = urlParams.get('error_description');

  console.log('Param values >>>', { location, code, xCode, error, errorMessage });

  useEffect(() => {
    let running = true;
    //we can pass a callback/function to the api method and it will execute the function with response instead of this jargon
    (async () => {
      if (xCode) {
        const response = await getSiteToken(xCode);
        running = false;
        setStatus({ status: response.message, grantedSites: response.payload.sites });
      }
    })();
  }, [xCode]);

  const handleBtnClick = async () => {
    console.log('window', window.webflow);
    //@ts-ignore
    //const siteInfo = await window.webflow.getSiteInfo();
    const siteInfo = { siteId: statusData?.grantedSites[0].id };
    navigate('/cms-collections', { state: siteInfo });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <h1>Authorization Status Page </h1>
      {!statusData ? <Loader variant="small" /> : <h3>Status: {statusData?.status}</h3>}

      <p>Please note the following sites have being granted the access:</p>
      {statusData && statusData?.grantedSites && statusData?.grantedSites.length
        ? statusData?.grantedSites.map((site, key) => (
            <div key={key}>
              <h3>{site.displayName}</h3>
              <img
                height={100}
                width={200}
                src={site.previewUrl}
                alt={`${site.displayName}`}
              />
            </div>
          ))
        : null}

      <button type="button" onClick={handleBtnClick}>
        Go to App
      </button>
    </div>
  );
};

export default AuthorizationStatus;
