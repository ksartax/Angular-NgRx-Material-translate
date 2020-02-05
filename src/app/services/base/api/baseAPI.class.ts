import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export abstract class BaseAPIClass<TypeGet, TypeCreate, TypeUpdate, TypeDelete> {
    baseUrl: string;
    constructor(protected httpClient: HttpClient) { }

    getAll(filterObject?: any): Observable<ApiServiceResponseModel.Objects<TypeGet>> {
        let queryString = '';
        if (filterObject) {
            const fitlerKeys: any[] = Object.keys(filterObject);
            if (fitlerKeys.length > 0) {
                queryString = '?';
            }
            fitlerKeys.forEach((key: any, index) => {
                if (filterObject[key] !== undefined && filterObject[key] !== null) {
                    if (filterObject[key].toString().length) {
                        queryString += `${key}=${filterObject[key]}&`;
                    }
                }
            });
            if (
                fitlerKeys.length > 0 &&
                queryString[queryString.length - 1] === '&'
            ) {
                queryString = queryString.slice(0, -1);
            }
        }
        return this.httpClient.get(`${this.baseUrl}${queryString}`).pipe(
            map((body: ApiServiceResponseModel.Objects<TypeGet>) => {
                return body;
            })
        );
    }

    getById(id: string, filterObject?: any): Observable<ApiServiceResponseModel.Objects<TypeGet>> {
        let queryString = '';
        if (filterObject) {
            const fitlerKeys: any[] = Object.keys(filterObject);
            if (fitlerKeys.length > 0) {
                queryString = '?';
            }
            fitlerKeys.forEach((key: any, index) => {
                if (filterObject[key] !== undefined && filterObject[key] !== null) {
                    if (filterObject[key].toString().length) {
                        queryString += `${key}=${filterObject[key]}&`;
                    }
                }
            });
            if (
                fitlerKeys.length > 0 &&
                queryString[queryString.length - 1] === '&'
            ) {
                queryString = queryString.slice(0, -1);
            }
        }
        return this.httpClient.get(`${this.baseUrl}/${id}${queryString}`).pipe(
            map((body: ApiServiceResponseModel.Objects<TypeGet>) => {
                return body;
            })
        );
    }

    create(payload: TypeCreate): Observable<ApiServiceResponseModel.Objects<TypeGet>> {
        return this.httpClient.post(this.baseUrl, payload).pipe(
            map((body: ApiServiceResponseModel.Objects<TypeGet>) => {
                return body;
            })
        );
    }

    update(payload: TypeUpdate): Observable<ApiServiceResponseModel.Objects<TypeGet>> {
        return this.httpClient.put(`${this.baseUrl}`, payload).pipe(
            map((body: ApiServiceResponseModel.Objects<TypeGet>) => {
                return body;
            })
        );
    }

    delete(id: string): Observable<ApiServiceResponseModel.Objects<TypeDelete>> {
        return this.httpClient.delete(`${this.baseUrl}/${id}`).pipe(
            map((body: ApiServiceResponseModel.Objects<TypeDelete>) => {
                return body;
            })
        );
    }

    deleteAll(): Observable<ApiServiceResponseModel.Objects<TypeDelete>> {
        return this.httpClient.delete(`${this.baseUrl}/all`).pipe(
            map((body: ApiServiceResponseModel.Objects<TypeDelete>) => {
                return body;
            })
        );
    }
}
