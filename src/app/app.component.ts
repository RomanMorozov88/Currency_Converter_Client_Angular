import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import { CurrencyCC } from './interface/CurrencyCC'

import * as Query from './global-query';
import { OperationCC } from './interface/OperationCC';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  operations: OperationCC[] = [];
  currencies: CurrencyCC[] = [];
  amount: number = 0;
  selectedFrom: string;
  selectedTo: string;
  resultAmount: number;
  page: number = 0;
  size: number = 4;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.getAllCurrencies();
  }

  getAllCurrencies() {
    this.apollo
      .watchQuery<any>({
        query: Query.READ_INFOS,
      })
      .valueChanges
      .subscribe(({ data }) => {
        this.currencies = data.getAllCurrencyInfo;
      });
  }

  getNextOpeartions() {
    if (this.operations.length > 0) {
      this.page++;
    }
    this.getOperations(this.page, this.size);
  }

  getPrevOpeartions() {
    if (this.page > 0) {
      this.page--;
    }
    this.getOperations(this.page, this.size);
  }

  getOperations(page: number, size: number) {
    this.apollo
      .watchQuery<any>({
        query: Query.GET_OPERATIONS,
        variables: {
          page: this.page,
          size: this.size
        }
      })
      .valueChanges
      .subscribe(({ data }) => {
        this.operations = data.getOperations;
      });
  }

  getConversion() {
    if (
      this.selectedFrom != null
      && this.selectedTo != null
      && this.selectedFrom != this.selectedTo
      && this.amount > 0
    ) {
      this.mainConvert();
    }
  }

  private mainConvert() {
    this.apollo
      .watchQuery<any>({
        query: Query.GET_CONVERSION,
        variables: {
          fromId: this.selectedFrom,
          toId: this.selectedTo,
          amount: this.amount
        }
      })
      .valueChanges
      .subscribe(({ data }) => {
        this.resultAmount = data.getCurrencyConversion;
      });
  }

}
