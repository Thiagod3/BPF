import { Image } from '@rneui/base';
import { StyleSheet } from 'react-native';

import { detectImageType, isURL } from './getBase64Type'; // Import the isURL function

const renderImagePlayers = (image) => {
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
      height: 80,
      width: 80,
      borderRadius: 100,
    },
    profilePicFile: {
      height: 80,
      width: 80,
      borderRadius: 100,
    },
  });

  export default renderImagePlayers;