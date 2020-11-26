import { Apollo } from "apollo-angular";
import * as Query from '../global-query';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MutationService {

    constructor(private apollo: Apollo) { }

    getConversion(fromId: string, toId: string, amount: number): Observable<any> {
        if (
            fromId != null
            && toId != null
            && fromId != toId
            && amount > 0
        ) {
            return this.getConvertionFromService(fromId, toId, amount);
        } else {
            alert("Wrong param")
        }
    }

    private getConvertionFromService(fromId: string, toId: string, amount: number): Observable<any> {
        return this.apollo
            .mutate<any>({
                mutation: Query.GET_CONVERSION,
                variables: {
                    fromId: fromId,
                    toId: toId,
                    amount: amount
                }
            });
    }

}