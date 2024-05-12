import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import Peace from '../audio/Peace'

const Audio = (props:any) => {
  return (
    <View style={styles.backLight}>
    <ScrollView>
          <View >
            <Peace props={props}/>
          </View>
        </ScrollView>
    </View>
  )
}

export default Audio;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
      },
      backLight: {
        backgroundColor:'white',
        height:'100%'
      }
})