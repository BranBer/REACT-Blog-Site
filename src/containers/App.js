import React, {useContext, useState, useEffect} from 'react';
import SiteHeader from '../components/SiteHeader/SiteHeader'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import AboutPage from '../pages/AboutPage';
import BlogPostsPage from '../pages/BlogPostsPage';
import HomePage from '../pages/HomePage';
import SubmitPage from '../pages/SubmitPage';
import AdminPage from '../pages/AdminPage';
import ByYouPanel from '../components/ByYou/ByYouPanel';
import BlogPostSelected from '../components/BlogPost/BlogPostSelected';
import Login from '../components/Login/Login';
import Registration from '../components/Register/Registration';
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
          <Route path="/BlogPosts" component = {BlogPostsPage}/>
          <Route path="/BlogPostsByYou" component = {ByYouPanel}/>
          <Route path="/Submit" component = {SubmitPage}/>
          <Route path="/post/:id" component = {BlogPostSelected}/> 
          <Route path="/AdminLogin" component = {AdminPage}/> 
          <Route path="/Login" component = {Login}/> 
          <Route path="/Register" component = {Registration}/> 
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
