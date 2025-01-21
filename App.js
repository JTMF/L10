import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet} from 'react-native';

let originalData = []

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

const App = () => {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
      fetch("https://mysafeinfo.com/api/data?list=moviequotes&format=json&case=default")
          .then((response) => {
              return response.json()
          })
          .then((myJson) => {
              if(originalData.length < 1)
              {
                  setMyData(myJson);
                  originalData = myJson;
              }
          })
  }, [])

    const FilterData = (text) => {
      if(text!="") {
          let myFilteredData = originalData.filter((item) =>
              item.Year.toString().includes(text) ||
              item.Movie.toLowerCase().includes(text.toLowerCase()) ||
              item.Quote.toLowerCase().includes(text.toLowerCase()))
          setMyData(myFilteredData);
      } else {
          setMyData(originalData);
      }
    }

  const renderItem = ({item, index}) => {
    return (
    <View style={styles.item}>
        <Text style={[styles.text, styles.title]}>Year: {item.Year}</Text>
        <Text style={styles.text}>Movie: {item.Movie}</Text>
        <Text style={[styles.text, {fontStyle: 'italic', marginTop: 5}]}>Quote: {item.Quote}</Text>
    </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar/>
      <Text style={styles.headerText}>Search Movie:</Text>
      <TextInput style={styles.input} onChangeText={(text)=>{FilterData(text)}}/>
      <FlatList data={myData} renderItem={renderItem} />
    </View>
  );
}

export default App;
