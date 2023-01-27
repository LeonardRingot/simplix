import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import axios from 'axios';

import { StyleSheet,SafeAreaView, Text,Image, FlatList, View , TextInput, Button,FormControl, TouchableOpacity, Pressable, Form} from 'react-native';

const SEARCH_URL = "https://api.themoviedb.org/3/search/person?api_key=" + API_KEY + "&query=";
const CREDITS_URL = "https://api.themoviedb.org/3/person/{person_id}/movie_credits?api_key=" + API_KEY;
const API_KEY= 'dbd1168e4b7b2f9cca7c17bc58925157'
function App()  {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    try {
      const searchResponse = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${searchTerm}&language=fr`);
      const person = searchResponse.data.results[0];
      const creditsResponse = await axios.get(`https://api.themoviedb.org/3/person/${person.id}/movie_credits?api_key=${API_KEY}&language=fr`);
      const moviesWithKey = creditsResponse.data.crew;
      setMovies(moviesWithKey);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
    <View style={styles.container}>
      <Text style={styles.mytext}>Bienvenue sur Simplix, rechercher par son réalisateur</Text>
      <TextInput style={styles.input}
         
        onChangeText={text => setSearchTerm(text)}
        value={searchTerm}
        placeholder="Chercher par réalisateur"
      />
      <Button style={styles.button} title="Rechercher" onPress={handleSearch} />
      <FlatList style={styles.flatList}
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.movieContainer}>
            <Text style={styles.movieTitle}>Titre originale:  {item.original_title}</Text>
            <Text style={styles.movieInfo}>Date de sortie: {item.release_date}</Text>
            <Text style={styles.movieInfo}>Résumé: {item.overview}</Text>
            <Text style={styles.movieInfo} >Popularité: {item.popularity}</Text>
            <Text style={styles.movieInfo}>Note globale: {item.vote_average} / 10</Text>
            <Image style={styles.movieImage} source={{uri: "https://image.tmdb.org/t/p/w500"+ item.poster_path}}></Image>
          </View>
        )}
      />
    </View>

      
    </>
   
  );
}

export default App;

//dbd1168e4b7b2f9cca7c17bc58925157


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white'
  },
  mytext: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    margin: 10
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#e50914',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieContainer: {
    margin: 10,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  movieTitle: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieInfo: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  movieImage: {
    width: '80%',
    height: 300,
    borderRadius: 5,
    margin: 10,
    resizeMode: 'contain'
  },
  flatList: {
    alignSelf: 'center',
    width: '90%'
}
});
