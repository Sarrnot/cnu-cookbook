import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Redirect } from 'react-router-dom';
import { notify } from 'react-notify-toast';
import LoadingOverlay from 'react-loading-overlay';

import { RecipeEditor } from '../components/RecipeEditor';

export function NewRecipePage() {
  const [title, setTitle] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [servingCount, setServingCount] = useState('');
  const [sideDish, setSideDish] = useState('');
  const [directions, setDirections] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const [post, setPost] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const [loading, setLoading] = useState(false);

  const [serverSideDish, setServerSideDish] = useState([]);
  const [serverIngredients, setServerIngredients] = useState([]);

  //Get list of side dishes and ingredients from server.
  useEffect(() => {
    api
      .get('/recipes/side-dishes')
      .then((data) => setServerSideDish(data.data))
      .catch();
    api
      .get('/recipes/ingredients')
      .then((data) => setServerIngredients(data.data))
      .catch();
  }, []);

  //Send recipe data to server and redirect to newly created recipe
  useEffect(() => {
    if (post) {
      setPost(false);
      setLoading(true);
      const postRequestPayload = {
        title: title,
        preparationTime: preparationTime,
        servingCount: servingCount,
        sideDish: sideDish,
        directions: directions,
        ingredients: ingredients,
      };
      api
        .post('/recipes', postRequestPayload)
        .then((data) => {
          setLoading(false);
          notify.show('Recept úspěšně uložen', 'success');
          setRedirect(`/recept/${data.data.slug}`);
        })
        .catch(() => {
          setLoading(false);
          notify.show('Název již existuje', 'error');
        });
    }
  }, [post]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <>
      <LoadingOverlay active={loading} spinner>
        <RecipeEditor
          title={title}
          setPost={setPost}
          setTitle={setTitle}
          preparationTime={preparationTime}
          setPreparationTime={setPreparationTime}
          servingCount={servingCount}
          setServingCount={setServingCount}
          sideDish={sideDish}
          setSideDish={setSideDish}
          ingredients={ingredients}
          setIngredients={setIngredients}
          directions={directions}
          setDirections={setDirections}
          serverSideDish={serverSideDish}
          serverIngredients={serverIngredients}
        />
      </LoadingOverlay>
    </>
  );
}
