
import React, { useEffect } from 'react';
import Home from "./pages/Home";

import Profiles from "./pages/Profiles";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Preferences from './pages/Preferences';
import Profile from './pages/Profile';
import AllRequests from "./pages/AllRequests";
import AddChild from "./pages/AddChild";
import ViewDetails from './components/ViewDetails/ViewDetails';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './Store/auth';
import RequestHistory from './components/Profile/RequestHistory';
import Settings from './components/Profile/Settings';
import UpdateChild from './pages/UpdateChild';

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []
  )
  return (

    <div>


      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />

        <Route path='/all-profiles' element={<Profiles />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/preferences' element={<Preferences />} />
        <Route path='/profile' element={<Profile />}>
        
         {role==="user" ? <Route index element={<RequestHistory />} />:<Route index element={<AllRequests />} />}
          <Route path='/profile/settings' element={<Settings />} />
          {role==="admin" && <Route path='/profile/add-child' element={<AddChild />} />}
        </Route>
        <Route path='/view-child-details/:id' element={<ViewDetails />} />
        <Route path='/updateChild/:id' element={<UpdateChild />} />
      </Routes>
      <Footer />

    </div>
  )
}

export default App;