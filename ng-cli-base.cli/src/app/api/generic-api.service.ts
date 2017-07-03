import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

export class Pagination {
    public page = 1;
    public limit = 10;
}

export class OrderBy {
    public sortfield = "";
    public order: string = "asc"; 
}

export abstract class GenericApiService<T> {

    private apiUrl = "http://localhost:3000/";

    constructor(protected http: Http, private endpoint: string) { }

    public getById(id: number): Observable<T> {

        return this.http
            .get(this.apiUrl + this.endpoint + '/' + id)
            .map((res: Response) => this.manageSuccess(res))
            .catch((error: any) => this.manageError(error));
    }

    public getWithParams(pagination?: Pagination, orderBy?: Array<OrderBy>, search?: string): Observable<Array<T>> {
        let query = '';
        if (pagination) {
            query = '_page=' + pagination.page + '&_limit='
        }
        if (orderBy && orderBy[0]) {
            let sort = orderBy[0].sortfield;
            let order = orderBy[0].order;
            for (let i = 1; i < orderBy.length; i++) {
                sort += ',' + orderBy[1].sortfield;
                order += ',' + orderBy[1].order;
            }
            query += '&_sort=' + sort + '&_order=' + order;
        }
        if (search && search != '') {
            query += '&q=' + search;
        }

        return this.http
            .get(this.apiUrl + this.endpoint + '?' + query)
            .map((res: Response) => this.manageSuccess(res))
            .catch((error: any) => this.manageError(error));
    }

    public create(obj: T): Observable<T> {

        return this.http
            .post(this.apiUrl + this.endpoint, obj)
            .map((res: Response) => this.manageSuccess(res))
            .catch((error: any) => this.manageError(error));
    }

    public delete(id: number): Observable<T> {

        return this.http
            .delete(this.apiUrl + this.endpoint + id)
            .map((res: Response) => this.manageSuccess(res))
            .catch((error: any) => this.manageError(error));
    }

    public update(id: number, obj: T): Observable<T> {

        return this.http
            .put(this.apiUrl + this.endpoint + id, obj)
            .map((res: Response) => this.manageSuccess(res))
            .catch((error: any) => this.manageError(error));
    }

    private manageError(error: any) {
        return Observable.throw((error.json ? error.json().error : error) || 'Server error');
    }
    private manageSuccess(res: Response) {
        return res.json();
    }
}
