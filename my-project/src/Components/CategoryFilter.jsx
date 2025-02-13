import React from 'react';

const categories = [
    'All', 'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat', 'Lamb',
    'Miscellaneous', 'Pasta', 'Seafood', 'Side', 'Starter',
    'Vegan', 'Vegetarian'
];

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => (
    <div className="categories">
        {categories.map(category => (
            <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => onSelectCategory(category)}
            >
                {category}
            </button>
        ))}
    </div>
);

export default CategoryFilter;