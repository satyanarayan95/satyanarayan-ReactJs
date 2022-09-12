import React from 'react';
import './App.css';
import Home from './components/Home';
import AddProduct from './components/AddProduct';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ProductDetail from './components/ProductDetail';
import Favourites from './components/Favorites';

function App() {
  return (
    <div className='flex flex-wrap justify-center items-center w-full min-h-screen bg-gradient-to-tl from-cyan-200 to-pink-200'>
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddProduct />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/details/:id" element={<ProductDetail />} />
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
