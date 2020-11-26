import { Apollo } from "apollo-angular";
import * as Query from '../global-query';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class QueryService {

    private page: number = 0;
    private size: number = 4;

    constructor(private apollo: Apollo) { }

    setSize(newSize: number) {
        this.size = newSize;
    }

    getAllCurrenciesFromServer(): Observable<any> {
        return this.apollo
            .watchQuery({ query: Query.READ_INFOS })
            .valueChanges.pipe(
                map((result: any) => result.data.getAllCurrencyInfo)
            );
    }

    getStatisticsFromServer(fromId: string, toId: string): Observable<any> {
        return this.apollo
            .watchQuery({
                query: Query.GET_STATISTICS,
                variables: {
                    fromId: fromId,
                    toId: toId
                }
            })
            .valueChanges.pipe(
                map((result: any) => result.data.getStatistics)
            );
    }

    getNextOpeartions(): Observable<any> {
        this.page++;
        return this.getOperationsFromServer(this.page, this.size);
    }

    getPrevOpeartions(): Observable<any> {
        if (this.page > 0) {
            this.page--;
        }
        return this.getOperationsFromServer(this.page, this.size);
    }

    getOpeartions(): Observable<any> {
        this.page = 0;
        return this.getOperationsFromServer(this.page, this.size);
    }

    private getOperationsFromServer(page: number, size: number): Observable<any> {
        return this.apollo
            .watchQuery({
                query: Query.GET_OPERATIONS,
                variables: {
                    page: page,
                    size: size
                }
            }).valueChanges.pipe(
                map((result: any) => result.data.getOperations)
            );
    }

}