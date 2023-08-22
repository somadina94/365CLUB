import axios from 'axios';

// const baseURL = `https://api.365gainfuldice.com/api/v1/`;
const baseURL = `http://127.0.0.1:5004/api/v1/`;

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export const createAccount = async (data) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: 'users/signUp',
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const logIn = async (data) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: 'users/loginUser',
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const logOut = async () => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: 'users/logout',
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const updatePassword = async (jwt, data) => {
  try {
    const res = await axiosInstance({
      method: 'PATCH',
      url: 'users/updatePassword',
      data,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const forgotPassword = async (data) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: 'users/forgotPassword',
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const resetPassword = async (data, token) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: `users/resetPassword/${token}`,
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const playDice = async (data, jwt) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: `dice`,
      data,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getPlayerHistory = async (jwt) => {
  try {
    const res = await axiosInstance({
      method: 'GET',
      url: `dice`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const playDiceWithBonus = async (data, jwt) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: `dice/bonus-play`,
      data,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getMe = async (jwt) => {
  try {
    const res = await axiosInstance({
      method: 'GET',
      url: `users/me`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    console.log(res);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const uploadPhotos = async (data, jwt) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: `users/verify-account`,
      data,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const withdrawFunds = async (data, jwt) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: `withdraw`,
      data,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const membershipCheckout = async (jwt) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: `payment/membership-checkout`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const topupCheckout = async (data, jwt) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: `payment/topup-checkout`,
      data,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const verifyEmailAddress = async (token) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: `users/verify-email/${token}`,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const resendEmailVerify = async (jwt) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: `users/resend-email-verify-token`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
