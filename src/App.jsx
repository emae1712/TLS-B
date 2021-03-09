import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  // Link
} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import ChangePassword from './components/ChangePassword';
import AuthProvider from './Context/Auth';
import PrivateRoute from './Context/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/recoverPassword" component={ChangePassword} />
        </div>
      </Router>
    </AuthProvider>

  );
}

export default App;
