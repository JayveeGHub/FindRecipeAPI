const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // Replace with your Spoonacular API Key
    const apiKey = 'e1aca5950c474d49b9e2880b7d24a376';
    
    // Get ingredients from query string
    const ingredients = req.query.ingredients;
    
    // Define Spoonacular API endpoint
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=5&apiKey=${apiKey}`;
    
    try {
        // Fetch recipes from Spoonacular API
        const response = await fetch(apiUrl);
        
        // Check if Spoonacular returned an error
        if (!response.ok) {
            throw new Error('Failed to fetch recipes from Spoonacular');
        }

        const recipes = await response.json();
        
        // Set CORS headers to allow the frontend to access this function
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        
        // Set CORS headers in case of an error too
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({ error: 'Error fetching recipes' });
    }
};
