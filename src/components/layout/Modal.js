import React from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const ExampleModal = ({ visible, onClose, organizer, location, paid, field, price }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitles}>Organizadores</Text>
          <Text style={styles.modalText}>{organizer}</Text>
          <Text style={styles.modalTitles}>Local</Text>
          <Text style={styles.modalText}>{location}</Text>
          <Text style={styles.modalTitles}>Tipo de Campo</Text>
          <Text style={styles.modalText}>{field === 0 ? "Areia" : field === 1 ? "Society" : "Gramado"}</Text>
          <Text style={styles.modalTitles}>Pago?</Text>
          <Text style={styles.modalText}>{paid == false || price == null ? "Não" : "Sim"}</Text>
          <Text style={styles.modalTitles}>Preço</Text>
          <Text style={styles.modalText}>{paid == false || price == null ? "Gratis" : "R$" + price }</Text>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Fechar detalhes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#D9D9D9',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'flex-start',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalTitles: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#113B8F'
  },
  closeButtonText: {
    color: '#FF731D',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ExampleModal;
