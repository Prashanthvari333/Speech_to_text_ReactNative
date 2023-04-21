import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Voice from '@react-native-community/voice';
import React, { useEffect,useState } from 'react';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); 

const App= () => {
  const [text,setText] =useState('');
  useEffect(()=>{
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
  },[])

  const onSpeechStartHandler = (e) =>{
    console.log('start speech handler:',e)
  }
  const onSpeechEndHandler = (e) =>{
  console.log('stop speech handler:',e)
  }
  const onSpeechResultsHandler = (e) =>{
    let text=e.value[0];
    setText(text);
  console.log('speech result handler:',e)
  }
  const startRecording = async () =>{
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.log('error raised:',error);
    }
  }
  const stopRecording = async() =>{
    try {
      await Voice.stop();
    } catch (error) {
      console.log('error raised:',error);
    }
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.heading}>Speech Recognition</Text>
        <View style={styles.textinput}>
          <TextInput
            value={text}
            placeholder='your text'
            onChangeText={setText}//text=>setText(text)
          />
          <Pressable onPress={startRecording}>
            <MaterialCommunityIcons
              name={'text-to-speech'}
              size={32}
              color={'black'}
            />

          </Pressable>
        </View>
        <View style={styles.stop}>
          <Pressable onPress={stopRecording}>
                <Text style={{fontSize:30, fontWeight:'bold',color:'red'}}>Stop</Text>
          </Pressable>
        </View>
        <View style={{flex:1}}/>
        <Text>{text}</Text>
      </SafeAreaView>

    </View>
  )
}

export default App
function Prashu(){
  return(
    <View>
      <Text>Hello...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:24,
    backgroundColor:'pink'
   
  },
  heading:{
    alignSelf:'center',
    marginVertical:26,
    fontWeight:'bold',
    fontSize:26,
  },
  textinput:{
    backgroundColor:'#fff',
    height:50,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderRadius:20,
    paddingHorizontal:10,
    shadowOffset:{width:1,height:1},
    shadowRadius:2,
    elevation:2,
    shadowOpacity:0.6,
    borderColor:'#ddd'
  },
  stop:{
    alignItems:'center',
    margin:20,
  }
})