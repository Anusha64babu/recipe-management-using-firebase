import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';
import { DataService } from 'src/app/shared/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-recipes',
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.css']
})
export class ViewRecipesComponent implements OnInit {
  recipesList: Recipe[] = [];
  filteredRecipesList: Recipe[] = [];
  searchQuery: string = '';

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.getAllRecipes();
  }

  getAllRecipes() {
    this.data.getAllRecipes().subscribe(res => {
      this.recipesList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
      this.filteredRecipesList = this.recipesList;
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error while fetching recipe data',
      });
    });
  }

  searchRecipes() {
    if (this.searchQuery.trim() === '') {
      this.filteredRecipesList = this.recipesList;
    } else {
      this.filteredRecipesList = this.recipesList.filter(recipe =>
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }
  }

  addToFavorites(recipe: Recipe) {
    this.data.favoriteRecipe(recipe).then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Recipe added to favorites',
        showConfirmButton: false,
        timer: 1500
      });
      this.getAllRecipes(); // Refresh the list
    });
  }

  deleteRecipe(recipe: Recipe) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.deleteRecipe(recipe).then(() => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Recipe deleted successfully',
            showConfirmButton: false,
            timer: 1500
          });
          this.getAllRecipes(); // Refresh the list after deletion
        }).catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
          });
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your recipe is safe',
          'error'
        );
      }
    });
  }
}
