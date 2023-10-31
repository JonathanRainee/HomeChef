import React from 'react'
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const OPTIONS = ['Cash', 'Debit', 'OVO'];
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ModalPicker = (props) => {
  return (
    <Modal transparent={true} animationType="fade" visible={props.isOpen} onRequestClose={() => props.changeModalVis(false)}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { width: WIDTH - 20, height: HEIGHT / 2 }]}>
          {/* Your modal content goes here */}
          <Text>Modal Content</Text>
          <TouchableOpacity onPress={() => props.changeModalVis(false)}>
            <Text>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
});

export {ModalPicker}