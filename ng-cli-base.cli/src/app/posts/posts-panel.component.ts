import { Component, OnInit } from '@angular/core';
import { SharedService } from '../service/shared.service';
import { PostApiService } from '../api/api.services';
import { Post } from '../model/model';
import { GetParams, Pages } from '../api/generic-api.service';

declare var $: any;

@Component({
  selector: 'app-posts-panel',
  templateUrl: './posts-panel.component.html',
  styleUrls: ['./posts-panel.component.scss']
})
export class PostsPanelComponent implements OnInit {

    private posts: Array<Post>;
    private pages: Pages;
    private currentPage: number;
    private resultsPerPage = 5;

    constructor(
        private postService: PostApiService,
        private sharedService: SharedService
    ) {
        sharedService.triggerRefresh.subscribe(
            b => {
                this.getPage(this.currentPage);
            }
        );
    }

    private getPage(page: number) {
        let params = new GetParams();
        params.pagination = { page: page, limit: this.resultsPerPage };
        params.expand = ['user'];
        params.orderBy = [{sortfield: 'timestamp', order: 'desc'}]
        this.postService.getWithPages(params).subscribe(
            res => {
                if (res.data.length > 0) {
                    this.posts = res.data;
                    this.pages = res.pages;
                    this.currentPage = page;
                }
                else if(this.currentPage != 1){
                    this.getPage(1);
                }
            },
            err => console.log(err)
        );
    }

    ngOnInit() {
        this.getPage(1);
    }

    ngAfterViewInit() {
        $('.collapsible').collapsible();
    }

    first() {
        if (this.pages.first) {
            this.getPage(this.pages.first);
        }
    }

    prev() {
        if (this.pages.prev) {
            this.getPage(this.pages.prev);
        }
    }

    next() {
        if (this.pages.next) {
            this.getPage(this.pages.next);
        }
    }

    last() {
        if (this.pages.last) {
            this.getPage(this.pages.last);
        }
    }

    getDateFromTimestamp(timestamp: number) {
        return (new Date(timestamp)).toLocaleString();
    }

    deletePost(id: number, event) {
        event.stopPropagation();
        this.postService.delete(id).subscribe(
            () => {
              this.getPage(this.currentPage);
            },
            err => console.log(err)
        );
    }
}
