import React from 'react';
import Home from "./components/Home";
import { Route, Routes } from 'react-router-dom';
import Trend from './components/new_feed/Trend';
import Populars from './components/new_feed/Populars';

function App(){

  return (<div className="w-full h-screen">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trending" element={<Trend />} />
      <Route path="/populars" element={<Populars />} />
    </Routes>
  </div>)

}

export default App;