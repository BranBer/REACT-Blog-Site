import React, {useContext, useState, useEffect} from 'react';
import SiteHeader from '../components/SiteHeader/SiteHeader'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Panel from '../components/BlogPanel/BlogPanel';

import AboutPage from '../pages/AboutPage';
import HomePage from '../pages/HomePage';
import SubmitPage from '../pages/SubmitPage';
import AdminPage from '../pages/AdminPage';
import ByYouPanel from '../components/ByYou/ByYouPanel';
import BlogPostSelected from '../components/BlogPost/BlogPostSelected';
import Login from '../components/Login/Login';
import Registration from '../components/Register/Registration';
import UserProfile from '../components/UserProfile/UserProfile';
import ForgotPassword from '../components/ForgotPassword/ForgotPassword';
import ResetPassword from '../components/ResetPassword/ResetPassword';
import {SelectedPostContext} from '../components/BlogPost/SelectedPostContext';
import SelectedByYouPost from '../components/ByYou/SelectedByYouPost';

function App() {

  return (
    <Router>    
      <div className="App">

        <SiteHeader/> 

        <Switch>          
          <Route path="/About" component = {AboutPage}/>  
          <Route path="/BlogPosts/:position" 
                 render = {(props) => <Panel {...props} key = {Math.random().toString(36).substring(2,10)} />}/>
          <Route path="/BlogPostsByYou/:position" 
                 render = {(props) => <ByYouPanel {...props} key = {Math.random().toString(36).substring(2,10)} />}/>
          <Route path="/Submit" component = {SubmitPage}/>
          <Route path="/post/:id" component = {BlogPostSelected}/> 
          <Route path="/AdminLogin" component = {AdminPage}/> 
          <Route path="/Login" component = {Login}/> 
          <Route path="/Registration" component = {Registration}/> 
          <Route path="/Profile" component = {UserProfile}/> 
          <Route path="/ForgotPassword" component = {ForgotPassword}/> 
          <Route path="/ResetPassword" component = {ResetPassword}/>
          <Route path="/postsByYou/:id" component = {SelectedByYouPost}/>
          <Route path="/" component = {HomePage}/> 
        </Switch>

      
      </div>
    </Router>

  );
}

export default App;
