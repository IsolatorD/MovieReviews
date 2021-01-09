import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableHighlight,
  Modal
} from 'react-native';

import axios from 'axios'

const App = () => {
  // i=tt3896198
  const apiUrl = 'http://www.omdbapi.com/?&apikey=e8e3ab4a'
  
  const [state, setState] = useState({
    s: '',
    results: [],
    selected: {}
  })

  const search = async () => {
    try {
      const { Search } = (await axios.get(`${apiUrl}&s=${state.s}`)).data
      setState(prevState => ({
        ...prevState,
        results: Search
      }))
    } catch (error) {
      console.log('error in search: ', error);
    }
  }

  const openPopup = async (id) => {
    try {
      const movie = (await axios.get(`${apiUrl}&i=${id}`)).data
      setState(prevState => ({
        ...prevState, selected: movie
      }))
    } catch (error) {
      console.log('error in show: ', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
      >
        Movie DB
      </Text>
      <TextInput
        style={styles.searchBox}
        value={state.s}
        onChangeText={(text) => setState(prevState => ({ ...prevState, s: text }))}
        onSubmitEditing={search}
      />

      <ScrollView
        style={styles.results}
      >
        {
          state.results.map(result => (
            <TouchableHighlight
              key={result.imdbID}
              onPress={() => openPopup(result.imdbID)}
            >
              <View
                style={styles.result}
              >
                <Image
                  source={{ uri: result.Poster }}
                  style={styles.poster}
                  resizeMode="cover"
                />  
                <Text
                  style={styles.heading}
                >
                  { result.Title }
                </Text>
              </View>
            </TouchableHighlight>
          ))
        }
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={false}
        visible={(typeof state.selected.Title != 'undefined')}
      >
        <View
          style={styles.popup}
        >
          <Text
            style={styles.poptitle}
          >
            {state.selected.Title}
          </Text>
          <Text
            style={styles.rating}
          >
            Rating: {state.selected.imdbRating}
          </Text>
          <Text>
            {state.selected.Plot}
          </Text>
        </View>
        <TouchableHighlight
          onPress={() => setState(prevState => ({
            ...prevState,
            selected: {}
          }))}
        >
          <Text
            style={styles.closeButton}
          >
            Close
          </Text>
        </TouchableHighlight>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 40
  },
  results: {
    flex: 1,
  },
  result: {
    flex: 1,
    width: '100%',
    marginBottom: 20
  },
  heading: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#445565'
  },
  poster: {
    width: '100%',
    height: 300
  },
  popup: {
    padding: 20
  },
  poptitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5
  },
  rating: {
    marginBottom: 20
  },
  closeButton: {
    padding: 20,
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    backgroundColor: '#2484C4'
  }
});

export default App;
