import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Youtube, Globe } from 'lucide-react';

const RecipeDetails = () => {
    const { mealId } = useParams(); 
    const navigate = useNavigate(); 
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
                const data = await response.json();
                setRecipe(data.meals[0]);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
            setLoading(false);
        };

        fetchRecipeDetails();
    }, [mealId]);

    if (loading) return <div className="recipe-details-overlay"><div className="loading">Loading...</div></div>;
    if (!recipe) return <div className="recipe-details-overlay"><div>No recipe found.</div></div>;


    
    const ingredients = Array.from({ length: 20 }, (_, i) => i + 1)
        .map(i => ({
            ingredient: recipe[`strIngredient${i}`],
            measure: recipe[`strMeasure${i}`]
        }))
        .filter(({ ingredient }) => ingredient && ingredient.trim() !== '');

    return (
        <div className="recipe-details">
            <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
            <div className='recipe-details-container'> 
            <div className="recipe-main-content">
                <h1 className="recipe-title">{recipe.strMeal}</h1>

                <div className="recipe-image-container">
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
                </div>

                <div className="recipe-description">
                    <p>{recipe.strInstructions}</p>
                </div>

                <div className="recipe-buttons">
                    {recipe.strYoutube && (
                        <a
                            href={recipe.strYoutube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="recipe-button youtube"
                        >
                            <Youtube size={20} />
                            YouTube
                        </a>
                    )}
                    {recipe.strSource && (
                        <a
                            href={recipe.strSource}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="recipe-button source"
                        >
                            <Globe size={20} />
                            Source
                        </a>
                    )}
                </div>
            </div>

            <div className="recipe-ingredients">
                <h2>Ingredients</h2>
                <div className="ingredients-list">
                    {ingredients.map(({ ingredient, measure }, index) => (
                        <div key={index} className="ingredient-item">
                            <span className="ingredient-name">{ingredient}:</span>
                            <span className="ingredient-measure">{measure}</span>
                        </div>
                    ))}
                </div>
            </div>

            </div>
            
        </div>
    );
};

export default RecipeDetails;
