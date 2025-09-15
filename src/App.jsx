import React from 'react';
import './App.css';
import ProductContainer from './Components/Product-Container';
import ProductDetails from './Components/Product-Detail';
import ProductCard from './Components/Product-Card';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductContainer />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/ProductCard" element={<ProductCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
