import React, { useState, useEffect } from 'react'
import { SafeAreaView, YellowBox } from 'react-native'

import TransactionScreen from './screens/transaction-screen'
import { FlashMessage } from './components'
import { RootStoreProvider, setupRootStore } from './models/root-store'

YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps',
  'Warning: componentWillMount',
  'Remote debugger',
])

export default () => {
  const [rootStore, setRootStore] = useState()
  useEffect(() => {
    setupRootStore().then(setRootStore)
  }, [])

  if (!rootStore) {
    return null
  }

  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaView style={{ flex: 1 }}>
        <TransactionScreen />
        <FlashMessage position='top' />
      </SafeAreaView>
    </RootStoreProvider>
  )
}
