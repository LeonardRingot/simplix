import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,SafeAreaView, Text, View , TextInput, Button, TouchableOpacity, Pressable} from 'react-native';


export default function App()  {
  const [search, setsearch] = React.useState('Useless Text');
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! TEST COMMIT</Text>
      <StatusBar style="auto" />
      <SafeAreaView>

     
      <TextInput
            style={styles.input}
            placeholder='Rechercher un film'
            onChangeText={setsearch}
        value={search}
          />
           </SafeAreaView>
          <Pressable style={styles.btn} onPress={() => Alert.alert('Left button pressed')} ><Text style={styles.txtbtn}>Rechercher</Text></Pressable>
    </View>
  );
}

//https://api.themoviedb.org/3/movie/550?api_key=dbd1168e4b7b2f9cca7c17bc58925157

//dbd1168e4b7b2f9cca7c17bc58925157

//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQxMTY4ZTRiN2IyZjljY2E3YzE3YmM1ODkyNTE1NyIsInN1YiI6IjYzZDE2ODE5OWU0NTg2MDBiMjdjOGYzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H-_98Rr6pz2NOjr7nvbWI80fFHZ609UoEeb6dFk7dHs
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
