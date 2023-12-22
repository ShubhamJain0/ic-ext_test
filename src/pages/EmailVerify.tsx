import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BodyText, Button, Header, ToastMessage } from '../components/UI';
import { resendVerificationEmail } from '../utils/apis';
import { AuthContext } from '../utils/hooks/useAuth';
import { Info } from '../components/svg-components';
//@ToDo: leverage react-router form
const VerifyEmail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userInfo } = useContext(AuthContext);

  const [showToast, setShowToast] = useState(false);

  const resendEmail = async () => {
    await resendVerificationEmail(onSuccess, onError);
  };

  const onSuccess = (data: any) => {
    console.log('Email Sent', data);
    setShowToast(true);
  };

  const onError = (error: any) => {
    console.log('Error', error);
  };

  return (
    <div className="flex flex-row min-h-screen max-h-screen">
      <div className="relative flex flex-col justify-between gap-4 basis-1/2 p-[72px] pb-[0px] bg-gradient-to-r from-darkBlue from-0.01% to-veryDarkBlue to-99.99% overflow-hidden">
        <div className="z-10">
          <div className="flex flex-col items-center">
            <img src="images/signup.png" style={{ maxWidth: '70%' }} />
          </div>
          <div className="flex flex-col items-center mt-[2rem]">
            <h1
              className={`text-white text-center xl:text-[31px] lg:text-[28px] md:text-[20px] sm:text-[14px] xl:leading-[40.3px] lg:leading-[36px] md:leading-[28px] sm:leading-[20px] font-satoshiBold whitespace-pre-line`}
            >
              Connect & optimize
              <span className={`ml-[8px] text-Secondary italic`}>in minutes!</span>
            </h1>
            <div className="mt-[10px] max-w-[400px]">
              <BodyText
                content="Effortless Integration of websites for rapid optimizations."
                xlSize="xl:text-bodyLg"
                lgSize="lg:text-bodyLg"
                align="text-center"
                opacity="opacity-70"
              />
            </div>
          </div>
        </div>
        <div className="z-10 flex flex-row gap-4 items-center justify-between py-[24px] border-t-[1px] border-[#FFFFFF1F]">
          <BodyText
            content="A product by"
            xlSize="xl:text-bodySm"
            lgSize="lg:text-bodySm"
            mdSize="md:text-bodySm"
          />
          <div>
            <img src="images/thunderclap-logo.svg" />
          </div>
        </div>
        <div className="absolute -bottom-40 left-0 ">
          <img src="images/octo-bg.png" style={{ width: '100vw' }} />
        </div>
      </div>
      <div className="basis-1/2 px-[72px] py-[72px] overflow-y-auto">
        <div className="max-w-[480px] mx-auto">
          <div className="flex flex-col items-center mb-[36px]">
            <img src="images/octo-black.svg" />
          </div>
          <Header
            content="Verify your email address"
            color="text-TypographyDark"
            lgSize="lg:text-headingMd"
            align="text-center"
          />
          <div className="mt-[10px]">
            <BodyText
              content={`Please check your inbox and click the link in the email we have just sent to: ${userInfo.email}`}
              color="text-TypographyDark"
              opacity="opacity-70"
              xlSize="xl:text-bodyLg"
              align="text-center"
            />
          </div>
          <div className="mt-[48px] bg-[#9EE2FF40] p-[24px] rounded-[12px]">
            <div className="flex flex-row gap-4 items-start justify-between">
              <div>
                <Info />
              </div>
              <div>
                <BodyText
                  content="Please check your inbox and click the link in email. If you don't see the email, make sure to check your spam folder."
                  color="text-TypographyDark"
                  xlSize="xl:text-bodyLg"
                  lgSize="lg:text-bodyLg"
                />
                <div className="mt-[24px]">
                  <BodyText
                    content="Didn't receive email?"
                    color="text-TypographyDark"
                    xlSize="xl:text-bodyLg"
                    lgSize="lg:text-bodyLg"
                    linkText="Re-send email"
                    onLinkClick={() => resendEmail()}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[12px]">
            <Header
              content="Or"
              color="text-TypographyDark"
              lgSize="lg:text-bodyLg"
              mdSize="md:text-bodyLg"
              smSize="sm:text-bodySm"
              xsSize="xs:text-bodyXs"
              align="text-center"
            />
          </div>
          <div className="mt-[12px] flex flex-col">
            <Button
              label="Continue without verification"
              onClick={() => {
                navigate('/dashboard', {
                  state: { isFirstTimeUser: state?.isFirstTimeUser },
                });
              }}
              type="button"
            />
          </div>
        </div>
      </div>
      <ToastMessage
        message={'Email Sent!'}
        type={'success'}
        show={showToast}
        hide={setShowToast}
      />
    </div>
  );
};

export default VerifyEmail;
