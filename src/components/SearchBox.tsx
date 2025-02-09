import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface SearchBoxProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChangeText }) => {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder="Search products"
      placeholderTextColor={"black"}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default SearchBox;
