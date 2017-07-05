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

export class Filter {
    public field = "";
    public value = "";
}

export class GetParams {
    public pagination?: Pagination;
    public orderBy?: Array<OrderBy>;
    public search?: string;
    public filters?: Array<Filter>;
    public embed?: Array<string>;
    public expand?: Array<string>;
}

export class Pages {
    public first: number;
    public prev: number;
    public next: number;
    public last: number;
}

export class ResultWithPages<T> {
    public data: Array<T>;
    public pages: Pages;
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

    private createQueryString(params: GetParams): string {
        let query = '';
        if (params.pagination) {
            query = '_page=' + params.pagination.page + '&_limit=' + params.pagination.limit;
        }
        if (params.orderBy && params.orderBy[0]) {
            let sort = params.orderBy[0].sortfield;
            let order = params.orderBy[0].order;
            for (let i = 1; i < params.orderBy.length; i++) {
                sort += ',' + params.orderBy[1].sortfield;
                order += ',' + params.orderBy[1].order;
            }
            query += '&_sort=' + sort + '&_order=' + order;
        }
        if (params.search && params.search != '') {
            query += '&q=' + params.search;
        }
        if (params.filters) {
            for (let f of params.filters) {
                query += '&' + f.field + '=' + f.value;
            }
        }
        if (params.embed) {
            for (let e of params.embed) {
                query += '&_embed=' + e;
            }
        }
        if (params.expand) {
            for (let e of params.expand) {
                query += '&_expand=' + e;
            }
        }
        return query;
    }

    public get(params: GetParams): Observable<Array<T>> {
        let query = this.createQueryString(params);

        return this.http
            .get(this.apiUrl + this.endpoint + '?' + query)
            .map((res: Response) => this.manageSuccess(res))
            .catch((error: any) => this.manageError(error));
    }

    private parseLinkHeader(headers: string): Pages {
        let links = new Pages();
        if (headers) {
            let headerLinks = headers.split(', ');
            for (let link of headerLinks) {
                let linkType = link.split('rel=')[1].replace(new RegExp('"', 'g'), '');
                let url = link.substring(link.lastIndexOf('page=') + 5, link.indexOf('&'));
                links[linkType] = url;
            }
        }
        return links;
    }

    public getWithPages(params: GetParams): Observable<ResultWithPages<T>> {
        let query = this.createQueryString(params);

        return this.http
            .get(this.apiUrl + this.endpoint + '?' + query)
            .map((res: Response) => {
                let data = this.manageSuccess(res);
                let pages = this.parseLinkHeader(res.headers.get('link'));

                return { data: data, pages: pages}
            })
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
            .delete(this.apiUrl + this.endpoint + '/' + id)
            .map((res: Response) => this.manageSuccess(res))
            .catch((error: any) => this.manageError(error));
    }

    public update(id: number, obj: T): Observable<T> {

        return this.http
            .put(this.apiUrl + this.endpoint + '/' + id, obj)
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
