import gql from 'graphql-tag';

export const READ_INFOS = gql`{
    getAllCurrencyInfo {
      id
      name
     }
  }`;

export const GET_CONVERSION = gql` 
query ($fromId: String!, $toId: String!, $amount: Float!){
    getCurrencyConversion(fromId: $fromId, toId: $toId, amount: $amount)
  }`;

export const GET_OPERATIONS = gql` 
query ($page: Int, $size: Int){
    getOperations(page: $page, size: $size) {
        pair {
            fromCurrency {
                name
            }
            toCurrency {
                name
            }
        }
        fromAmount
        toAmount
	    date
    }
  }`;