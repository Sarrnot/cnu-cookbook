import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { api } from '../api';
import { notify } from 'react-notify-toast';

import { IngredientList } from '../components/IngredientList';
import { ButtonLink } from '../components/Buttons/ButtonLink';
import { DeleteRecipeButton } from '../components/Buttons/DeleteRecipeButton';
import { DirectionsPreview } from '../components/DirectionsPreview';
import { LoadingAnimation } from '../components/LoadingAnimation';

export function RecipeDetailPage() {
  const { slug } = useParams();
  const [deleteRecipe, setDeleteRecipe] = useState(false);
  const [{ data, error, loading }, setRecipeDetail] = useState({
    data: {},
    error: '',
    loading: true,
  });
  const [redirect, setRedirect] = useState(null);

  //Load data from server
  useEffect(() => {
    api
      .get(`/recipes/${slug}`)
      .then(({ data }) => {
        setRecipeDetail({ data, error: '', loading: false });
      })
      .catch(() => {
        setRecipeDetail({ data: {}, error: 'Něco se pokazilo ...', loading: false });
      });
  }, []);

  //Delete recipe
  useEffect(() => {
    if (deleteRecipe) {
      setDeleteRecipe(false);
      api
        .delete(`/recipes/${data._id}`)
        .then(() => {
          notify.show('Recept úspěšně smazán', 'success');
          setRedirect('/');
        })
        .catch(() => {
          setRecipeDetail({ data, error: 'Něco se pokazilo', loading });
        });
    }
  }, [deleteRecipe]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

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
        <h1 className="title">{data.title}</h1>
        <div className="navButtons">
          <ButtonLink
            address={{ pathname: `../recept/${slug}/upravit`, state: { data } }}
            text="Upravit"
          />
          <DeleteRecipeButton setDeleteRecipe={setDeleteRecipe} title={data.title} />
        </div>
      </div>

      <div className="detailsHeader">
        <div className="detailsBasicInfo">
          <p>Délka přípravy: {data.preparationTime} min</p>
          <p>Počet porcí: {data.servingCount}</p>
          <p>Příloha: {data.sideDish}</p>
        </div>
        <img
          src="../../images/food-placeholder.png"
          alt={`Obrázek ${data.title}`}
          className="detailsRecipeImg"
        />
      </div>

      <div className="detailsBody">
        <div className="detailsIngredients">
          <h2>Ingredience</h2>
          <IngredientList ingredients={data.ingredients} edit={false} />
        </div>
        <div className="detailsDirections">
          <h2>Postup</h2>
          <DirectionsPreview directions={data.directions} />
        </div>
      </div>
    </>
  );
}
