import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Recipe } from '../model/recipe';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  // Add 
  addRecipe(recipe: Recipe) {
    recipe.id = this.afs.createId();
    return this.afs.collection('/Recipes').doc(recipe.id).set(recipe);
  }

  // Fetch all recipes
  getAllRecipes() {
    return this.afs.collection('/Recipes').snapshotChanges();
  }

  // search recipe with ingredient
  getRecipeById(id: string) {
    return this.afs.collection('/Recipes').doc(id).get();
  }

  // Delete 
  deleteRecipe(recipe: Recipe) {
    return this.afs.doc('/Recipes/' + recipe.id).delete();
  }

  // Update
  updateRecipe(recipe: Recipe) {
    return this.afs.doc('/Recipes/' + recipe.id).update(recipe);
  }

  // Add recipe to favorites
  favoriteRecipe(recipe: Recipe) {
    recipe.favorite = true;
    return this.updateRecipe(recipe);
  }

  // Remove recipe from favorites
  unfavoriteRecipe(recipe: Recipe) {
    recipe.favorite = false;
    return this.updateRecipe(recipe);
  }
}
