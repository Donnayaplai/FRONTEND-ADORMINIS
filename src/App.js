import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Alert from './components/Alert';
import Register from './components/RegisterLogin/Register';
import Login from './components/RegisterLogin/Login';
import Home from './components/Home';
import Utility from './components/Utility/Utility';
import UtilitySummary from './components/Utility/UtilitySummary';
import DormSetting from './components/Dorm/DormSetting';
import NotFound from './components/Others/NotFound';
// import PublicNav from './components/Navbar/PublicNav';
import Navbar from './components/Navbar/Navbar';
import AllRoom from './components/Room/AllRoom';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Navbar />
      <Alert />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        {/* <Route path='/allroom' component={AllRoom} /> */}
        <Route path='/allroom/:dormid/:buildingid' component={AllRoom} />
        {/* <Route path="/allroom" component={MainRoom} />
        <Route path="/addresident/nocode" component={NoCodeRoom} /> */}
        <Route path='/utility' component={Utility} />
        <Route path='/utilsummary' component={UtilitySummary} />
        <Route path='/dormsetting' component={DormSetting} />
        <Route path='*' component={NotFound} />
      </Switch>
    </Provider>
  );
}

export default App;
