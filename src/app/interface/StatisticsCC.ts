import { CurrencyPairCC } from './CurrencyPairCC';

export interface StatisticsCC {
    pair: CurrencyPairCC;
    averageRate: number;
    totalSumFrom: number;
    totalSumTo: number;
}