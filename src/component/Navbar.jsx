import React from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css';
import { FaShoppingCart, FaUser, FaHome } from 'react-icons/fa';

const Navbar = ({ cartItems, searchTerm, setSearchTerm }) => {
    const navigate = useNavigate();

    const handleCartClick = () => {
        navigate('/cart');
    };

    const handleLoginClick = () => {
        navigate('/signup');
    };

    

    return (
        <nav className="navbar">
            {/* يمين النافبار: الشعار والصفحة الرئيسية */}
            <div className="navbar-right">
                <img src="/images/sclogo.png" alt="Logo" className="logo-image" />
                <span
                    className="home-icon"
                    title="الصفحة الرئيسية"
                    onClick={() => navigate('/')}
                >
                     <FaHome />
                </span>
            </div>

            {/* وسط النافبار: شريط البحث */}
            <div className="navbar-center">
                <input
                    type="text"
                    className="search-input"
                    placeholder="كلمات البحث..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* يسار النافبار: الأيقونات */}
            <div className="icons">
                <div className="tooltip-container">
                    <button className="icon-btn" onClick={handleCartClick}>
                         <FaShoppingCart /> ({cartItems.reduce((total, item) => total + item.quantity, 0)})
                    </button>
                </div>
                <div className="tooltip-container">
                    <button className="icon-btn" onClick={handleLoginClick}>  <FaUser /> </button>
                    <span className="tooltip">تسجيل الدخول</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;