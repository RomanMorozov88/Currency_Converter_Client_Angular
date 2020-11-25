import { CurrencyPair } from './CurrencyPairCC';

export interface OperationCC {
    pair: CurrencyPair;
    date: string;
    fromAmount: number
    toAmount: number;
}