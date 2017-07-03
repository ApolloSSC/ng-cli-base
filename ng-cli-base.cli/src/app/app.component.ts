import { Component } from '@angular/core';
import { UserApiService, PostApiService, CommentApiService } from './api/api.services'
import { User, Post, Comment } from './model/model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    private title = 'app';
    private user = new User();
    private newuser = new User();

    constructor(
        private postService: PostApiService,
        private userService: UserApiService,
        private commentService: CommentApiService
    ) { 
        userService.getById(1).subscribe(
            us => {
                this.user = us;
            },
            err => console.log(err)
        );
    }

    private addUser() {
        this.userService.create(this.newuser).subscribe(
            res => {
                this.user = res;
            },
            err => console.log(err)
        );
    }
}
