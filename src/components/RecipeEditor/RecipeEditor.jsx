import React from 'react';

import { IngredientsForm } from '../Forms/IngredientsForm';
import { GroupForm } from '../Forms/GroupForm';
import { BasicInfoForm } from '../Forms/BasicInfoForm';
import { TitleForm } from '../Forms/TitleForm';
import { DirectionsForm } from '../Forms/DirectionsForm';
import { PostRecipeButton } from '../Buttons/PostRecipeButton';
import { ButtonLink } from '../Buttons/ButtonLink';
import { IngredientList } from '../IngredientList';
import { DirectionsPreview } from '../DirectionsPreview';

function RecipeEditor({
  title,
  setPost,
  setTitle,
  preparationTime,
  setPreparationTime,
  servingCount,
  setServingCount,
  sideDish,
  setSideDish,
  ingredients,
  setIngredients,
  directions,
  setDirections,
  address,
  serverSideDish,
  serverIngredients,
}) {
  return (
    <>
      <div className="heading">
        {title === '' ? <h1 className="title">Nový recept</h1> : <h1 className="title">{title}</h1>}
        <div className="navButtons">
          <PostRecipeButton setPost={setPost} title={title} />
          <ButtonLink address={address ? address : '/'} text="Zrušit" />
        </div>
      </div>

      <TitleForm title={title} setTitle={setTitle} />

      <div className="editBody">
        <div className="editBasicInfo">
          <h2>Základní údaje</h2>
          <BasicInfoForm
            preparationTime={preparationTime}
            setPreparationTime={setPreparationTime}
            servingCount={servingCount}
            setServingCount={setServingCount}
            sideDish={sideDish}
            setSideDish={setSideDish}
            serverSideDish={serverSideDish}
          />
        </div>
        <div className="editIngredients">
          <h2>Ingredience</h2>
          <IngredientsForm
            ingredients={ingredients}
            setIngredients={setIngredients}
            serverIngredients={serverIngredients}
          />
          <GroupForm ingredients={ingredients} setIngredients={setIngredients} />
        </div>
        <div className="editDirections">
          <h2>Postup</h2>
          <DirectionsForm directions={directions} setDirections={setDirections} />
        </div>
      </div>

      <div className="editPreview">
        <div className="editPreviewIngredients">
          <h2>Náhled ingrediencí</h2>
          <IngredientList ingredients={ingredients} setIngredients={setIngredients} edit={true} />
        </div>

        <div className="editPreviewDirections">
          <h2>Náhled postupu</h2>
          <DirectionsPreview directions={directions} />
        </div>
      </div>
    </>
  );
}

export default RecipeEditor;
