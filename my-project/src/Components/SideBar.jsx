
import React from 'react';
import { Utensils, Book, Globe } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <img src="./src/assets/imgs/Logo.png" alt="Recipe Logo" />
            </div>
            <div className="sidebar-menu">
                <div className="menu-item active">
                    <Utensils size={20} />
                    <span>Meals</span>
                </div>
                <div className="menu-item">
                    <Book size={20} />
                    <span>Ingredients</span>
                </div>
                <div className="menu-item">
                    <Globe size={20} />
                    <span>Area</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
