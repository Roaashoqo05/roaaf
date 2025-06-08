import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './component/Navbar';
import HomePage from './component/HomePage';
import Cart from './component/Cart';
import LoginPage from './component/Login';
import Part from './component/Part';
import Signup from './component/Signup';
import Footer from './component/Footer';
import CarPartsList from './component/CarPartsList'; // أو المسار الصحيح حسب مكان الملف
import AddCarPart from './component/AddCarPart';     // استيراد الكمبوننت الجديد

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  // جلب المنتجات من API اللارافيل
  useEffect(() => {
    axios.get("http://localhost:8000/api/car-parts") // عدّل الرابط حسب بيئة مشروعك
      .then((response) => {
        setProducts(response.data); // البيانات اللي تجي من باكند
      })
      .catch((error) => {
        console.error("خطأ في جلب المنتجات:", error);
      });
  }, []);

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
    const newCart = cartItems.filter((item) => item.id !== idToRemove);
    setCartItems(newCart);
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
                  products={products}            // مرّر المنتجات هنا
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
                />
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/part" element={<Part />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/parts" element={<CarPartsList />} />
            <Route path="/add-part" element={<AddCarPart />} /> {/* Route جديد */}
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
