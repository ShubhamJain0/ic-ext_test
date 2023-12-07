import React, { useEffect, useState } from 'react';
import { BodyText, Button, Header } from '../components/UI';
import { useLocation, useNavigate } from 'react-router-dom';
import { InProgressCard } from '../components/InProgressCard';
import { SuccessCard } from '../components/SuccessCard';
import { FailureCard } from '../components/FailureCard';

const Result = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [status, setStatus] = useState<'inprogress' | 'success' | 'failure'>(
    'inprogress',
  );

  const [sendEmailAfterSuccess, setSendEmailAfterSuccess] = useState(true);
  const [percentageCompleted, setPercentageCompleted] = useState(0);
  const [totalImageCount, setTotalImageCount] = useState(0);

  //Call status API
  const callStatusAPI = async () => {
    //Here API, if success
    setStatus('inprogress');
    setTotalImageCount(100);
    const interval = setInterval(() => {
      setPercentageCompleted((prevPercentage) => {
        const n = prevPercentage < 100 ? prevPercentage + 1 + 0 : 100;
        if (prevPercentage === 100) {
          clearInterval(interval);
          setStatus('success');
        }
        return n;
      });
    }, 100);
  };

  //Remove this. This is for demo
  useEffect(() => {
    if (state?.data) {
      setStatus(state?.data?.status || 'inprogress');
      if (state?.data?.status === 'inprogress') {
        callStatusAPI();
      }
    } else {
      callStatusAPI();
    }
  }, [state]);

  return (
    <div className={'relative flex flex-col min-h-screen'}>
      {/* Bg Gradient */}
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-veryDarkBlue from-0.01% to-darkBlue to-99.99%" />
      {/* Bg Image */}
      <div
        className="absolute top-0 right-0 bottom-0 left-0 bg-cover bg-[center_12rem] bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(images/dashboard-bg.png)` }}
      />

      {/* Content */}
      <div className="px-[40px] max-w-[1440px] mx-auto w-full">
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
        <div className="relative mt-[102px] mb-[172px]">
          <div className="flex flex-row gap-4 items-start justify-between">
            <div className="basis-1/2">
              <div className="max-w-[80%]">
                <Header
                  content={
                    status === 'inprogress'
                      ? 'Your optimization is in progress.'
                      : status === 'success'
                      ? "Website, optimized! You're all set."
                      : 'Oops, Something Went Wrong!'
                  }
                  color="text-white"
                />
              </div>
              <div className="mt-[20px]">
                <BodyText
                  content={
                    status === 'inprogress'
                      ? 'You can monitor the progress here.'
                      : status === 'success'
                      ? 'Now, experience the delight of faster loading speeds on your website.'
                      : 'We encountered an issue during optimization.'
                  }
                  color="text-white"
                  opacity="opacity-70"
                />
              </div>
              <div className="mt-[32px]">
                {status === 'inprogress' || status === 'success' ? (
                  <Button
                    type="button"
                    label="Back to dashboard"
                    onClick={() => navigate('/dashboard')}
                  />
                ) : (
                  <div className="flex flex-row gap-4">
                    <Button type="button" label="Contact us" onClick={() => {}} />
                    <Button
                      type="button"
                      label="Back to dashboard"
                      onClick={() => navigate('/dashboard')}
                      variant="secondary"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="basis-1/2">
              {status === 'inprogress' && (
                <InProgressCard
                  estimated_time="2 mins"
                  imageCompletedCount={10}
                  imageTotalCount={totalImageCount}
                  percentageCompleted={percentageCompleted}
                  onSendEmailCheck={() => {
                    setSendEmailAfterSuccess(!sendEmailAfterSuccess);
                  }}
                  emailChecked={sendEmailAfterSuccess}
                />
              )}
              {status === 'success' && (
                <SuccessCard
                  savedBytes="4.3 mb"
                  dataProcessed="1000 mb"
                  timeTaken="2 mins"
                  percentageSaved={20}
                  totalImagesOptimized={totalImageCount}
                />
              )}
              {status === 'failure' && (
                <FailureCard failure_reason="Something went wrong" />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-[rgba(255,255,255,0.15)] backdrop-blur-[12px]`}
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
    </div>
  );
};

export default Result;
