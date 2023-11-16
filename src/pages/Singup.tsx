import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BodyText, Button, Header, HelpTag, Input } from '../components/UI';
import { signupUser } from '../utils/apis';
import { AuthContext } from '../utils/hooks/useAuth';
import { useGoogleSignIn } from '../utils/hooks/useGoogleSignIn';
//@ToDo: leverage react-router form
const Singup = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errorText, setErrorText] = useState({
    name: '',
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
      login(userDetails?.authToken!, true);
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
    login(responseData?.payload?.authToken, true);
  };

  const onError = (status: number) => {
    if (status === 400) {
      setErrorText({ ...errorText, email: 'Email already exists' });
    }
    return;
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    console.log('Updated values', formValues);
    //Check if any of the field is not filled and show error
    if (!formValues.name || !formValues.email || !formValues.password) {
      setErrorText({
        name: !formValues.name ? 'This field is required' : '',
        email: !formValues.email ? 'This field is required' : '',
        password: !formValues.password ? 'This field is required' : '',
      });
      return;
    }
    //call register api
    signupUser(formValues, onSuccess, onError);
  };

  return (
    <div className="flex flex-row min-h-screen max-h-screen">
      <div className="relative flex flex-col basis-1/2 p-20 bg-gradient-to-r from-darkBlue from-0.01% to-veryDarkBlue to-99.99% overflow-hidden">
        <div className="basis-4/5">
          <div className="absolute -bottom-40 left-0 ">
            <img src="../assets/images/octo-bg.png" style={{ width: '100vw' }} />
          </div>
          <img
            src="../assets/images/octo-optimizer-logo.png"
            style={{ height: '62px' }}
          />
          <div className="mt-[65px]">
            <Header content={`Unlock effortless\nimage optimization.`} />
          </div>
          <div className="mt-[20px]">
            <BodyText content="Optimize your images with ease." opacity="opacity-70" />
          </div>
        </div>
        <div style={{ zIndex: 1 }} className="flex flex-row">
          <img src="../assets/images/octopus.png" />
          <div className="-ml-10 mt-5">
            <HelpTag
              text="Curious about how it works?"
              link="#"
              linkText="Read our guide"
            />
          </div>
        </div>
      </div>
      <div className="basis-1/2 p-20 overflow-y-auto">
        <Header
          content="New here? Let's get started!"
          color="text-TypographyDark"
          lgSize="lg:text-headingMd"
        />
        <div className="mt-[10px]">
          <BodyText
            content="Enter your credentials to create your account."
            color="text-TypographyDark"
            xlSize="xl:text-bodyLg"
            opacity="opacity-70"
          />
        </div>
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
            label="Full name"
            type="text"
            name="name"
            placeholder="Enter full name"
            value={formValues.name}
            onChange={handleOnValueChange}
            // required
            errorText={errorText.name}
            icon="user-avatar"
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formValues.email}
            onChange={handleOnValueChange}
            // required
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
            // required
            errorText={errorText.password}
            icon="password"
          />
          <div className="mt-[20px]">
            <Button label="Create account" type="submit" />
          </div>
        </form>
        {/* <div style={{ marginTop: 30 }}>
          <button type="button" onClick={googleLogin}>
            Login with Google
          </button>
        </div> */}
        <div className="flex flex-row gap-2 items-center mt-[40px]">
          <BodyText
            content="Already have an account?"
            color="text-TypographyDark"
            xlSize="xl:text-bodyLg"
          />
          <a
            className="text-Primary text-bodyMd cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Singup;
