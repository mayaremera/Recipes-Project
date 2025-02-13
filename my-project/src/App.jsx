import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import CategoryFilter from './Components/CategoryFilter';
import RecipeCard from './Components/RecipeCard';
import Sidebar from './Components/SideBar';
import RecipeDetails from './Components/RecipeDetails';
import Footer from './Components/Footer';
import './Styles/style.scss';

function App() {
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const url = selectedCategory === 'All'
          ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
          : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
        
        const response = await fetch(url);
        const data = await response.json();
        setMeals(data.meals || []);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
      setLoading(false);
    };

    fetchMeals();
  }, [selectedCategory]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen"> 
        <Header />
        <div className="main-container flex-grow"> 
          <Sidebar />
          <div className="content">
            <Routes>
              
              <Route path="/" element={
                <>
                  <CategoryFilter 
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                  />
                  {loading ? (
                    <div className="loading">Loading...</div>
                  ) : (
                    <div className="recipe-grid">
                      {meals.map(meal => (
                        <RecipeCard 
                          key={meal.idMeal}
                          meal={meal}
                        />
                      ))}
                    </div>
                  )}
                </>
              } />

              
              <Route path="/recipe/:mealId" element={<RecipeDetails />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;