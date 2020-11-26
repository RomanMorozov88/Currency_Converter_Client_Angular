import { CurrencyPairCC } from './CurrencyPairCC';

export interface OperationCC {
    pair: CurrencyPairCC;
    date: string;
    fromAmount: number
    toAmount: number;
}