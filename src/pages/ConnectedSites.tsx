import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BodyText, Button, Header, HeaderBold } from '../components/UI';
import { ConnectionCard } from '../components/ConnectionCard';
import { getRecentConnections } from '../utils/apis';
import { AuthContext } from '../utils/hooks/useAuth';
import { RecentConnections } from './Dashboard';
import { calculateLastOpened } from '../utils/methods';

export const ConnectedSites = () => {
  const [recentConnections, setRecentConnections] = useState<Array<RecentConnections>>(
    [],
  );
  const { isUserVerified, userInfo } = useContext(AuthContext);

  const navigate = useNavigate();

  const [profileName, setProfileName] = useState('');

  const onRecentConnectionClick = (connection: any) => {
    //Navigate to compression page
    navigate('/select-website', {
      state: {
        hasRecentConnections: recentConnections?.length,
        step: 2,
        selectedConnection: { label: connection?.siteName, value: connection?.id },
      },
    });
  };

  const onRecentConnectionsSuccess = (data: any) => {
    setRecentConnections(data);
  };

  const onRecentConnectionsError = () => {};

  useEffect(() => {
    //call recent connection api and set on success
    (async () => {
      await getRecentConnections(onRecentConnectionsSuccess, onRecentConnectionsError);
    })();
  }, []);

  useLayoutEffect(() => {
    if (userInfo?.name) {
      let temp = userInfo?.name.split(' ');
      if (temp.length > 1) {
        setProfileName(`${temp[0][0]?.toUpperCase()}${temp[1][0]?.toUpperCase()}`);
      } else {
        setProfileName(temp[0][0]?.toUpperCase());
      }
    }
  }, [userInfo]);

  return (
    <div className={`relative flex flex-col min-h-screen`}>
      {/* Bg Gradient */}
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-veryDarkBlue from-0.01% to-darkBlue to-99.99%" />
      {/* Bg Image */}
      <div
        className="absolute top-0 right-0 bottom-0 left-0 bg-cover bg-[center_12rem] bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(images/dashboard-bg.png)` }}
      />
      {/* Bubbles Bg Image */}
      <div
        className="absolute top-0 right-0 bottom-0 left-0 bg-contain bg-fixed"
        style={{ backgroundImage: `url(images/bubbles.png)` }}
      />

      {/* Content */}
      <div className="xl:px-[100px] px-[40px] max-w-[1440px] mx-auto w-full">
        {/* Nav Bar */}
        <div className="relative flex flex-row flex-wrap py-[36px] gap-4 items-center justify-between">
          <div className="cursor-pointer" onClick={() => navigate('/dashboard')}>
            <img src="images/octo-optimizer-full-logo.svg" />
          </div>
          <div>
            <div className="flex flex-row gap-[40px] bg-[#FFFFFF47] px-[24px] py-[12px] rounded-[39px] shadow-[inset_-1px_-1px_0px_0px_#FFFFFF47]">
              <div
                className="relative opacity-80 hover:opacity-100 transition-all duration-400 cursor-pointer"
                onClick={() => {
                  navigate('/connected-sites');
                }}
              >
                <Header
                  content="Connected Sites"
                  lgSize="lg:text-bodySm"
                  mdSize="md:text-bodySm"
                  smSize="sm:text-bodyXs"
                  xsSize="xs:text-bodyXs"
                  align="text-center"
                  color="text-Secondary"
                />
                <div className="bg-Secondary h-[2px] w-[24px] mt-[4px] absolute left-[40%]"></div>
              </div>
              <div
                className="opacity-80 hover:opacity-100 transition-all duration-400 cursor-pointer"
                onClick={() => {
                  navigate('/task-history');
                }}
              >
                <Header
                  content="Task History"
                  lgSize="lg:text-bodySm"
                  mdSize="md:text-bodySm"
                  smSize="sm:text-bodyXs"
                  xsSize="xs:text-bodyXs"
                  align="text-center"
                />
              </div>
              <div
                className="opacity-80 hover:opacity-100 transition-all duration-400 cursor-pointer"
                onClick={() => {}}
              >
                <Header
                  content="Learn More"
                  lgSize="lg:text-bodySm"
                  mdSize="md:text-bodySm"
                  smSize="sm:text-bodyXs"
                  xsSize="xs:text-bodyXs"
                  align="text-center"
                />
              </div>
            </div>
          </div>
          <div
            onClick={() => navigate('/profile')}
            className="bg-[#FFFFFF47] rounded-[114px] rounded-br-[0px] px-[16px] py-[12px] shadow-[inset_-1px_-1px_0px_0px_#FFFFFF26] cursor-pointer"
          >
            <BodyText
              content={`${profileName}`}
              xlSize="xl:text-bodyMd"
              lgSize="lg:text-bodyMd"
            />
          </div>
        </div>
        {/* Main Component */}
        <div className="relative mt-[76px] mb-[172px]">
          <div className="flex px-[32px] items-center">
            <div>
              <Header content="Recently connected sites" />
              <div className="mt-[12px]">
                <BodyText
                  content="Review the websites you've recently added for optimization."
                  opacity="opacity-70"
                />
              </div>
            </div>
          </div>
          {/* Recent Connections */}
          <div className="bg-[#131B2D] p-[40px] rounded-[36px] rounded-br-[0px] mt-[30px] border-[#DADCF633] border-[1px]">
            {!recentConnections?.length ? (
              <div className="p-[100px] mt-[40px] flex flex-col items-center">
                <div className="flex flex-col items-center">
                  <HeaderBold content="No connections found" align="text-center" />
                  <div className="mt-[8px] max-w-[450px]">
                    <BodyText
                      content="Once you connect it, you'll find all your latest connections right here, neatly organized and ready to roll."
                      xlSize="xl:text-bodySm"
                      lgSize="lg:text-bodySm"
                      mdSize="md:text-bodySm"
                      opacity="opacity-70"
                      align="text-center"
                    />
                  </div>
                  <div className="mt-[24px]">
                    <Button
                      label="Start now"
                      type="button"
                      onClick={() =>
                        navigate('/select-website', {
                          state: { hasRecentConnections: recentConnections?.length > 0 },
                        })
                      }
                      disabled={!isUserVerified}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 grid-cols-1 gap-[24px] mt-[40px]">
                {recentConnections.map((connection) => (
                  <ConnectionCard
                    image_url={connection.previewUrl}
                    name={connection.siteName}
                    activity={'opened ' + calculateLastOpened(connection.lastOpened)}
                    onClick={() => onRecentConnectionClick(connection)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-[rgba(255,255,255,0.15)] backdrop-blur-[12px]`}
      >
        <div className="flex flex-row gap-4 items-center justify-between xl:px-[100px] px-[40px] py-[24px] max-w-[1440px] mx-auto w-full">
          <div className="flex flex-row flex-wrap items-center gap-4">
            <BodyText
              content="Copyright © 2023 ThunderClap. All Rights Reserved."
              xlSize="xl:text-bodySm"
              lgSize="lg:text-bodySm"
              mdSize="md:text-bodySm"
            />
            <div className="bg-[rgba(255,255,255,0.2)] px-[12px] py-[7px] rounded-[7px]">
              <a
                href="mailto:support@thethunderclap.com"
                className="text-white font-satoshiMedium text-center opacity-80 hover:opacity-100 transition-all duration-400"
              >
                support@thethunderclap.com
              </a>
            </div>
          </div>
          <div>
            <a
              href="https://thethunderclap.com/"
              target="_blank"
              className="cursor-pointer"
            >
              <img src="images/thunderclap-logo.svg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
