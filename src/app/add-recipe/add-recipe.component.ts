      import { Component } from '@angular/core';
      import { Recipe } from 'src/app/model/recipe';
      import { DataService } from 'src/app/shared/data.service';
      import { Router } from '@angular/router';
      import Swal from 'sweetalert2';

      @Component({
        selector: 'app-add-recipe',
        templateUrl: './add-recipe.component.html',
        styleUrls: ['./add-recipe.component.css']
      })
      export class AddRecipeComponent {
        recipeObj: Recipe = {
          id: '',
          name: '',
          image: '',
          ingredients: [],
          howToCook: '',
          rating: 0
        };

        name: string = '';
        image: string = '';
        ingredients: string = '';
        howToCook: string = '';

        constructor(private data: DataService, private router: Router) { }
//add a recipe
        addRecipe() {
          if (this.name === '' || this.ingredients === '' || this.howToCook === '') {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Fill all input fields',
            });
            return;
          }

          this.recipeObj.id = '';
          this.recipeObj.name = this.name;
          this.recipeObj.image = this.image;
          this.recipeObj.ingredients = this.ingredients.split(',').map(ingredient => ingredient.trim());
          this.recipeObj.howToCook = this.howToCook;
          this.recipeObj.rating = 0;
//alert
          this.data.addRecipe(this.recipeObj).then(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Recipe added successfully',
              showConfirmButton: false,
              timer: 1500
            });
            this.resetForm();
            this.router.navigate(['/dashboard/view-recipes']);
          }).catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.message,
            });
          });
        }

        resetForm() {
          this.name = '';
          this.image = '';
          this.ingredients = '';
          this.howToCook = '';
        }
      }
