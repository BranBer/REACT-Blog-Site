import React, {useContext, useState, useEffect} from 'react';
import SiteHeader from '../components/SiteHeader/SiteHeader'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import AboutPage from '../pages/AboutPage';
import BlogPostsPage from '../pages/BlogPostsPage';
import HomePage from '../pages/HomePage';
import SubmitPage from '../pages/SubmitPage';
import AdminLoginPage from '../pages/AdminLoginPage';

import BlogPostSelected from '../components/BlogPost/BlogPostSelected';
import {SelectedPostContext} from '../components/BlogPost/SelectedPostContext';

function App() {

  const PostContext = useContext(SelectedPostContext);  

  const showContext = () =>
  {
    console.log(PostContext.CurrentPostData);  
  }

  return (
    <Router>    
      <div className="App">

        <SiteHeader/> 

        <Switch>          
          <Route path="/About" component = {AboutPage}/>  
          <Route path="/BlogPosts" component = {BlogPostsPage}/>
          <Route path="/Submit" component = {SubmitPage}/>
          <Route path="/post/:id" component = {BlogPostSelected}/> 
          <Route path="/AdminLogin" component = {AdminLoginPage}/> 
          <Route path="/" component = {HomePage}/> 
        </Switch>

      
      </div>
    </Router>

  );
}

export default App;
