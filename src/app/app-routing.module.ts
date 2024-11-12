import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ViewRecipesComponent } from './view-recipes/view-recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/view-recipes', component: ViewRecipesComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/add-recipe', component: AddRecipeComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/edit-recipe/:id', component: EditRecipeComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
