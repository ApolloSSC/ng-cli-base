import { Component } from '@angular/core';
import { User, Post, Comment } from './model/model';
import { SharedService } from './service/shared.service';
import { PostApiService } from './api/api.services';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    private newPost = new Post();

    constructor(
        private sharedService: SharedService,
        private postService: PostApiService
    ) { }

    ngAfterViewInit() {
        $(".button-collapse").sideNav();
        $('.modal').modal();
    }

    showModalPost() {
        this.newPost = new Post();
        setTimeout(() => {
            $('#postModal').modal('open');
            $('#body').trigger('autoresize');
        }
        , 0);
    }

    sendPost(isValid) {
        this.newPost.userId = this.sharedService.currentUser.id;
        this.newPost.timestamp = (new Date()).valueOf();
        if (isValid) {
            this.postService.create(this.newPost).subscribe(
                res => {
                    this.sharedService.triggerRefresh.next(true);
                },
                err => console.log(err)
            );
            $('#postModal').modal('close');
        }
    }
}
