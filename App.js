import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import Task from './components/task';
import React, { useState } from 'react';

export default function App() {
  // State variables
  const [task, setTask] = useState(); // Holds the current task input value
  const [taskItems, setTaskItems] = useState([]); // Holds the list of tasks

  
  
  // Function to handle adding a task
  const handleAddTask = () => {
    Keyboard.dismiss(); // Dismisses the keyboard
    if (task) { // Only adds the task if it is not empty
      setTaskItems([...taskItems, task]); // Adds the current task to the taskItems array
      setTask(''); // Resets the task input value to an empty string
    }
  }

   

  // Function to mark a task as completed
  const completeTask = (index) => {
    let itemCopy = [...taskItems]; // Creates a copy of the taskItems array
    itemCopy.splice(index, 1); // Removes the task at the specified index
    setTaskItems(itemCopy); // Updates the taskItems state with the modified array
  }

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <ScrollView style={styles.item}>
          {/* Renders each task item as a TouchableOpacity wrapped Task component */}
          {taskItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task text={item} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a Task"
          value={task}
          onChangeText={(text) => setTask(text)}
          clearButtonMode='always'
        />
        <TouchableOpacity style={styles.btn} onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

// Styles
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
  addText: {},
  btn: {
    marginRight: 20,
  },
});
