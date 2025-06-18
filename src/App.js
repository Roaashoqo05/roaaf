import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './component/Navbar';
import HomePage from './component/HomePage';
import Cart from './component/Cart';
import LoginPage from './component/Login';
import Part from './component/Part';
import Signup from './component/Signup';
import Footer from './component/Footer';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastInvoice, setLastInvoice] = useState(null); // ✅ لإمكانية مشاركة الفاتورة

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        { ...product, quantity: 1 }
      ]);
    }
  };

  const handleRemoveFromCart = (idToRemove) => {
    setCartItems(cartItems.filter((item) => item.id !== idToRemove));
  };

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar
          cartItems={cartItems}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onAddToCart={handleAddToCart}
                  searchTerm={searchTerm}
                />
              }
            />
            <Route
              path="/parts"
              element={
                <HomePage
                  onAddToCart={handleAddToCart}
                  searchTerm={searchTerm}
                />
              }
            />
            <Route
              path="/car-parts"
              element={
                <HomePage
                  onAddToCart={handleAddToCart}
                  searchTerm={searchTerm}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  onRemoveFromCart={handleRemoveFromCart}
                  setLastInvoice={setLastInvoice} // ✅ تمرير دالة تخزين الفاتورة
                />
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/part" element={<Part />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
