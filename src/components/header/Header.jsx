import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import './header.css'

function Header({ cart }) {
    const navigate = useNavigate();          // ← moved to top level
    const [search, setSearch] = useState(''); // ← missing state

    let total = 0;
    cart.forEach((cartItem) => {
        total += cartItem.quantity;
    });

    const handleSearch = () => {
        navigate(`/?search=${search}`);
    };

    return (
        <div className="header">
            <div className="left-section">
                <Link to="/" className="header-link">
                    <img className="logo" src="images/logo-white.png" />
                    <img className="mobile-logo" src="images/mobile-logo-white.png" />
                </Link>
            </div>

            <div className="middle-section">
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}  // ← bind input
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // ← Enter key support
                />
                <button className="search-button" onClick={handleSearch}>
                    <img className="search-icon" src="images/icons/search-icon.png" />
                </button>
            </div>

            <div className="right-section">
                <Link className="orders-link header-link" to="/orders">
                    <span className="orders-text">Orders</span>
                </Link>
                <Link className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src="images/icons/cart-icon.png" />
                    <div className="cart-quantity">{total}</div>
                    <div className="cart-text">Cart</div>
                </Link>
            </div>
        </div>
    );
}

export default Header;