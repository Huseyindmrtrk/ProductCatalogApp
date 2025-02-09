import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ScrollToTopButtonProps {
  onPress: () => void;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.scrollToTopButton} onPress={onPress}>
      <Text style={styles.scrollToTopText}>↑</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  scrollToTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ffffff',
    borderColor: "#000000",
    borderWidth: 1,
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollToTopText: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default ScrollToTopButton;
