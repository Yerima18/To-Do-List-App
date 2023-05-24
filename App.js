import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import Task from './components/task';
import React, { useState } from 'react';

export default function App() {

  const [task, setTask] = useState();
  const[taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) => {
    let itemCopy = [...taskItems];
    itemCopy.splice(index, 1);
    setTaskItems(itemCopy);
  }


  return (
    <View style={styles.container}>

      <View style={styles.container}>
          <View style={styles.taskWrapper}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>

            <View style={styles.item} >  
            {
              taskItems.map((item, index) => {
                return  (
                  <TouchableOpacity key={index} onPress={() => completeTask(index)} >
                    <Task text={item}/>
                  </TouchableOpacity>
                )
              })
            }
              {/* <Task text={'task 1'} />
              <Task text={'task 2'} /> */}
            </View>

          </View>

            <KeyboardAvoidingView
              behavior={ Platform.OS === "ios" ? "padding" : "height" }
              style={styles.writeTaskWrapper}
            >
              <TextInput style={ styles.input } placeholder={ 'Write a Task' } value={task}  onChangeText={text => setTask(text)} />

              <TouchableOpacity style={ styles.btn }  onPress={() => handleAddTask()} >
                <View style={styles.addWrapper}>
                  <Text style={ styles.addText } > + </Text>
                 </View>
              </TouchableOpacity>

            </KeyboardAvoidingView>
 
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
  },

  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',

  },

  item: {
    marginTop: 30,
  },

  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#c0c0c0',
    borderWidth: 1,
    width: 250,
    marginLeft: 30,
  },

  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c0c0c0',
    borderWidth: 1,
    margin: 15,
  },

  addText: {

  },

  btn: {
    marginRight: 20,
  }
});
