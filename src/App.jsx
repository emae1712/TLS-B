import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './styles/App.scss';
// import Home from './components/Home';
import Login from './components/Login';
import ChangePassword from './components/ChangePassword';
import AuthProvider from './Context/Auth';
import PrivateRoute from './Context/PrivateRoute';
import Query from './components/Query';
import HistoricConsultations from './components/HistoricConsultations';
// import InformationofInterest from './components/InformacionofInterest';
import RegisterTable from './components/Table';
import Detail from './components/Details';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Switch>
            <PrivateRoute exact path="/" component={Query} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/consultasVigentes" component={RegisterTable} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/consultasHistoricas" component={HistoricConsultations} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/informacion" component={Detail} />
          </Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/recoverPassword" component={ChangePassword} />
        </div>
      </Router>
    </AuthProvider>

  );
}

export default App;
