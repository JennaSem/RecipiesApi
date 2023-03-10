import './App.css';
import { useEffect, useState } from "react";
import video from './food.mp4'
import MyRecipesComponent from './MyRecipiesComponent';

function App() {
  const MY_ID = "48285790";
  const MY_KEY = "cf641af390f79822ddbd5dd24dccdc75"

  const [mySearch, setMySearch] = useState('');
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmitted, setWordSubmitted] =useState('avocado')

  useEffect(async () => {
  const response = await fetch(`https://api.edamam.com/api/search?q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`)
  const data = await response.json();
  setMyRecipes(data.hits)
}, [wordSubmitted])

const myRecipeSearch = (e) => {
setMySearch(e.target.value)
}
const finalSearch =(e) => {
  e.preventDefault();
  setWordSubmitted(mySearch);
}

  return (
  <div className="App">
  <div className="container">
  <video autoPlay muted loop>
  <source src={video} type="video/mp4" />
  </video>
  <h1>Find a Recipe</h1>
  </div>

  <div className='container'>
    <form onSubmit={finalSearch}>
      <input className='search' placeholder='Search...' onChange={myRecipeSearch} value={mySearch}>
      </input>
    </form>
  </div>
 
    <div className='container'>
      <button>
        <img src="https://img.icons8.com/fluency/48/000000/fry.png" className='icons' alt="png"/>
      </button>
    </div>
  {myRecipes.map(element => {
    <MyRecipesComponent 
    label={element.recipe.label} 
    image={element.recipe.image} 
    calories={element.recipe.calories}
    ingredients={element.recipe.ingredientLines}/>
  })}
  </div>
  );
}

export default App;
