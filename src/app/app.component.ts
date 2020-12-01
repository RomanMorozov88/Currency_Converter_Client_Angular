import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { CurrencyCC } from './interface/CurrencyCC'
import { OperationCC } from './interface/OperationCC';
import { QueryService } from './service/query.service';
import { MutationService } from './service/mutation.service';
import { StatisticsCC } from './interface/StatisticsCC';
import { ResponseResultCC } from './interface/ResponseResultCC'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currencies$: Observable<CurrencyCC[]>;
  operations$: Observable<OperationCC[]>;
  statistics: StatisticsCC;
  amount: number;
  selectedFrom: string;
  selectedTo: string;
  resultAmount: ResponseResultCC;
  size: number = 4;

  constructor(
    private queryService: QueryService,
    private mutationService: MutationService
  ) { }

  ngOnInit() {
    this.currencies$ = this.queryService.getAllCurrenciesFromServer();
  }

  setNewSize() {
    this.queryService.setSize(this.size);
  }

  getNextOpeartions() {
    this.operations$ = this.queryService.getNextOpeartions();
  }

  getPrevOpeartions() {
    this.operations$ = this.queryService.getPrevOpeartions();
  }

  getOpeartions() {
    this.operations$ = this.queryService.getOpeartions();
  }

  getNewStatistics() {
    this.queryService.getStatisticsFromServer(
      this.selectedFrom,
      this.selectedTo
    ).subscribe(({ data }) => this.statistics = data.getStatistics);
  }

  getNewConversion() {
    this.mutationService.getConversion(
      this.selectedFrom,
      this.selectedTo,
      this.amount
    ).subscribe(({ data }) => this.resultAmount = data.getCurrencyConversion);
  }

}
