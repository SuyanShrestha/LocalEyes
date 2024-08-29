import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import colors from '../../constants/colors';
import { wp } from '../../helpers/common';
import LottieComponent from '../LottieComponent/LottieComponent';

const CategoryList = ({ categories, onCategoryPress }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.itemContainer]}
      onPress={() => onCategoryPress(item)} // Call the passed onCategoryPress function with the selected item
    >
      <LottieComponent
        animationData={item.animationData}
        width={wp(20)}
        height={wp(20)}
      />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <MasonryList
      style={{ alignSelf: 'stretch' }}
      contentContainerStyle={styles.contentContainer}
      numColumns={2}
      data={categories}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignSelf: 'stretch',
    width: '100%',
  },
  itemContainer: {
    width: '95%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.secondaryColor30,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    padding: 8,
    color: colors.text,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});

export default CategoryList;
