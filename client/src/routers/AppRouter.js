import React from 'react';
import { BrowserRouter, Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import history from '../helpers/history';
import PrivateRoute from './PrivateRouter';
import { LoggedOutRouter } from './LoggedOutRouter';
// import ProfilePage from '../components/ProfilePage';
// import DashboardPage from '../components/DashboardPage';
// import LoginPage from '../components/LoginPage';
// import SignUpPage from '../components/SignUpPage';
// import StudentsPage from '../components/StudentsPage';
// import ClassesPage from '../components/ClassesPage';
// import TeachersPage from '../components/TeachersPage';
// import UploadPage from '../components/UploadPage';
//
// const AppRouterReal = () => (
//   <BrowserRouter>
//     <div>
//       <Header />
//       <Switch>
//         <Route path="/" component={DashboardPage} exact={true} />
//         <PrivateRoute path="/students" component={StudentsPage} exact={true} />
//         <PrivateRoute path="/classes" component={ClassesPage} />
//         <PrivateRoute path="/teachers" component={TeachersPage} />
//         <PrivateRoute path="/upload" component={UploadPage} />
//         <Route path="/login" component={LoginPage} />
//         <Route path="/signup" component={SignUpPage} />
//         <Route component={NotFoundPage} />
//       </Switch>
//     </div>
//   </BrowserRouter>
// );

import Header from '../components/common/Header';
import DashboardPage from '../components/Dashboard';
import SchoolPage from '../components/School';
import ClassesPage, { ClassDetails } from '../components/ClassPage';
import TeacherPage, { TeacherDetails } from '../components/TeacherPage';
import StudentsPage, { StudentDetails} from '../components/StudentsPage';
import UploadPage, { UploadDetails } from '../components/UploadPage';
import RegisterPage from '../components/Register';
import LoginPage from '../components/Login';
import NotFoundPage from '../components/common/NotFoundPage';

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={DashboardPage} exact={true} />
        <PrivateRoute path="/school" component={SchoolPage} />
        <PrivateRoute requiresSchool={true} path="/classes" component={ClassesPage} exact={true} />
        <PrivateRoute requiresSchool={true} path="/classes/add" component={ClassDetails} exact={true} />
        <PrivateRoute requiresSchool={true} path="/classes/:id" component={ClassDetails} />
        <PrivateRoute requiresSchool={true} path="/teachers" component={TeacherPage} exact={true} />
        <PrivateRoute requiresSchool={true} path="/teachers/add" component={TeacherDetails} exact={true} />
        <PrivateRoute requiresSchool={true} path="/teachers/:id" component={TeacherDetails} />
        <PrivateRoute requiresSchool={true} path="/students" component={StudentsPage} exact={true} />
        <PrivateRoute requiresSchool={true} path="/students/add" component={StudentDetails} exact={true} />
        <PrivateRoute requiresSchool={true} path="/students/:id" component={StudentDetails} />
        <PrivateRoute requiresSchool={true} path="/upload" component={UploadPage} />
        <LoggedOutRouter path="/login" component={LoginPage} exact={true} />
        <LoggedOutRouter path="/signup" component={RegisterPage}exact={true}  />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter;
