import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn:"root"})
export class DataStorageService{

    constructor(private http:HttpClient, private recipeService:RecipeService, private authService: AuthService){}

    storeRecipes(){
        
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://fir-angular-ce87a.firebaseio.com/recipes.json', recipes).subscribe(response =>{
            console.log(response);
        });
    }

    /*fetchRecipes(){
        //const recipes = this.recipeService.getRecipes();
        this.http.get<Recipe[]>('https://fir-angular-ce87a.firebaseio.com/recipes.json')
        .pipe(
            map(recipes => {
            return recipes.map(recipe =>{ //this is javascript map , key vale for looping
                return {...recipe, ingredients:recipe.ingredients ? recipe.ingredients : []} //copy and convert all elements
                });
            })
           
        )
        .subscribe(recipes =>{
            console.log(recipes);
            this.recipeService.setRecipes(recipes);
        });
    }*/

    fetchRecipes(){
        //const recipes = this.recipeService.getRecipes();     

        /* 
        Before authentication
        return this.http.get<Recipe[]>('https://fir-angular-ce87a.firebaseio.com/recipes.json')
        .pipe(
            map(recipes => {
            return recipes.map(recipe =>{ //this is javascript map , key vale for looping
                return {...recipe, ingredients:recipe.ingredients ? recipe.ingredients : []} //copy and convert all elements
                });
            }),
            tap(recipes=>{
                this.recipeService.setRecipes(recipes);
            })
           
        )
        */


        //----------Manual intercepting 1 service
        //BehavioeSuject- take only 1 previous value ... auto unsubscribe
        /*this.authService.user.pipe(take(1)).subscribe(user =>{
            return this.http.get ... //not possible to return inside subscription
        }); */

        //pipe auth ob. observable and http observable in one observable
        //exhaustMap - waits for 1st ob. to complete give user and returns new ob. and replaces with http (-- inner) ob.
        //--Note return and only 1 pipe
        //this is manual... intercept is global
        /*return this.authService.user.pipe(
            take(1), 
            exhaustMap(user =>{
            return this.http.get<Recipe[]>('https://fir-angular-ce87a.firebaseio.com/recipes.json',
            {params: new HttpParams().set('auth', user.token)}) //params only firebase, others as header
            }),
            map(recipes => {
                return recipes.map(recipe =>{ //this is javascript map , key vale for looping
                    return {...recipe, ingredients:recipe.ingredients ? recipe.ingredients : []} //copy and convert all elements
                    });
            }),
            tap(recipes=>{
                this.recipeService.setRecipes(recipes);
            })
        )*/


        //When done interception globally
        return this.http.get<Recipe[]>('https://fir-angular-ce87a.firebaseio.com/recipes.json')
        .pipe(
            map(recipes => {
            return recipes.map(recipe =>{ //this is javascript map , key vale for looping
                return {...recipe, ingredients:recipe.ingredients ? recipe.ingredients : []} //copy and convert all elements
                });
            }),
            tap(recipes=>{
                this.recipeService.setRecipes(recipes);
            })
           
        )

    }


}