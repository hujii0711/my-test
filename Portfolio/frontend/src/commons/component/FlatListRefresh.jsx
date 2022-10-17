//React Native Swipe Down to Refresh List View Using Refresh Control
//https://aboutreact.com/react-native-swipe-down-to-refresh-listview-using-refreshcontrol/

//import React in our code
import React, {useState, useEffect} from 'react';

//import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  View,
  RefreshControl,
} from 'react-native';

const App = () => {
  const [refreshing, setRefreshing] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    //Service to get the data from the server to render
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(responseJson => {
        setRefreshing(false);
        setDataSource(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.title}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = item => {
    //Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  const onRefresh = () => {
    //Clear old data of the list
    setDataSource([]);
    //Call the Service to get the latest data
    getData();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {refreshing ? <ActivityIndicator /> : null}
        <FlatList
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          enableEmptySections={true}
          renderItem={ItemView}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 10,
  },
  itemStyle: {
    fontSize: 20,
    padding: 10,
  },
});

export default App;
