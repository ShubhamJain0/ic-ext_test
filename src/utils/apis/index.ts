const BASE_URL = 'https://ic-backend-test.vercel.app/api/ic_tool/v1';

const getHeaders = () => {
  const headers = new Map();
  headers.set('content-type', 'application/json');

  const authToken = localStorage.getItem('auth_token');
  if (authToken) {
    headers.set('Authorization', authToken);
  }
  return Object.fromEntries(headers);
};

export const signupUser = async (
  body: any,
  onSuccess: (param: any) => void,
  onError: (param: number) => void,
) => {
  try {
    const result = await fetch(`${BASE_URL}/register-user`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (result.ok) {
      const responseData = await result.json();
      console.log('new user created', responseData);
      if (onSuccess) {
        if (responseData?.payload?.authToken) {
          onSuccess(responseData);
        }
      }
      //return responseData;
    } else {
      // Handle error cases here, such as showing an error message to the user
      onError(result.status);
    }
  } catch (error) {
    console.error('Error creating new user:', error);
    // Handle error cases here, such as showing an error message to the user
  }
};

export const loginUser = async (
  body: any,
  onSuccess: (param: any) => void,
  onError: (param: number) => void,
) => {
  try {
    const result = await fetch(`${BASE_URL}/login-user`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (result.ok) {
      const responseData = await result.json();
      if (onSuccess) {
        if (responseData?.payload?.authToken) {
          onSuccess(responseData);
        }
      }
      //return responseData;
    } else {
      // Handle error cases here, such as showing an error message to the user
      onError(result.status);
    }
  } catch (error) {
    console.error('Error login user:', error);
    // Handle error cases here, such as showing an error message to the user
  }
};

export const getSiteToken = async (code: string) => {
  try {
    const headers = getHeaders();
    console.log('headers', headers);
    const result = await fetch(`${BASE_URL}/get-site-token`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        code,
      }),
    });

    if (result.ok) {
      const responseData = await result.json();
      console.log('Site Token updated', responseData);
      /*  const token = await result.json();
      localStorage.setItem('token', token.access_token);
      navigate('/'); 
      if (callback) {
        callback(data);
      }*/
      return responseData;
    } else {
      // Handle error cases here, such as showing an error message to the user
    }
  } catch (error) {
    console.error('Error updating site token:', error);
    // Handle error cases here, such as showing an error message to the user
  }
};

export const getCMSImages = async (
  siteId: string,
  onSuccess: (param: any) => void,
  onError: (param: any) => void,
) => {
  try {
    const headers = getHeaders();
    console.log('headers', headers);
    const result = await fetch(`${BASE_URL}/get-all-cmsImages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        siteId,
      }),
    });

    if (result.ok) {
      const responseData = await result.json();
      console.log('Site Token updated', responseData);
      onSuccess?.(responseData);
      /*  const token = await result.json();
          localStorage.setItem('token', token.access_token);
          navigate('/'); 
          if (callback) {
            callback(data);
          }*/
    } else {
      // Handle error cases here, such as showing an error message to the user
      onError(result);
    }
  } catch (error) {
    console.error('Error updating site token:', error);
    // Handle error cases here, such as showing an error message to the user
  }
};

export const googleSignIn = async (
  code: string,
  onSuccess: (arg: any) => void,
  onError: (arg: any) => void,
) => {
  try {
    const result = await fetch(`${BASE_URL}/google-signin`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        code,
      }),
    });

    if (result.ok) {
      const responseData = await result.json();
      onSuccess(responseData);
    } else {
      // Handle error cases here, such as showing an error message to the user
      onError(result);
    }
  } catch (error) {
    console.error('Error user sign in using google Oauth', error);
    onError(error);
  }
};

export const getRecentConnections = async (
  onSuccess: (arg: any) => void,
  onError: (arg: any) => void,
) => {
  try {
    // const headers = getHeaders();
    // console.log('headers', headers);
    // const result = await fetch(`${BASE_URL}/get-recent-connections`, {
    //   method: 'GET',
    //   headers,
    // });
    // if (result.ok) {
    //   const responseData = await result.json();
    //   onSuccess(responseData);
    // } else {
    //   // Handle error cases here, such as showing an error message to the user
    //   onError(result);
    // }

    //Remove this after logic added
    onSuccess({
      data: [
        {
          image_url: 'images/thumbnail.svg',
          name: 'Adelfox - Engage your audience',
          activity: 'opened just now',
        },
      ],
    });
  } catch (error) {
    console.error('Error getting recent connections:', error);
    // Handle error cases here, such as showing an error message to the user
    onError(error);
  }
};

export const getRecentActivities = async (
  onSuccess: (arg: any) => void,
  onError: (arg: any) => void,
) => {
  try {
    // const headers = getHeaders();
    // console.log('headers', headers);
    // const result = await fetch(`${BASE_URL}/get-recent-activities`, {
    //   method: 'GET',
    //   headers,
    // });
    // if (result.ok) {
    //   const responseData = await result.json();
    //   onSuccess(responseData);
    // } else {
    //   // Handle error cases here, such as showing an error message to the user
    //   onError(result);
    // }

    //Remove this after logic added
    onSuccess({
      data: [
        {
          status: 'inprogress',
          name: 'Adelfox - Engage your audience',
          description: 'OPT - 6725 657 345',
          date: 'Jan 23, 2023',
          imageCount: '5',
          percentageSaved: '50',
          sizeSaved: '9MB',
        },
        {
          status: 'failure',
          name: 'Noon - Make it awesome',
          description: 'OPT - 6725 657 345',
          date: 'Mar 1, 2023',
          imageCount: '1',
          percentageSaved: '20',
          sizeSaved: '2MB',
        },
        {
          status: 'success',
          name: 'Tappa',
          description: 'OPT - 6725 657 345',
          date: 'Mar 1, 2023',
          imageCount: '2',
          percentageSaved: '90',
          sizeSaved: '10MB',
        },
      ],
    });
  } catch (error) {
    console.error('Error getting recent connections:', error);
    // Handle error cases here, such as showing an error message to the user
    onError(error);
  }
};
