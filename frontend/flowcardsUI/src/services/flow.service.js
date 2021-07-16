import { prod, dev } from '../../config.json';
import { fetchCards, addCard, modifyCard, setCards } from '../stores/cards';

const isProd = import.meta.env.PROD;

const {
  getAllCardsApi,
  updateCardApi,
  createCardApi,
  deleteCardApi,
  createUserApi,
  getUserCardsApi,
  signupApi,
  loginApi,
  logoutApi
} = isProd ? prod : dev;

const url = isProd ? 'https://flowcards-xvz8u.ondigitalocean.app/' : 'http://localhost:3001/';

function register(data) {
  try {
    return fetch(
      url + signupApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => res.json()).then(user => user);
  } catch (error) {
    console.error(error);
  }
}

function login(data) {
  try {
    return fetch(
      url + loginApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => res.json()).then(user => user);
  } catch (error) {
    console.error(error);
  }
}

function logout() {
  try {
    return fetch(
      url + logoutApi
    ).then(res => {
      localStorage.removeItem('fc_jwt');
      localStorage.removeItem('fc_ud');
      setCards([]);
      return {
        message: res,
        success: true
      }
    });
  } catch (error) {
    console.error(error);
  }
}

function saveCard(data) {  
  try {
    return fetch(url + createCardApi + getUserData()._id, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getToken()
      },
      body: JSON.stringify(data)
     }).then(res => res.json()).then(card => fetchCards());
  } catch (error) {
    console.error(error);
  }
}

function updateCard(data, index) {
  try {
    return fetch(url + updateCardApi + data.id, { 
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getToken()
      },
      body: JSON.stringify(data)
     }).then(res => res.json()).then(card => fetchCards());
  } catch (error) {
    console.error(error);
  }
}

function getAllCards() {
  try {
    return fetch(url + getAllCardsApi).then(res => res.json()).then(data => data);
  } catch (e) {
    console.error(e);
  }
}

function removeCard({ _id }) {
  try {
    return fetch(url + deleteCardApi + _id, { 
      method: 'DELETE', 
      headers: {
        'Authorization': getToken()
      }
    }).then(res => fetchCards());
  } catch (error) {
    console.error(error);
  }
}

function createUser(data) {
  try {
    return fetch(url + createUserApi, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
     }).then(res => res.json()).then(user => user);
  } catch (error) {
    console.error(error);
  }
}

function getUserCards() {
  try {
    let { _id } = getUserData();
    return fetch(url + getUserCardsApi + _id, {
      headers: {
        'Authorization': getToken()
      }
    }).then(res => res.json()).then(data => data);
  } catch (e) {
    console.error(e);
  }
}

function getUserData() {
  return JSON.parse(localStorage.getItem('fc_ud'));
}

function getToken() {
  return 'Bearer ' + localStorage.getItem('fc_jwt');
}

export { getAllCards, removeCard, saveCard, updateCard, createUser, register, login, logout, getUserCards }