import { flow, getEnv, types } from 'mobx-state-tree'

import { URLS } from '../services/api'

const TransactionModel = types
  .model('Transaction', {
    id: types.string,
    amount: types.number,
    currency: types.string,
    created: types.string,
    refunded: types.optional(types.boolean, false),
  })
  .actions(self => ({
    update(data) {
      for (const key in data) {
        self[key] = data[key]
      }
    },
  }))

const TransactionDataModel = types.model('TransactionData', {
  count: types.number,
  items: types.array(TransactionModel),
})

const defaultTransactionData = {
  count: 0,
  items: [],
}

export const TransactionStoreModel = types
  .model('TransactionStore', {
    transactionsData: types.optional(TransactionDataModel, defaultTransactionData),
    isLoadingListTransaction: false,
  })
  .views(self => ({
    get api() {
      return getEnv(self).api
    },
    get showMessage() {
      return getEnv(self).showMessage
    },
  }))
  .actions(self => ({
    getTransactions: flow(function*() {
      self.isLoadingListTransaction = true
      const result = yield self.api.get(URLS.Transaction)
      self.isLoadingListTransaction = false
      if (result.error) {
        self.showMessage('error', result.error)
      } else {
        self.transactionsData = result
      }
    }),
    updateTransactions(data) {
      for (const item of self.transactionsData.items) {
        item.update(data)
      }
    },
  }))
