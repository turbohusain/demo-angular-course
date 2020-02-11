import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-header',
    templateUrl : './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    
    

    private userSub : Subscription;
    isAuthenticated = false;
    
    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user =>{ //if user object present then authenticated user
            this.isAuthenticated = !!user; //double check to return boolean, else null would be returned
        })
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

    constructor(private dataStorageService: DataStorageService, private authService: AuthService){}
    
    onSaveData(){
        this.dataStorageService.storeRecipes();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }

}