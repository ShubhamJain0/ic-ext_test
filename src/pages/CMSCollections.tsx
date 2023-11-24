import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCMSImages } from '../utils/apis';
const CMSCollections = () => {
  const location = useLocation();
  const { state } = location;

  const [cmsImages, setCMSImages] = useState<any>(undefined);

  const onSuccess = (data: any) => {
    console.log('Success', data);
    setCMSImages(data.payload);
  };

  const onError = (error: any) => {
    console.log('Error', error);
  };
  useEffect(() => {
    if (state.siteId) getCMSImages(state.siteId, onSuccess, onError);
  }, [state]);

  const handleOnClick = () => {
    //start compression
    alert('Compression Started. Sit back and relax.');
  };

  console.log('Logg >>', { state, cmsImages });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h2>CMS Collections Images</h2>
      <h4>Total Collections: {cmsImages?.length || ''}</h4>
      <h4>Total Images: {cmsImages?.[0]?.allImages.length || ''}</h4>
      <div>
        {cmsImages &&
          cmsImages?.map((item: any, key: any) => (
            <div key={key}>
              <h4>Collection Name : {item.collectionName}</h4>
              <span>
                {item.allImages.map((image: any, key: any) => (
                  <span key={key} style={{ padding: 5 }}>
                    <img src={image.url} width={50} height={50} alt={'preview'} />
                  </span>
                ))}
              </span>
            </div>
          ))}
      </div>

      <button type="button" onClick={handleOnClick}>
        Optimize 🚀{' '}
      </button>
    </div>
  );
};

export default CMSCollections;
