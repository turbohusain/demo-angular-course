import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeService{

    recipesChanged = new Subject<Recipe[]>();
    
    private recipes:Recipe[] = [
        // new Recipe('Test Recipe 1', 
        // 'dummy description 1', 
        // 'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/2KL6JYQYH4I6REYMIWBYVUGXPI.jpg&w=767',
        // [
        //     new Ingredient('Apple', 10),
        //     new Ingredient('Apple', 10),
        //     new Ingredient('Apple', 100)
        // ]),
        // new Recipe('Test Recipe 2', 
        // 'dummy description 2', 
        // 'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/2KL6JYQYH4I6REYMIWBYVUGXPI.jpg&w=767',
        // [
        //     new Ingredient('Apple', 10),
        //     new Ingredient('Apple', 10)
        // ])
        ];

    constructor(private slService:ShoppingListService){}

    setRecipes(recipes:Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes;
    }

    getRecipe(id:number){
        return this.recipes[id];
    }
     
    addIngredientstoShppoingList(ingredients:Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, newRecipe:Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());        
    }
}