import { Image } from '@rneui/base';
import { StyleSheet } from 'react-native';

import { detectImageType, isURL } from './getBase64Type'; // Import the isURL function

const renderImageCards = (image) => {
  // If the image is a URL, render it directly
  if (isURL(image)) {
    return (
      <Image 
        source={{ uri: image }} 
        style={styles.profilePic} 
      />
    );
  } else {
      return (
        <Image 
          source={{ uri: `${detectImageType(image)}` }} 
          style={styles.profilePicFile} 
        />
      );
    }
  }
  const styles = StyleSheet.create({
    profilePic: {
      height: 160,
      width: 160,
      borderRadius: 100,
    },
    profilePicFile: {
      height: 150,
      width: 150,
      borderRadius: 100,
    },
  });

  export default renderImageCards;