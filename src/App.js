/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/userActions';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './constants/userConstants';
import Routes from './Routes';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Navbar/Footer';
// import Header from './components/Navbar/Header';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route component={Routes} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
