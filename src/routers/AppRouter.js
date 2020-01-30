import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import { PrivateRoute } from './PrivateRouter';
import ProfilePage from '../components/ProfilePage';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';
import LoginPage from '../components/LoginPage';
import SignUpPage from '../components/SignUpPage';
import StudentsPage from '../components/StudentsPage';
import ClassesPage from '../components/ClassesPage';
import TeachersPage from '../components/TeachersPage';
import UploadPage from '../components/UploadPage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={DashboardPage} exact={true} />
        <PrivateRoute path="/students" component={StudentsPage} exact={true} />
        <PrivateRoute path="/classes" component={ClassesPage} />
        <PrivateRoute path="/teachers" component={TeachersPage} />
        <PrivateRoute path="/upload" component={UploadPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
