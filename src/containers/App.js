import React from 'react';
import SiteHeader from '../components/SiteHeader/SiteHeader'
import './App.css';
import {Provider} from '../contexts/currentSelected'

function App() {
  return (
    <Provider>
    <div className="App">

        <SiteHeader/>
      
    </div>
    </Provider>
  );
}

export default App;
