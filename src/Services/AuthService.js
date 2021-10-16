import axios from 'axios';
import env from '../env';

const API_URL = `${env.url}api/user/`;

const adminRegister = (
  fName,
  lName,
  dateOfBirth,
  idCardNo,
  gender,
  telNo,
  email,
  password
) => {
  return axios.post(API_URL + 'adminRegister', {
    fName,
    lName,
    dateOfBirth,
    idCardNo,
    gender,
    telNo,
    email,
    password,
  });
};

const checkExistAccount = (idCardNo, dateOfBirth) => {
  return (
    axios.post(API_URL + 'verifyUser'),
    {
      idCardNo,
      dateOfBirth,
    }
  );
};

const residentRegister = (email, password) => {
  return axios.post(API_URL + 'residentRegister', {
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + 'login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.TOKEN) {
        localStorage.setItem('authorization', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('authorization');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('authorization'));
};

export default {
  adminRegister,
  checkExistAccount,
  residentRegister,
  login,
  logout,
  getCurrentUser,
};
