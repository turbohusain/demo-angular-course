import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Observable } from 'rxjs';

@Injectable({providedIn:"root"})
export class RecipesResolverSertvice implements Resolve<Recipe[]>{//Used for fixing a bug...load data of an invalid recipe which will result in undefined ingredient

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        return this.dataStorageSerivce.fetchRecipes();
    } 
    
    constructor(private dataStorageSerivce:DataStorageService){}
    

}