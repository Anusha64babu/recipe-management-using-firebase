import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteRecipesList: Recipe[] = [];

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.getFavoriteRecipes();
  }
//get favourite recipes
  getFavoriteRecipes() {
    this.data.getAllRecipes().subscribe(res => {
      this.favoriteRecipesList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      }).filter(recipe => recipe.favorite);
    }, err => {
      alert('Error while fetching favorite recipes');
    });
  }

  removeFromFavorites(recipe: Recipe) {
    recipe.favorite = false;
    this.data.updateRecipe(recipe).then(() => {
      this.getFavoriteRecipes(); 
    });
  }
}
