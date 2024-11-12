import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/model/recipe';
import { DataService } from 'src/app/shared/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  recipeId: string = '';
  name: string = '';
  image: string = '';
  ingredients: string = '';
  howToCook: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private data: DataService) { }

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id') || '';
    this.getRecipeById(this.recipeId);
  }
//taking the existing values
  getRecipeById(id: string) {
    this.data.getRecipeById(id).subscribe(res => {
      const recipe = res.data() as Recipe;
      this.name = recipe.name;
      this.image = recipe.image;
      this.ingredients = recipe.ingredients.join(', ');
      this.howToCook = recipe.howToCook;
    });
  }
//updation
  updateRecipe() {
    if (this.name === '' || this.ingredients === '' || this.howToCook === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Fill all input fields',
      });
      return;
    }

    const updatedRecipe: Recipe = {
      id: this.recipeId,
      name: this.name,
      image: this.image,
      ingredients: this.ingredients.split(',').map(ingredient => ingredient.trim()),
      howToCook: this.howToCook,
      rating: 0 
    };
//alert
    this.data.updateRecipe(updatedRecipe).then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Recipe updated successfully',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/dashboard/view-recipes']);
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    });
  }
}
