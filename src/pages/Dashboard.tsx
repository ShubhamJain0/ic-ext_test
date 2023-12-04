import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BodyText, Button, Header, HeaderBold } from '../components/UI';
import { ConnectionCard } from '../components/ConnectionCard';
import { ActivityCard } from '../components/ActivityCard';
import { getRecentActivities, getRecentConnections } from '../utils/apis';

const Dashboard = () => {
  const { state } = useLocation();
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(state?.isFirstTimeUser || true);
  const [recentConnections, setRecentConnections] = useState<any>([]);
  const [recentActivity, setRecentActivity] = useState<any>([]);
  const navigate = useNavigate();

  const closePopup = () => {
    setIsFirstTimeUser(false);
    window.history.replaceState({}, document.title);
  };

  const onRecentConnectionClick = (connection: any) => {
    //Navigate to compression page
    navigate('/select-website', {
      state: {
        hasRecentConnections: recentConnections.length,
        step: 2,
        selectedConnection: { label: connection?.name, value: connection?.id },
      },
    });
  };

  const onRecentActivityClick = () => {
    //Navigate to success page
  };

  useEffect(() => {
    (async () => {
      await getRecentConnections(onRecentConnectionsSuccess, onRecentConnectionsError);
      await getRecentActivities(onRecentActivitiesSuccess, onRecentActivitiesError);
    })();
  }, []);

  const onRecentConnectionsSuccess = (data: any) => {
    setRecentConnections(data?.data);
  };

  const onRecentConnectionsError = () => {};

  const onRecentActivitiesSuccess = (data: any) => {
    setRecentActivity(data?.data);
  };

  const onRecentActivitiesError = () => {};

  return (
    <div
      className={`relative flex flex-col min-h-screen ${
        isFirstTimeUser && 'overflow-hidden max-h-[100vh]'
      }`}
    >
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
      <div className="px-[40px] max-w-[1440px] mx-auto">
        {/* Nav Bar */}
        <div className="relative flex flex-row flex-wrap py-[36px] gap-4 items-center justify-between">
          <div>
            <img src="images/octo-optimizer-full-logo.svg" />
          </div>
          <div>
            <div className="flex flex-row gap-[40px] bg-[#FFFFFF47] px-[24px] py-[12px] rounded-[39px] shadow-[inset_-1px_-1px_0px_0px_#FFFFFF47]">
              <a
                href="#"
                className="opacity-80 hover:opacity-100 transition-all duration-400"
              >
                <Header
                  content="Connected Sites"
                  lgSize="lg:text-bodySm"
                  mdSize="md:text-bodySm"
                  smSize="sm:text-bodyXs"
                  xsSize="xs:text-bodyXs"
                  align="text-center"
                />
              </a>
              <a
                href="#"
                className="opacity-80 hover:opacity-100 transition-all duration-400"
              >
                <Header
                  content="Task History"
                  lgSize="lg:text-bodySm"
                  mdSize="md:text-bodySm"
                  smSize="sm:text-bodyXs"
                  xsSize="xs:text-bodyXs"
                  align="text-center"
                />
              </a>
              <a
                href="#"
                className="opacity-80 hover:opacity-100 transition-all duration-400"
              >
                <Header
                  content="Learn More"
                  lgSize="lg:text-bodySm"
                  mdSize="md:text-bodySm"
                  smSize="sm:text-bodyXs"
                  xsSize="xs:text-bodyXs"
                  align="text-center"
                />
              </a>
            </div>
          </div>
          <div className="bg-[#FFFFFF47] rounded-[114px] rounded-br-[0px] px-[16px] py-[12px] shadow-[inset_-1px_-1px_0px_0px_#FFFFFF26]">
            <BodyText content="ED" xlSize="xl:text-bodyMd" lgSize="lg:text-bodyMd" />
          </div>
        </div>
        {/* Main Component */}
        <div className="relative mt-[76px] mb-[172px]">
          <div className="flex px-[32px] items-center">
            <div className="basis-3/5">
              <Header content="It's a pleasure to have you here, Emma!" />
              <div className="mt-[12px]">
                <BodyText
                  content="Import a new website or choose from your old ones to get started."
                  opacity="opacity-70"
                />
              </div>
            </div>
            <div className="basis-1/2 flex justify-end">
              <Button
                label="Optimize a website"
                type="button"
                onClick={() =>
                  navigate('/select-website', {
                    state: { hasRecentConnections: recentConnections.length > 0 },
                  })
                }
              />
            </div>
          </div>
          {/* Recent Connections */}
          <div className="bg-[#131B2D] p-[40px] rounded-[36px] rounded-br-[0px] mt-[30px] border-[#DADCF633] border-[1px]">
            <div className="flex flex-row items-center justify-between">
              <Header
                content="Recent connections"
                lgSize="lg:text-headingSm"
                mdSize="md:text-headingSm"
              />
              <Button
                label={`View all (${recentConnections.length})`}
                type="button"
                size="medium"
                disabled={!recentConnections.length}
              />
            </div>
            {!recentConnections.length ? (
              <div className="bg-[#FFFFFF12] p-[100px] rounded-[12px] rounded-br-[0px] mt-[40px] flex flex-col items-center">
                <div className="flex flex-col items-center max-w-[450px]">
                  <HeaderBold content="No connections found" align="text-center" />
                  <div className="mt-[8px]">
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
                    <Button label="Start now" type="button" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 grid-cols-1 gap-[24px] mt-[40px]">
                {recentConnections.map((connection: any) => (
                  <ConnectionCard
                    image_url={connection.image_url}
                    name={connection.name}
                    activity={connection.activity}
                    onClick={() => onRecentConnectionClick(connection)}
                  />
                ))}
              </div>
            )}
          </div>
          {/* Recent Activities */}
          <div className="bg-[#131B2D] p-[40px] rounded-[36px] rounded-br-[0px] mt-[50px] border-[#DADCF633] border-[1px]">
            <div className="flex flex-row items-center justify-between">
              <Header
                content="Recent activities"
                lgSize="lg:text-headingSm"
                mdSize="md:text-headingSm"
              />
              <Button
                label={`View all (${recentActivity.length})`}
                type="button"
                size="medium"
                disabled={!recentActivity.length}
              />
            </div>
            {!recentActivity.length ? (
              <div className="bg-[#FFFFFF12] p-[100px] rounded-[12px] rounded-br-[0px] mt-[40px] flex flex-col items-center">
                <div className="flex flex-col items-center max-w-[450px]">
                  <HeaderBold content="No recent activity" align="text-center" />
                  <div className="mt-[8px]">
                    <BodyText
                      content="Whenever you want to review the progress, simply check in here for a detailed log of your past actions. Still, don't know how to begin?"
                      xlSize="xl:text-bodySm"
                      lgSize="lg:text-bodySm"
                      mdSize="md:text-bodySm"
                      opacity="opacity-70"
                      align="text-center"
                    />
                  </div>
                  <div className="mt-[24px]">
                    <Button label="Explore our guide" type="button" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-[40px]">
                <div className="grid grid-cols-7 gap-4 mb-[24px]">
                  <div className="col-span-2">
                    <Header
                      content="Task"
                      lgSize="lg:text-bodyLg"
                      mdSize="md:text-bodyMd"
                      smSize="sm:text-bodySm"
                      xsSize="xs:text-bodyXs"
                    />
                  </div>
                  <Header
                    content="Status"
                    lgSize="lg:text-bodyLg"
                    mdSize="md:text-bodyMd"
                    smSize="sm:text-bodySm"
                    xsSize="xs:text-bodyXs"
                    align="text-center"
                  />
                  <Header
                    content="Date"
                    lgSize="lg:text-bodyLg"
                    mdSize="md:text-bodyMd"
                    smSize="sm:text-bodySm"
                    xsSize="xs:text-bodyXs"
                    align="text-center"
                  />
                  <Header
                    content="Data Saved"
                    lgSize="lg:text-bodyLg"
                    mdSize="md:text-bodyMd"
                    smSize="sm:text-bodySm"
                    xsSize="xs:text-bodyXs"
                    align="text-center"
                  />
                  <Header
                    content="Images"
                    lgSize="lg:text-bodyLg"
                    mdSize="md:text-bodyMd"
                    smSize="sm:text-bodySm"
                    xsSize="xs:text-bodyXs"
                    align="text-center"
                  />
                  <Header
                    content=""
                    lgSize="lg:text-bodyLg"
                    mdSize="md:text-bodyMd"
                    smSize="sm:text-bodySm"
                    xsSize="xs:text-bodyXs"
                    align="text-center"
                  />
                </div>
                <div className="w-full h-[1px] bg-[#F4F4F5] opacity-10 mb-[24px]"></div>
                {recentActivity.map((activity: any, index: number) => (
                  <>
                    <ActivityCard
                      name={activity.name}
                      description={activity.description}
                      date={activity.date}
                      status={activity.status}
                      imageCount={activity.imageCount || 0}
                      percentageSaved={activity.percentageSaved}
                      sizeSaved={activity.sizeSaved}
                      onClick={() => onRecentActivityClick()}
                    />
                    {index !== recentActivity.length - 1 && (
                      <div className="w-full h-[1px] bg-[#F4F4F5] opacity-10 my-[24px]"></div>
                    )}
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div
        className={`${
          isFirstTimeUser ? 'relative' : 'absolute'
        } bottom-0 left-0 right-0 bg-[rgba(255,255,255,0.15)] backdrop-blur-[12px]`}
      >
        <div className="flex flex-row gap-4 items-center justify-between px-[40px] py-[24px] max-w-[1440px] mx-auto min-[1440px]:px-[100px]">
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
      {/* Popup Component - This should be below of all components so that it is always on top of other components */}
      {isFirstTimeUser && (
        <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.7)]">
          <div className="bg-TypographyDark rounded-[12px] p-[32px] flex flex-col items-center max-w-[85vw] max-h-[85vh] overflow-y-auto">
            <div className="relative">
              <div>
                <img src="images/illustration.svg" alt="help" width={'100%'} />
              </div>
              <div className="absolute -top-[6px] -right-[6px] cursor-pointer">
                <img
                  src="images/close-button.svg"
                  alt="close"
                  onClick={() => closePopup()}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-[80%]">
              <span className="mt-[32px]"></span>
              <HeaderBold content="Hi Emma, let's get you started!" />
              <span className="mt-[8px]"></span>
              <BodyText
                content="Boost your website's speed and user experience with our image compression. Keep quality high and loading times low."
                xlSize="xl:text-bodySm"
                lgSize="lg:text-bodySm"
                mdSize="md:text-bodySm"
                color="text-TypographyLight"
                align="text-center"
              />
              <span className="mt-[24px]"></span>
              <Button
                label="Optimize a website"
                type="button"
                onClick={() =>
                  navigate('/select-website', {
                    state: { hasRecentConnections: recentConnections.length > 0 },
                  })
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
