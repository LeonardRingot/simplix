
import React,{useState,useEffect} from 'react';
import axios from 'axios';

import { StyleSheet, Text,Image, FlatList, View , TextInput, Button, ActivityIndicator} from 'react-native';


const API_KEY= 'dbd1168e4b7b2f9cca7c17bc58925157'
function App()  {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setError(null); //clear previous error message
    if (!searchTerm) {
      setError({ message: "Aucun réalisateur spécifié." });
      return;
    }
    try {
      setIsLoading(true);
      const searchResponse = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${searchTerm}&language=fr`);
      const person = searchResponse.data.results[0];
      const creditsResponse = await axios.get(`https://api.themoviedb.org/3/person/${person.id}/movie_credits?api_key=${API_KEY}&language=fr`);
      const moviesWithKey = creditsResponse.data.crew;
      setMovies(moviesWithKey);
    } catch (err) {
      console.log(err);
    }finally {
      setIsLoading(false);
    }
    setSearchTerm('');
  };


  return (
    <>
      <View style={styles.container}>
        <Text style={styles.mytext}>Bienvenue sur Simplix, recherchez des films par leur réalisateur</Text>
        <TextInput style={styles.input}
          onChangeText={text => setSearchTerm(text)}
          value={searchTerm}
          placeholder="Chercher par réalisateur"
        />
        <Button style={styles.button} title="Rechercher" onPress={handleSearch} />
        {isLoading && <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#0000ff" /><Text style={styles.loadingText}>Loading...</Text></View>}
        {error && <View style={styles.errorContainer}><Text style={styles.errorText}>{error.message}</Text></View>}
        {movies.length === 0 && !isLoading && !error && <Text style={styles.noResultsText}>No results found</Text>}
        <FlatList style={styles.flatList}
          data={movies}
          keyExtractor={(item, index) => index.toString()}
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f0f0f0',
  },
  mytext: {
    fontSize: 18,
    marginBottom: 18,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#0066c0',
    padding: 12,
    borderRadius: 4,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 18,
    marginBottom: 24,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginBottom: 24,
  },
  noResultsText: {
    fontSize: 18,
    marginBottom: 24,
  },
  flatList: {
    flex: 1,
    marginTop: 24,
  },
  movieContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    marginBottom: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  movieTitle: {
    fontSize: 18,
    marginBottom: 18,
  },
  movieInfo: {
    fontSize: 14,
    marginBottom: 18,
  },
  movieImage: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
    marginBottom: 18,
  },

});
