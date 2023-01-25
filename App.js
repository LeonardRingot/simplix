import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';

import { StyleSheet,SafeAreaView, Text, View , TextInput, Button,FormControl, TouchableOpacity, Pressable, Form} from 'react-native';

const API_URL="https://api.themoviedb.org/3/movie/popular?api_key=dbd1168e4b7b2f9cca7c17bc58925157";
const API_SEARCH="https://api.themoviedb.org/3/search/movie?api_key=dbd1168e4b7b2f9cca7c17bc58925157&query";

 function App()  {
  const [movies, setMovies]=useState([]);
  const [query, setQuery]=useState('');
  useEffect(() => {
    fetch(API_URL)
    .then((res)=>res.json())
    .then(data=>{
      console.log(data);
      setMovies(data.results);
    })
  }, [])
  const searchMovie = async(e)=>{
    e.preventDefault();
    console.log("Searching");
    try{
      const url=`https://api.themoviedb.org/3/search/movie?api_key=dbd1168e4b7b2f9cca7c17bc58925157&query=${query}`;
      const res= await fetch(url);
      const data= await res.json();
      console.log(data);
      setMovies(data.results);
    }
    catch(e){
      console.log(e);
    }
  }
  const changeHandler=(e)=>{
    setQuery(e.target.value);
  }
  return (
    <>
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! TEST COMMIT</Text>
      {/* <StatusBar style="auto" />
      <SafeAreaView>
      <TextInput
            style={styles.input}
            placeholder='Rechercher un film'
          
          />
           </SafeAreaView>
          <Pressable style={styles.btn} onPress={() => Alert.alert('Left button pressed')} ><Text style={styles.txtbtn}>Rechercher</Text></Pressable> */}
          <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
              <FormControl
              type="search"
              placeholder="Movie Search"
              className="me-2"
              aria-label="search"
              name="query"
              value={query} onChange={changeHandler}></FormControl>
              <Button variant="secondary" type="submit">Search</Button>
            </Form>
            
    </View>
    <div>
      {movies.length > 0 ?(
        <div className="container">
        <div className="grid">
          {movies.map((movieReq)=>
          <MovieBox key={movieReq.id} {...movieReq}/>)}
            </div>
    </div>
      ):(
        <Text>Sorry !! No Movies Found</Text>
      )}
    </div>   
    </>
  );
}

export default App;

//dbd1168e4b7b2f9cca7c17bc58925157


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#db0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mytext: {
    fontSize:20,
    color: '#000000',textAlign:'center',
    justifyContent: 'center',
  },
});
