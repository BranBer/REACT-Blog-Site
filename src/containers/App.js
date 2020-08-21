import React from 'react';
import SiteHeader from '../components/SiteHeader/SiteHeader'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import AboutPage from '../pages/AboutPage';
import BlogPostsPage from '../pages/BlogPostsPage';
import HomePage from '../pages/HomePage';
import SubmitPage from '../pages/SubmitPage';

function App() {
  return (
    <Router>    
      <div className="App">

        <SiteHeader/>    

        <Switch>
          
          <Route path="/About" component = {AboutPage}/>  
          <Route path="/BlogPosts" component = {BlogPostsPage}/>
          <Route path="/Submit" component = {SubmitPage}/>
          <Route path="/" component = {HomePage}/>          
        </Switch>

      
      </div>
    </Router>

  );
}

export default App;
