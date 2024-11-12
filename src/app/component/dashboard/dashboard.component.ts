import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchQuery: string = '';
  recipesList: Recipe[] = [];
  filteredRecipesList: Recipe[] = [];

  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    this.getAllRecipes();
  }
//logout
  register() {
    this.auth.logout();
  }
//view all
  getAllRecipes() {
    this.data.getAllRecipes().subscribe(res => {
      this.recipesList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
      this.filteredRecipesList = this.recipesList;
    }, err => {
      alert('Error while fetching recipe data');
    });
  }

  
}
