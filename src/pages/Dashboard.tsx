import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BodyText, Button, Header, HeaderBold } from '../components/UI';
import { ConnectionCard } from '../components/ConnectionCard';
import { ActivityCard } from '../components/ActivityCard';
import { getRecentActivities, getRecentConnections } from '../utils/apis';

const Dashboard = () => {
  const { state } = useLocation();
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(state?.isFirstTimeUser || false);
  const [recentConnections, setRecentConnections] = useState<any>([]);
  const [recentActivity, setRecentActivity] = useState<any>([]);
  const navigate = useNavigate();

  const closePopup = () => {
    setIsFirstTimeUser(false);
    window.history.replaceState({}, document.title);
  };

  const onRecentConnectionClick = () => {
    //Navigate to compression page
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
    <div className="relative flex flex-col min-h-screen">
      {/* Bg Gradient */}
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-veryDarkBlue from-0.01% to-darkBlue to-99.99%" />
      {/* Bg Image */}
      <div
        className="absolute top-0 right-0 bottom-0 left-0 bg-cover bg-[center_12rem] bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(../assets/images/dashboard-bg.png)` }}
      />
      {/* Bubbles Bg Image */}
      <div
        className="absolute top-0 right-0 bottom-0 left-0 bg-contain bg-fixed"
        style={{ backgroundImage: `url(../assets/images/bubbles.png)` }}
      />
      {/* Nav Bar */}
      <div className="relative flex flex-row px-[100px] py-[36px] items-center">
        <div className="basis-1/2">
          <img src="../assets/images/octo-optimizer-full-logo.png" />
        </div>
        <div className="basis-1/2">
          <div className="flex flex-row gap-3 bg-[#FFFFFF47] px-[24px] py-[12px] rounded-[39px] shadow-[inset_-1px_-1px_0px_0px_#FFFFFF47]">
            <a className="basis-1/2 cursor-pointer">
              <Header
                content="Connected Sites"
                lgSize="lg:text-bodySm"
                mdSize="md:text-bodySm"
                smSize="sm:text-bodyXs"
                xsSize="xs:text-bodyXs"
                align="text-center"
              />
            </a>
            <a className="basis-1/2 cursor-pointer">
              <Header
                content="Task History"
                lgSize="lg:text-bodySm"
                mdSize="md:text-bodySm"
                smSize="sm:text-bodyXs"
                xsSize="xs:text-bodyXs"
                align="text-center"
              />
            </a>
            <a className="basis-1/2 cursor-pointer">
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
        <div className="basis-1/2 flex justify-end">
          <div className="bg-[#FFFFFF47] rounded-[114px] rounded-br-[0px] px-[15px] py-[12px] shadow-[inset_-1px_-1px_0px_0px_#FFFFFF26]">
            <BodyText content="ED" xlSize="xl:text-bodyMd" lgSize="lg:text-bodyMd" />
          </div>
        </div>
      </div>
      {/* Main Component */}
      <div className="relative px-[100px] my-[25px]">
        <div className="flex px-[32px] items-center">
          <div className="basis-3/5">
            <Header content="It's a pleasure to have you here, Emma!" />
            <div className="mt-[15px]">
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
          <div className="flex justify-end">
            <Button
              label={`View all (${recentConnections.length})`}
              type="button"
              size="medium"
              disabled={!recentConnections.length}
            />
          </div>
          <Header
            content="Recent connections"
            lgSize="lg:text-headingSm"
            mdSize="md:text-headingSm"
          />
          {!recentConnections.length ? (
            <div className="bg-[#FFFFFF12] p-[100px] rounded-[12px] rounded-br-[0px] mt-[40px] flex flex-col items-center">
              <HeaderBold content="No connections found" align="text-center" />
              <div className="mt-[15px]">
                <BodyText
                  content="Once you connect it, you'll find all your latest connections right here, neatly organized and ready to roll."
                  xlSize="xl:text-bodySm"
                  lgSize="lg:text-bodySm"
                  mdSize="md:text-bodySm"
                  opacity="opacity-70"
                  align="text-center"
                />
              </div>
              <div className="mt-[30px]">
                <Button label="Start now" type="button" />
              </div>
            </div>
          ) : (
            <div className="flex flex-row gap-10 items-center mt-[40px]">
              {recentConnections.map((connection: any) => (
                <ConnectionCard
                  image_url={connection.image_url}
                  name={connection.name}
                  activity={connection.activity}
                  onClick={() => onRecentConnectionClick()}
                />
              ))}
            </div>
          )}
        </div>
        {/* Recent Activities */}
        <div className="bg-[#131B2D] p-[40px] rounded-[36px] rounded-br-[0px] mt-[50px] border-[#DADCF633] border-[1px]">
          <div className="flex justify-end">
            <Button
              label={`View all (${recentActivity.length})`}
              type="button"
              size="medium"
              disabled={!recentActivity.length}
            />
          </div>
          <Header
            content="Recent activities"
            lgSize="lg:text-headingSm"
            mdSize="md:text-headingSm"
          />
          {!recentActivity.length ? (
            <div className="bg-[#FFFFFF12] p-[100px] rounded-[12px] rounded-br-[0px] mt-[40px] flex flex-col items-center">
              <HeaderBold content="No recent activity" align="text-center" />
              <div className="mt-[15px]">
                <BodyText
                  content="Whenever you want to review the progress, simply check in here for a detailed log of your past actions. Still, don’t know how to begin?"
                  xlSize="xl:text-bodySm"
                  lgSize="lg:text-bodySm"
                  mdSize="md:text-bodySm"
                  opacity="opacity-70"
                  align="text-center"
                />
              </div>
              <div className="mt-[30px]">
                <Button label="Explore our guide" type="button" />
              </div>
            </div>
          ) : (
            <div className="mt-[40px]">
              <div className="grid grid-cols-7 gap-3 mb-[40px]">
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
                    <div className="w-full h-[1px] bg-[#F4F4F5] opacity-10 my-[20px]"></div>
                  )}
                </>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <div className="relative bg-[rgba(255,255,255,0.15)] px-[100px] py-[28px] flex flex-row gap-3 items-center mt-[100px]">
        <div className="flex flex-row items-center gap-3">
          <BodyText
            content="Copyright © 2023 ThunderClap. All Rights Reserved."
            xlSize="xl:text-bodySm"
            lgSize="lg:text-bodySm"
            mdSize="md:text-bodySm"
          />
          <div className="bg-[rgba(255,255,255,0.2)] px-[15px] py-[4px] rounded-[7px]">
            <a className="text-white font-satoshiMedium text-center cursor-pointer">
              support@thethunderclap.com
            </a>
          </div>
        </div>
        <div className="flex flex-1 justify-end">
          <img src="../assets/images/thunderclap-logo.png" />
        </div>
      </div>
      {/* Popup Component - This should be below of all components so that it is always on top of other components */}
      {isFirstTimeUser && (
        <div className="flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.7)]">
          <div className="bg-TypographyDark rounded-[12px] p-[32px] flex flex-col items-center">
            <div className="relative flex flex-col basis-1/2 items-center justify-center">
              <img
                src="../assets/images/illustration.png"
                alt="help"
                style={{ width: '95%', height: '95%' }}
              />
              <div className="absolute -top-[10px] right-[5px] cursor-pointer">
                <img
                  src="../assets/images/close-button.png"
                  alt="close"
                  onClick={() => closePopup()}
                />
              </div>
            </div>
            <div className="flex flex-col basis-1/2 items-center justify-center mt-[20px] w-[80%]">
              <HeaderBold content="Hi Emma, let's get you started!" />
              <BodyText
                content="Boost your website's speed and user experience with our image compression. Keep quality high and loading times low."
                xlSize="xl:text-bodySm"
                lgSize="lg:text-bodySm"
                mdSize="md:text-bodySm"
                color="text-TypographyLight"
                align="text-center"
              />
              <span className="mt-[10px]"></span>
              <Button
                label="Optimize a website"
                type="button"
                onClick={() => navigate('/select-website')}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
