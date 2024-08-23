import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native';

const { height } = Dimensions.get('window');

const SlideUpModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current; // Start at the bottom

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal}>
        <Text>Show Modal</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none" // Disable default animation
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.overlay} onPress={closeModal}>
          <View style={{ flex: 1 }} />
        </TouchableOpacity>
        
        <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.iconContainer}>
            {/* Your icon here */}
            <View style={styles.icon}>
              <Text>Icon</Text>
            </View>
          </View>
          <Text style={styles.title}>Come back soon!</Text>
          <Text style={styles.message}>Are you sure you want to logout?</Text>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Yes, Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  icon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f56a6a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelText: {
    color: '#f56a6a',
    fontSize: 16,
  },
});

export default SlideUpModal;
