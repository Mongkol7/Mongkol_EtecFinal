import React from 'react';
import './App.css';
import ProductContainer from './Components/Product-Container';
import ProductDetails from './Components/Product-Detail';
import ProductCard from './Components/Product-Card';
import HomePage from './Components/HomePage';
import Checkout from './Components/Checkout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ProductContainer" element={<ProductContainer />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/ProductCard" element={<ProductCard />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<h1 className="text-3xl font-bold underline">404 Not Found!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
