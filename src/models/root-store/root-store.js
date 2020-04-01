import { types, getSnapshot, applySnapshot } from 'mobx-state-tree'

import { TransactionStoreModel } from '../transaction-store'

export const RootStoreModel = types
  .model('RootStore')
  .props({
    transactionStore: types.optional(TransactionStoreModel, {}),
  })
  .actions(self => {
    let initialState = {}
    return {
      afterCreate() {
        initialState = getSnapshot(self)
      },
      reset() {
        applySnapshot(self, initialState)
      },
    }
  })
