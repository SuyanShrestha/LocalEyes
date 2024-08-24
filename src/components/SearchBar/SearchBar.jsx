import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import HugeIcon from '../../assets/icons';
import colors from '../../constants/colors';
import { hp, wp } from '../../helpers/common';
import radius from '../../constants/radius';

const SearchBar = ({ placeholder, onSearch, style }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (timeoutId) clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    setTimeoutId(newTimeoutId);

    return () => clearTimeout(newTimeoutId);
  }, [searchTerm]);

  return (
    <View style={[styles.searchContainer, style]}>
      <HugeIcon name="userSearch" size={26} strokeWidth={1.5} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        onChangeText={value => setSearchTerm(value)}
        value={searchTerm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryColor30,
    borderRadius: radius.xxl,
    paddingHorizontal: wp(2),
    marginHorizontal: wp(5),
  },
  input: {
    flex: 1,
    fontSize: wp(4),
    color: colors.text,
    marginHorizontal: wp(2),
  },
  icon: {
    marginLeft: wp(2),
  },
});

export default SearchBar;
