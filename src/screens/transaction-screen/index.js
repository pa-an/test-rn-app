import React, { useEffect, useRef } from 'react'
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react-lite'
import moment from 'moment'

import { useStores } from '../../models/root-store'
import { LoadingOverlay } from '../../components'

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#EFEFF4',
    borderLeftWidth: 5,
  },
  itemLeft: {
    flex: 1,
  },
  itemRight: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemDate: {
    color: '#2B2B2B',
    fontSize: 14,
  },
  itemTime: {
    color: '#2B2B2B',
    opacity: 0.6,
    fontSize: 12,
    marginTop: 10,
  },
  itemAmount: {
    fontWeight: '500',
    color: '#2B2B2B',
    fontSize: 14,
  },
  itemRefunded: {
    color: 'tomato',
  },
  btnRefund: {
    padding: 8,
    backgroundColor: 'tomato',
    alignItems: 'center',
    marginVertical: 10,
  },
})

const Item = observer(({ item }) => {
  const borderLeftColor = item.refunded ? 'tomato' : '#3A9CED'
  return (
    <View style={[ styles.item, { borderLeftColor } ]}>
      <View style={styles.itemLeft}>
        <Text style={styles.itemDate}>{moment(item.created).format('MM/DD/YY')}</Text>
        <Text style={styles.itemTime}>{moment(item.created).format('hh:mmA')}</Text>
      </View>
      <View style={styles.itemRight}>
        <Text style={styles.itemAmount}>{`${item.currency}${item.amount}`}</Text>
        {item.refunded &&
          <Text style={styles.itemRefunded}>REFUNDED</Text>
        }
      </View>
    </View>
  )
})

export default observer(() => {
  const {
    transactionStore: { transactionsData, getTransactions, updateTransactions, isLoadingListTransaction },
  } = useStores()

  const refunded = useRef(true)

  useEffect(() => {
    getTransactions()
  }, [])

  const handleRefundAll = () => {
    refunded.current = !refunded.current
    updateTransactions({ refunded: refunded.current })
  }

  const renderItem = ({ item }) => {
    return <Item item={item} />
  }

  return (
    <>
      <LoadingOverlay isLoading={isLoadingListTransaction} />
      <TouchableOpacity style={styles.btnRefund} onPress={handleRefundAll}>
        <Text>REFUND ALL</Text>
      </TouchableOpacity>
      <FlatList
        data={transactionsData.items}
        renderItem={renderItem}
      />
    </>
  )
})
