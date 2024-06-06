
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault()
    const ingredient = document.getElementById('ingredient').value
    
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then(response => response.json())
        .then(data => {
            const recipesContainer = document.getElementById('recipes')
            recipesContainer.innerHTML = ''
            
            if(data.meals) {
                data.meals.forEach(meal => {
                    const recipeDiv = document.createElement('div')
                    recipeDiv.classList.add('recipe')
                    recipeDiv.innerHTML = `
                        <h2>${meal.strMeal}</h2> <!-- Nombre de la receta -->
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"> <!-- Imagen de la receta con texto alternativo -->
                        <div class="api-reference">Recipe from: <a href="https://www.themealdb.com" target="_blank">TheMealDB</a></div>
                    `
                    recipesContainer.appendChild(recipeDiv)
                })
            } else {
                recipesContainer.innerHTML = '<p>No recipes found.</p>'
            }
        })
        .catch(error => {
            console.error('Error fetching recipes:', error)
            const recipesContainer = document.getElementById('recipes')
            recipesContainer.innerHTML = '<p>Error fetching recipes. Try again later.</p>'
        })
})
