import { useNavigate } from 'react-router-dom';
import { Globe } from 'lucide-react';

const RecipeCard = ({ meal }) => {
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate(`/recipe/${meal.idMeal}`); 
    };

    return (
        <div className="recipe-card">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-img" />
            <div className="recipe-content">
                <h3 className="recipe-title">{meal.strMeal}</h3>
                <div className="recipe-origin">
                    <Globe size={20} />
                    <span>{meal.strArea || 'International'}</span>
                </div>
                <button className="view-btn" onClick={handleClick}>
                    View Recipe
                </button>
            </div>
        </div>
    );
};

export default RecipeCard;
