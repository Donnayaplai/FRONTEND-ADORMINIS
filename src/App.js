import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Alert from './components/Others/Alert';
import Register from './components/RegisterLogin/Register';
import Login from './components/RegisterLogin/Login';
import HomePage from './pages/HomePage';
import Utility from './components/Utility/Utility';
import UtilitySummary from './components/Utility/UtilitySummary';
import DormSetting from './components/Dorm/DormSetting';
import NotFound from './components/Others/NotFound';
// import Room from './pages/Room';
// import AllRoom from './components/Room/AllRoom';
// import Accordion from './components/Accordion/Accordion';
import DormList from './pages/DormList';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/userActions';
import setAuthToken from './utils/setAuthToken';
import Layout from './components/Layout/Layout';
import FrequentlyAskQuestions from './pages/FAQ';
import ContactUs from './pages/ContactUs';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Alert />
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/faq' exact component={FrequentlyAskQuestions} />
          <Route path='contact-us' exact component={ContactUs} />
          <Route path='/all-building/:dormid' component={DormList} />
          {/* <Route path='/all-room/:buildingid' component={Room} /> */}
          <Route path='/utility' component={Utility} />
          <Route path='/utilsummary' component={UtilitySummary} />
          <Route path='/dormsetting' component={DormSetting} />
          <Route path='*' component={NotFound} />
        </Switch>
      </Layout>
    </Provider>
  );
}

export default App;
