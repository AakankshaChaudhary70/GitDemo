document.addEventListener('DOMContentLoaded', function () {
    // Default recipes to display
    const defaultRecipes = [
        {
            id: 644127, // Real ID from Spoonacular
            title: 'Gajar Ka Halwa (Carrot Halwa)',
            image: 'https://img.spoonacular.com/recipes/644127-312x231.jpg',
            usedIngredients: [{ name: 'carrot' }, { name: 'milk' }],
            missedIngredients: [{ name: 'potato' }, { name: 'parmesan cheese' }]
        },
        {
            id: 641110, // Real ID from Spoonacular
            title: 'Curry and Sage Roast Chicken',
            image: 'https://img.spoonacular.com/recipes/641110-312x231.jpg',
            usedIngredients: [{ name: 'chicken' }, { name: 'onion' }],
            missedIngredients: [{ name: 'coconut milk' }, { name: 'eggs' }]
        },
        {
            id: 636292, // Real ID from Spoonacular
            title: 'Peanut Butter Sriracha Cookies',
            image: 'https://img.spoonacular.com/recipes/636292-312x231.jpg',
            usedIngredients: [{ name: 'mushroom' }, { name: 'rice' }],
            missedIngredients: [{ name: 'soya sauce' }, { name: 'ginger' }]
        },
        {
            id: 635964, // Real ID from Spoonacular
            title: 'Bread Omlette',
            image: 'https://img.spoonacular.com/recipes/635964-312x231.jpg',
            usedIngredients: [{ name: 'bread' }, { name: 'egg' }],
            missedIngredients: [{ name: 'potato' }, { name: 'milk' }]
        },
        {
            id: 660913, // Real ID from Spoonacular
            title: 'Special Vegetable Biryani',
            image: 'https://img.spoonacular.com/recipes/660913-312x231.jpg',
            usedIngredients: [{ name: 'onion' }, { name: 'rice' }],
            missedIngredients: [{ name: 'egg' }, { name: 'milk' }]
        },
        {
            id: 652542, // Real ID from Spoonacular
            title: 'Mughlai Malai Kofta Curry',
            image: 'https://img.spoonacular.com/recipes/652542-312x231.jpg',
            usedIngredients: [{ name: 'paneer' }, { name: 'fresh cream' }],
            missedIngredients: [{ name: 'beans' }, { name: 'sauce' }]
        },
        {
            id: 641836, // Real ID from Spoonacular
            title: 'Easy Baked Parmesan Chicken',
            image: 'https://img.spoonacular.com/recipes/641836-312x231.jpg',
            usedIngredients: [{ name: 'chicken' }, { name: 'egg' }],
            missedIngredients: [{ name: 'onion' }, { name: 'milk' }]
        },
        {
            id: 642583, // Real ID from Spoonacular
            title: 'Farfalle with Peas, Ham and Cream',
            image: 'https://img.spoonacular.com/recipes/642583-312x231.jpg',
            usedIngredients: [{ name: 'pasta' }, { name: 'cheeese' }],
            missedIngredients: [{ name: 'egg' }, { name: 'tomato' }]
        }
    ];

    // Display default recipes on page load
    displayRecipes(defaultRecipes);

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Handle navigation click events
    document.getElementById('homeLink').addEventListener('click', function () {
        showHomePage();
    });

    document.getElementById('aboutLink').addEventListener('click', function () {
        showAboutSection();
    });

    document.getElementById('recipesLink').addEventListener('click', function () {
        showRecipeSection();
    });

    document.getElementById('contactLink').addEventListener('click', function () {
        showContactSection();
    });


    // Show Home Page (both About and Recipes sections)
function showHomePage() {
    document.getElementById('aboutContent').style.display = 'block'; // Show About Section
    document.getElementById('recipeSection').style.display = 'block'; // Show Recipe Section
    document.querySelector('.container').style.display = 'block'; // Show the container section
    document.getElementById('contactSection').style.display = 'block'; // Show Contact Section
}

// Show "About" section
function showAboutSection() {
    document.getElementById('aboutContent').style.display = 'block'; // Show About Section
    document.getElementById('recipeSection').style.display = 'none'; // Hide Recipe Section
    document.querySelector('.container').style.display = 'none'; // Hide the container section
    document.getElementById('contactSection').style.display = 'block'; // Ensure Contact is visible
}

// Show "Recipes" section
function showRecipeSection() {
    document.getElementById('aboutContent').style.display = 'none'; // Hide About Section
    document.getElementById('recipeSection').style.display = 'block'; // Show Recipe Section
    document.querySelector('.container').style.display = 'block'; // Show the container section
    document.getElementById('contactSection').style.display = 'none'; // Ensure Contact is visible
}

// Dark Mode Toggle
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
}

// Load saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

    // Event listener for the search button
    document.getElementById('searchButton').addEventListener('click', async function () {
        const ingredients = document.getElementById('ingredientInput').value.trim();
        if (!ingredients) {
            alert('Please enter at least one ingredient.');
            return;
        }

        const sanitizedIngredients = ingredients.replace(/[^a-zA-Z0-9, ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
        showLoading();

        try {
            const recipes = await getRecipes(sanitizedIngredients);
            displayRecipes(recipes);
        } catch (error) {
            console.error('Error:', error);
            alert(`Failed to fetch recipes. Please try again later.\nDetails: ${error.message}`);
        }
    });

    // Show Loading state
    function showLoading() {
        const recipeResults = document.getElementById('recipeResults');
        recipeResults.innerHTML = '<p>Loading recipes...</p>';
    }
    

    // Fetch recipes from Spoonacular API
    async function getRecipes(ingredients) {
        const apiKey = 'f4c54021eac0442f836867d746ea8cc2'; // Replace with your API key
        const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=5&apiKey=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error('API did not return an array of recipes.');
        }

        return data;
    }

    // Display recipes on the page
    function displayRecipes(recipes) {
        const recipeResults = document.getElementById('recipeResults');
        recipeResults.innerHTML = ''; // Clear previous results

        if (!recipes || recipes.length === 0) {
            recipeResults.innerHTML = '<p>No recipes found for these ingredients. Please try again with different ingredients.</p>';
            return;
        }

        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            const recipeImage = recipe.image
                ? `<img src="${recipe.image}" alt="${recipe.title}">`
                : `<img src="https://via.placeholder.com/280x180?text=No+Image+Available" alt="No image available">`;

            const recipeLink = recipe.id
                ? `<a href="https://spoonacular.com/recipes/${encodeURIComponent(recipe.title.replace(/\s+/g, '-').toLowerCase())}-${recipe.id}" target="_blank">View Recipe</a>`
                : `<p>This is a sample recipe. No link available.</p>`;

            const usedIngredients = recipe.usedIngredients.map(ing => ing.name).join(', ');
            const missedIngredients = recipe.missedIngredients.map(ing => ing.name).join(', ');

            recipeCard.innerHTML = `
                ${recipeImage}
                <h3>${recipe.title}</h3>
                <p><strong>Used Ingredients:</strong> ${usedIngredients}</p>
                <p><strong>Missing Ingredients:</strong> ${missedIngredients}</p>
                ${recipeLink}
            `;

            recipeResults.appendChild(recipeCard);
        });
    }
    // Handle navigation to the Contact section
document.getElementById('contactLink').addEventListener('click', function () {
    showContactSection();
});

// Show "Contact" section
function showContactSection() {
    document.getElementById('aboutContent').style.display = 'none';
    document.getElementById('recipeSection').style.display = 'none';
    document.querySelector('.container').style.display = 'none';
    document.getElementById('contactSection').style.display = 'block';
}

document.getElementById('contactLink').addEventListener('click', function () {
    showContactSection();
});


// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
    }

    // Mock form submission (you can integrate a backend or email API here)
    alert(`Thank you, ${name}! Your message has been received.`);
    document.getElementById('contactForm').reset();
});

// Ensure contact section is visible on default load
showHomePage(); // Call this function to make sure everything is visible on load

});