const cityForm = document.querySelector("#cityForm");

const getMealDetails = async (meal) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
  const data = await response.json();

  const mealDiv = document.createElement("div");
  mealDiv.setAttribute("id", "meal");
  
  const mealName = document.createElement("h2");
  const mealNameNode = document.createTextNode(data.meals[0].strMeal);
  mealName.style.textAlign = "center";
  mealName.appendChild(mealNameNode);
  
  const mealCategory = document.createElement("h3");
  const mealCategoryNode = document.createTextNode("Category: "+data.meals[0].strCategory);
  mealCategory.style.textAlign = "center";
  mealCategory.style.paddingBottom = "5%";
  mealCategory.appendChild(mealCategoryNode);
  
  const mealDetailsDiv = document.createElement("div");
  mealDetailsDiv.setAttribute("class", "meal-details");
  mealDetailsDiv.style.display = "flex";
  mealDetailsDiv.style.flexDirection = "row";
  
  const mealImage = document.createElement("img");
  mealImage.setAttribute("src", data.meals[0].strMealThumb);
  mealImage.style.marginLeft = "23%";
  mealImage.style.paddingBottom = "5%";
  mealImage.style.width = "30%";
  mealDetailsDiv.appendChild(mealImage);
  
  const mealIngredients = document.createElement("ul");
  for (let i = 1; i <= 20; i++) {
    if (data.meals[0][`strIngredient${i}`]) {
      const ingredient = data.meals[0][`strIngredient${i}`];
      const measurement = data.meals[0][`strMeasure${i}`];
      const ingredientListItem = document.createElement("li");
      ingredientListItem.textContent = `${ingredient} - ${measurement}`;
      mealIngredients.appendChild(ingredientListItem);
    } else {
      break;
    }
  }
  mealDetailsDiv.appendChild(mealIngredients);
  
  const mealVideoAndInstructionsDiv = document.createElement("div");
  mealVideoAndInstructionsDiv.style.display = "flex";
  mealVideoAndInstructionsDiv.style.flexDirection = "column";
  
  const mealInstructionsTitle = document.createElement("h4");
  mealInstructionsTitle.textContent = "How To Make:";
  mealInstructionsTitle.style.marginLeft = "24%";
  mealInstructionsTitle.style.paddingTop = "3%";
  mealVideoAndInstructionsDiv.appendChild(mealInstructionsTitle);
  
  const mealInstructions = document.createElement("ol");
  const instructions = data.meals[0].strInstructions.split(".");
  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i].trim() !== "") {
      const instruction = document.createElement("li");
      instruction.textContent = instructions[i].trim() + ".";
      mealInstructions.style.paddingTop = "1%";
      mealInstructions.style.marginLeft = "22%";
      mealInstructions.style.maxWidth = "60%";      
      mealInstructions.appendChild(instruction);
    }
  }
  
  mealVideoAndInstructionsDiv.appendChild(mealInstructions);
  
  const mealYt = document.createElement("iframe");
  mealYt.setAttribute("src", `https://www.youtube.com/embed/${data.meals[0].strYoutube.slice(-11)}`);
  mealYt.setAttribute("allowfullscreen", "");  
  mealYt.style.width = "60%";
  mealYt.style.marginLeft = "23%";
  mealYt.appendChild(mealVideoAndInstructionsDiv);
  
  mealDiv.appendChild(mealName);
  mealDiv.appendChild(mealCategory);
  mealDiv.appendChild(mealDetailsDiv);
  mealDiv.appendChild(mealYt);
  mealDiv.appendChild(mealVideoAndInstructionsDiv);

  document.querySelector("main").appendChild(mealDiv);
  
};  

document.addEventListener("DOMContentLoaded", (e) => {
  cityForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const mealName = document.querySelector("#mealName").value;
    if (mealName !== "") {
      const mealDiv = document.querySelector("#meal");
      if (mealDiv) {
        document.querySelector("main").removeChild(mealDiv);
      }
      getMealDetails(mealName);
    } else {
      console.log("You must provide a meal name");
    }
  });
});
