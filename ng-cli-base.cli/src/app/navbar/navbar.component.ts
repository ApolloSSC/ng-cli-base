import { Component, OnInit } from '@angular/core';

import { SharedService } from '../service/shared.service';
import { User } from '../model/model';
import { UserApiService } from '../api/api.services';
import { GetParams } from '../api/generic-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    private username = "";

    constructor(
        private userService: UserApiService,
        private sharedService: SharedService
    ) { }

    ngOnInit() {
    }

    private loginUser(isValid) {
        if (isValid) {
            //Get par username
            let parameters = new GetParams();
            parameters.filters = [{ field: 'username', value: this.username }];
            this.userService.get(parameters).subscribe(
                res => {
                    if (res.length > 0) {
                        this.sharedService.currentUser = res[0];
                    }  
                    //Créer si username inexistant
                    else {
                        let userToCreate = new User();
                        userToCreate.username = this.username;
                        this.userService.create(userToCreate).subscribe(
                            newUser => {
                                this.sharedService.currentUser = newUser;
                            },
                            err => console.log(err)
                        );
                    }
                },
                err => console.log(err)
            );
        }
    }

    private logout() {
        this.sharedService.currentUser = null;
    }

}
