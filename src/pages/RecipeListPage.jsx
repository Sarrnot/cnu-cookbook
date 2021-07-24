import React, { useState, useEffect } from 'react';
import { api } from '../api';

import { RecipeList } from '../components/RecipeList';
import { RecipeFilter } from '../components/RecipeFilter';
import { ButtonLink } from '../components/Buttons/ButtonLink';
import { LoadingAnimation } from '../components/LoadingAnimation';

export function RecipeListPage() {
  const [{ data, error, loading }, setRecipeList] = useState({
    data: [],
    error: '',
    loading: true,
  });

  const [recipe, setRecipe] = useState('');

  const filteredRecipes = data.filter(({ title }) =>
    title.toLowerCase().includes(recipe.toLowerCase()),
  );

  //Get data from server.
  useEffect(() => {
    api
      .get('/recipes')
      .then(({ data }) => {
        setRecipeList({ data, error: '', loading: false });
      })
      .catch(() => {
        setRecipeList({ data: [], error: 'Něco se pokazilo ...', loading: false });
      });
  }, []);

  if (loading) {
    return (
      <div className="loadingAnimation">
        <LoadingAnimation />
      </div>
    );
  }

  if (!!error) {
    return error;
  }

  return (
    <>
      <div className="heading">
        <h1 className="title">Recepty</h1>
        <div className="navButtons">
          <ButtonLink address="/novy-recept" text="Nový recept" />
        </div>
        <RecipeFilter recipe={recipe} setRecipe={setRecipe} />
      </div>
      <RecipeList recipes={filteredRecipes} />
    </>
  );
}
