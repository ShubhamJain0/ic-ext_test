import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BodyText, Button, Header, HeaderBold, HelpTag, Input } from '../components/UI';
import { loginUser } from '../utils/apis';
import { AuthContext } from '../utils/hooks/useAuth';
import { useGoogleSignIn } from '../utils/hooks/useGoogleSignIn';
//@ToDo: leverage react-router form
const Login = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [errorText, setErrorText] = useState({
    email: '',
    password: '',
  });
  const {
    login: googleLogin,
    userDetails,
    isAuthenticated: googleIsAuthenticated,
  } = useGoogleSignIn();
  const { login } = useContext(AuthContext);

  //Handle login from google
  useEffect(() => {
    if (googleIsAuthenticated) {
      login(userDetails!, false);
    }
  }, [googleIsAuthenticated]);

  const handleOnValueChange = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    console.log('called', { fieldName, fieldValue });

    //Shows error text if field is empty
    if (!fieldValue) {
      setErrorText({ ...errorText, [fieldName]: 'This field is required' });
    } else {
      setErrorText({ ...errorText, [fieldName]: '' });
    }

    const updatedFormData: any = { ...formValues };
    updatedFormData[fieldName] = fieldValue;
    setFormValues(updatedFormData);
  };

  const onSuccess = (responseData: any) => {
    console.log('User data', responseData);
    login(responseData?.payload, false);
  };

  const onError = (status: number) => {
    if (status === 400) {
      setErrorText({ ...errorText, password: "Password doesn't match" });
    } else if (status === 404) {
      setErrorText({ ...errorText, email: "Email doesn't match" });
    }
    return;
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    console.log('Updated values', formValues);
    //Check if any of the field is not filled and show error
    if (!formValues.email || !formValues.password) {
      setErrorText({
        email: !formValues.email ? 'This field is required' : '',
        password: !formValues.password ? 'This field is required' : '',
      });
      return;
    }
    //call login api
    loginUser(formValues, onSuccess, onError);
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
        <div className="flex flex-col items-center mb-[36px]">
          <img src="images/octo-black.svg" />
        </div>
        <Header
          content="Welcome back!"
          color="text-TypographyDark"
          lgSize="lg:text-headingMd"
          align="text-center"
        />
        <div className="mt-[10px]">
          <BodyText
            content="Enter your credentials to access your account."
            color="text-TypographyDark"
            opacity="opacity-70"
            xlSize="xl:text-bodyLg"
            align="text-center"
          />
        </div>
        <div className="max-w-[480px] mx-auto">
          <form
            id="registration-form"
            name="registration-form"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              marginTop: 50,
            }}
            onSubmit={handleFormSubmit}
          >
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formValues.email}
              onChange={handleOnValueChange}
              errorText={errorText.email}
              icon="email"
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formValues.password}
              onChange={handleOnValueChange}
              errorText={errorText.password}
              icon="password"
            />
            <div className="items-end flex flex-col cursor-pointer" onClick={() => {}}>
              <Header
                content="Forgot Password"
                color="text-Primary"
                lgSize="lg:text-bodyLg"
                mdSize="md:text-bodyMd"
                smSize="sm:text-bodySm"
                xsSize="xs:text-bodyXs"
              />
            </div>
            <div className="mt-[20px] flex flex-col">
              <Button label="Login" type="submit" />
            </div>
          </form>
          <div
            onClick={googleLogin}
            className="mt-[30px] py-[18px] border-[1px] border-TypographyLight rounded-[44px] flex flex-row gap-4 items-center justify-center cursor-pointer"
          >
            <img src="images/google.svg" />
            <Header
              content="Sign in with Google"
              color="text-TypographyDark"
              lgSize="lg:text-bodyLg"
              mdSize="md:text-bodyMd"
              smSize="sm:text-bodySm"
              xsSize="xs:text-bodyXs"
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center justify-center mt-[40px]">
          <BodyText
            content="Don't have an account?"
            color="text-TypographyDark"
            xlSize="xl:text-bodyLg"
          />
          <div className="cursor-pointer" onClick={() => navigate('/register')}>
            <Header
              content="Sign-up"
              lgSize="lg:text-bodyLg"
              mdSize="md:text-bodyMd"
              smSize="sm:text-bodySm"
              xsSize="xs:text-bodyXs"
              color="text-Primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
