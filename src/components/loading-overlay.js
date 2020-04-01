import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
})

export const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) {
    return null
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='#3A9CED' />
    </View>
  )
}
