import gql from 'graphql-tag';

export const GET_CONVERSION = gql` 
mutation ($fromId: String!, $toId: String!, $amount: Float!) {
    getCurrencyConversion(fromId: $fromId, toId: $toId, amount: $amount) {
      result
      rateDate
    }
  }`;

export const READ_INFOS = gql`
query {
    getAllCurrencyInfo {
      id
      name
     }
  }`;

export const GET_OPERATIONS = gql` 
query ($page: Int!, $size: Int!) {
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

export const GET_STATISTICS = gql`
query ($fromId: String!, $toId: String!) {
  getStatistics (fromId: $fromId, toId: $toId) {
    pair {
      fromCurrency {
          name
        }
      toCurrency {
          name
        }
      }
    averageRate
    totalSumFrom
    totalSumTo
  }
}`;