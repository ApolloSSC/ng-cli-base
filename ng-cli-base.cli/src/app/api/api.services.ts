import { Injectable } from '@angular/core';
import { GenericApiService } from './generic-api.service';
import { User, Post, Comment } from '../model/model';
import { Http } from '@angular/http';

@Injectable()
export class UserApiService extends GenericApiService<User> {
    constructor(http: Http) { super(http, 'users'); }
}

@Injectable()
export class PostApiService extends GenericApiService<Post> {
    constructor(http: Http) { super(http, 'posts'); }
}

@Injectable()
export class CommentApiService extends GenericApiService<Comment> {
    constructor(http: Http) { super(http, 'comments'); }
}
