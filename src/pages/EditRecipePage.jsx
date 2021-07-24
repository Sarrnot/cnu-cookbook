import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Redirect, useLocation, useParams } from 'react-router-dom';
import { notify } from 'react-notify-toast';
import LoadingOverlay from 'react-loading-overlay';

import { RecipeEditor } from '../components/RecipeEditor';

export function EditRecipePage() {
  const location = useLocation();
  const data = location.state.data;

  const [title, setTitle] = useState(data.title);
  const [preparationTime, setPreparationTime] = useState(data.preparationTime);
  const [servingCount, setServingCount] = useState(data.servingCount);
  const [sideDish, setSideDish] = useState(data.sideDish);
  const [directions, setDirections] = useState(data.directions);
  const [ingredients, setIngredients] = useState(data.ingredients);

  const [post, setPost] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const [loading, setLoading] = useState(false);

  const [serverSideDish, setServerSideDish] = useState([]);
  const [serverIngredients, setServerIngredients] = useState([]);

  //Get list of side dishes and ingredients from server.
  useEffect(() => {
    api
      .get('/recipes/side-dishes')
      .then((data) => setServerSideDish({ data }))
      .catch(console.log(`Couldn't load side dish data from server.`));
    api
      .get('/recipes/ingredients')
      .then((data) => setServerIngredients({ data }))
      .catch(console.log(`Couldn't load ingredients data from server.`));
  });

  //Send recipe data to server and redirect to edited recipe
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
        .post(`/recipes/${data._id}`, postRequestPayload)
        .then((data) => {
          setLoading(false);
          notify.show('Recept úspěšně uložen', 'success');
          setRedirect(`/recept/${data.data.slug}`);
        })
        .catch(() => {
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
          address={`/recept/${data.slug}`}
          serverSideDish={serverSideDish}
          serverIngredients={serverIngredients}
        />
      </LoadingOverlay>
    </>
  );
}
