/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native';
var page
import {getAPIFromServer} from './networking/Server'
export default class App extends Component {

  constructor() {
    super();
    this.state = {
      List_data:[],
      refresh: false,
      loading: false
    }
    page = 5;
    this.getAPI(0, 15)
  }
  getAPI(start, limit) {
    getAPIFromServer(start, limit).then((data) => {
      this.setState({
        List_data: data,
        refresh: false,
        loading: false
      })
    })
  }

  loading_view(style) {
    if(this.state.loading) {
      return (
        <View style={style}>
      <ActivityIndicator size="small" color="#00ff00" />
      </View>
      )
    } else {
      return null
    }
  
  }

  refresh() {
    this.setState({
      refresh: true
    })
    console.log('refresh', this.state.refresh)
    var random = Math.floor((Math.random() * 20) + 1);
    this.getAPI(0, random)
  }

  on_EndReached() {
    this.setState({
      loading: true
    })
    console.log('onreach', this.state.loading)
    page = page + 10
    this.getAPI(0,page)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <FlatList
           onEndReachedThreshold = {0.1}
            onEndReached = {() => {
              this.on_EndReached()
            }}
            refreshing = {this.state.refresh}
            onRefresh = {() =>{this.refresh()}}
            data={this.state.List_data}
            keyExtractor = {
              (item, index) => item.id
            }
            renderItem={({item}) => 
            <View style={styles.row}>
            <Text style={styles.text}>{item.id}</Text>
            <Text style={styles.text}>{item.symbol}</Text> 
            <Text style={styles.text}>{item.price_usd}</Text>                             
            </View>
            }
          />
        </View>
        {this.loading_view(styles.load)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 10,
  },
  text: {
    fontSize: 20,
    padding: 5,
    color: '#333333',
  },
  list: {
    flex: 2.9
  },
  load: {
    flex: 0.1,
    backgroundColor: 'grey'
  }
});
