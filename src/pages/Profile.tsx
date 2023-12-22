import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  BodyText,
  Button,
  Header,
  HeaderBold,
  Input,
  ToastMessage,
} from '../components/UI';
import { Verified } from '../components/svg-components';
import { resendVerificationEmail } from '../utils/apis';

const Profile = () => {
  const { isUserVerified, userInfo } = useContext(AuthContext);
  const [profileName, setProfileName] = useState('');

  const navigate = useNavigate();

  const [showSaveButton, setShowSaveButton] = useState(false);

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    newPassword: '',
  });

  const [toastConfig, setToastConfig] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>({
    message: '',
    type: 'success',
  });
  const [showToast, setShowToast] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  //Set profile initials and default form values
  useEffect(() => {
    if (userInfo?.name) {
      let temp = userInfo?.name.split(' ');
      if (temp.length > 1) {
        setProfileName(`${temp[0][0]?.toUpperCase()}${temp[1][0]?.toUpperCase()}`);
      } else {
        setProfileName(temp[0][0]?.toUpperCase());
      }
      setFormValues({
        name: userInfo?.name,
        email: userInfo?.email,
        password: '',
        newPassword: '',
      });
    }
  }, [userInfo]);

  //Handle save button visibility
  useEffect(() => {
    if (formValues.password && formValues.newPassword) {
      setShowSaveButton(true);
    } else {
      setShowSaveButton(false);
    }
  }, [formValues]);

  const handleOnValueChange = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    if (fieldName === 'email' || fieldName === 'name') {
      return;
    }

    const updatedFormData: any = { ...formValues };
    updatedFormData[fieldName] = fieldValue;
    setFormValues(updatedFormData);
  };

  const resendEmail = async () => {
    await resendVerificationEmail(onEmailResendSuccess, onEmailResendError);
  };

  const onEmailResendSuccess = (data: any) => {
    setToastConfig({ message: 'Email sent successfully', type: 'success' });
    setShowToast(true);
  };

  const onEmailResendError = (error: any) => {
    setToastConfig({ message: 'Error while sending email', type: 'error' });
    setShowToast(true);
  };

  const onCancel = () => {
    setFormValues({
      name: userInfo?.name,
      email: userInfo?.email,
      password: '',
      newPassword: '',
    });
  };

  const onSave = () => {
    //Call api here
    //On success
    setFormValues({
      name: userInfo?.name,
      email: userInfo?.email,
      password: '',
      newPassword: '',
    });
    setToastConfig({ message: 'Changes successfully saved!', type: 'success' });
    setShowToast(true);
  };

  return (
    <div className={`relative flex flex-col min-h-screen`}>
      {/* Bg Gradient */}
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-veryDarkBlue from-0.01% to-darkBlue to-99.99%" />
      {/* Bg Image */}
      <div
        className="absolute top-0 right-0 bottom-0 left-0 bg-cover bg-[center_12rem] bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(images/dashboard-bg.png)` }}
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
                />
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
          <div className="bg-[#131B2D] relative rounded-[36px] rounded-br-[0px] mt-[30px] border-[#DADCF633] border-[1px]">
            {/* Name Card */}
            <div className="bg-[url(images/profile-bg.png)] bg-cover bg-no-repeat bg-[center] px-[40px] py-[60px] rounded-[36px] rounded-bl-[0px] rounded-br-[0px]">
              <div className="max-w-[1040px] mx-auto flex flex-row items-center gap-8">
                <div className="p-[40px] min-w-[150px] min-h-[150px] bg-[#FFFFFF26] rounded-[100px] shadow-[inset_-3.3333332538604736px_-3.3333332538604736px_0px_0px_#FFFFFF26] flex justify-center">
                  <Header content={`${profileName}`} color="text-white" />
                </div>
                <div>
                  <div className="flex flex-row gap-4 items-center">
                    <Header content={userInfo.name} lgSize="lg:text-headingMd" />
                    {/* Tag */}
                    <div className="px-[12px] py-[6px] border-[1px] border-[#9EE2FF40] bg-[#9EE2FF1F] rounded-[4px]">
                      <BodyText
                        content="Member since 2013"
                        xlSize="xl:text-bodyXs"
                        lgSize="lg:text-bodyXs"
                        mdSize="md:text-bodyXs"
                        smSize="sm:text-bodyXs"
                        mediumFont
                        color="text-Secondary"
                      />
                    </div>
                  </div>
                  <div className="mt-[8px]">
                    <BodyText
                      content="Member since October 2013"
                      xlSize="xl:text-bodyLg"
                      opacity="opacity-75"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Info and Actions */}
            <div className="px-[40px] py-[60px]">
              <div className="max-w-[1040px] mx-auto">
                <div className="flex flex-row gap-4 items-center justify-between">
                  <div>
                    <HeaderBold content={'User Profile'} />
                    <BodyText
                      content="Secure and personalize your account by easily updating your basic details."
                      xlSize="xl:text-bodySm"
                      lgSize="lg:text-bodySm"
                      mdSize="md:text-bodySm"
                      color="text-TypographyLight"
                    />
                  </div>
                  {showSaveButton && (
                    <div className="flex flex-row gap-8 items-center">
                      <div className="cursor-pointer" onClick={onCancel}>
                        <Header
                          content="Cancel"
                          lgSize="lg:text-bodySm"
                          mdSize="md:text-bodySm"
                          smSize="sm:text-bodySm"
                          xsSize="xs:text-bodyXs"
                        />
                      </div>
                      <Button
                        label="Save Changes"
                        onClick={onSave}
                        type="button"
                        size="medium"
                      />
                    </div>
                  )}
                </div>
                <div className="my-[40px] w-full h-[1px] bg-[#FFFFFF1F]"></div>
                {/* User name  */}
                <div className="flex flex-row gap-4 items-center justify-between">
                  <div>
                    <HeaderBold content={'User name'} lgSize="lg:text-headingBoldMd" />
                    <BodyText
                      content="Visible on your profile page and serving as your avatar."
                      xlSize="xl:text-bodySm"
                      lgSize="lg:text-bodySm"
                      mdSize="md:text-bodySm"
                      color="text-TypographyLight"
                    />
                  </div>
                  <div className="flex-1 max-w-[400px]">
                    <Input
                      label={''}
                      name={'name'}
                      placeholder={'Name'}
                      type="text"
                      onChange={handleOnValueChange}
                      value={formValues.name}
                      icon="user-avatar"
                      disabled
                    />
                  </div>
                </div>
                {/* Email */}
                <div className="flex flex-row gap-4 items-center justify-between mt-[36px]">
                  <div>
                    <HeaderBold content={'Email ID'} lgSize="lg:text-headingBoldMd" />
                    <BodyText
                      content="You can sign into Octo Optimizer with this email address."
                      xlSize="xl:text-bodySm"
                      lgSize="lg:text-bodySm"
                      mdSize="md:text-bodySm"
                      color="text-TypographyLight"
                    />
                  </div>
                  <div className="flex-1 max-w-[400px]">
                    <Input
                      label={''}
                      name={'email'}
                      placeholder={'Email'}
                      type="email"
                      onChange={handleOnValueChange}
                      value={formValues.email}
                      icon="email"
                      disabled
                      rightComponent={
                        isUserVerified ? (
                          <Verified fillColor="#4519E8" />
                        ) : (
                          <div className="cursor-pointer" onClick={() => resendEmail()}>
                            <Header
                              content="Verify&nbsp;Email"
                              lgSize="lg:text-bodySm"
                              mdSize="md:text-bodySm"
                              color="text-Primary"
                            />
                          </div>
                        )
                      }
                    />
                  </div>
                </div>
                <div className="my-[40px] w-full h-[1px] bg-[#FFFFFF1F]"></div>
                {/* Password */}
                <div className="flex flex-row gap-4 items-start justify-between">
                  <div>
                    <HeaderBold
                      content={'Change password'}
                      lgSize="lg:text-headingBoldMd"
                    />
                    <BodyText
                      content="Seamlessly update your password for enhanced security."
                      xlSize="xl:text-bodySm"
                      lgSize="lg:text-bodySm"
                      mdSize="md:text-bodySm"
                      color="text-TypographyLight"
                    />
                  </div>
                  <div className="flex-1 max-w-[400px]">
                    <Input
                      label={''}
                      name={'password'}
                      placeholder={'Enter your current password'}
                      type={showPassword ? 'text' : 'password'}
                      onChange={handleOnValueChange}
                      value={formValues.password}
                      icon="password"
                      rightComponent={
                        formValues.password ? (
                          showPassword ? (
                            <div
                              className="cursor-pointer"
                              onClick={() => setShowPassword(false)}
                            >
                              <img src="/images/eye-slash.svg" />
                            </div>
                          ) : (
                            <div
                              className="cursor-pointer"
                              onClick={() => setShowPassword(true)}
                            >
                              <img src="/images/eye.svg" />
                            </div>
                          )
                        ) : null
                      }
                    />
                    <div className="mt-[8px]"></div>
                    <Input
                      label={''}
                      name={'newPassword'}
                      placeholder={'Enter new password'}
                      type={showNewPassword ? 'text' : 'password'}
                      onChange={handleOnValueChange}
                      value={formValues.newPassword}
                      icon="password"
                      rightComponent={
                        formValues.newPassword ? (
                          showNewPassword ? (
                            <div
                              className="cursor-pointer"
                              onClick={() => setShowNewPassword(false)}
                            >
                              <img src="/images/eye-slash.svg" />
                            </div>
                          ) : (
                            <div
                              className="cursor-pointer"
                              onClick={() => setShowNewPassword(true)}
                            >
                              <img src="/images/eye.svg" />
                            </div>
                          )
                        ) : null
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
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
              content={`Copyright © ${new Date().getFullYear()} ThunderClap. All Rights Reserved.`}
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
      <ToastMessage
        message={toastConfig.message}
        type={toastConfig.type}
        show={showToast}
        hide={setShowToast}
      />
    </div>
  );
};

export default Profile;
