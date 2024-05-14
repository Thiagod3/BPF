import { Image } from '@rneui/base';
import { StyleSheet } from 'react-native';

import { detectImageType, isURL } from './getBase64Type'; // Import the isURL function

const renderImage = (image) => {
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
          style={styles.profilePic} 
        />
      );
    }
  }
  const styles = StyleSheet.create({
    profilePic: {
      height: 150,
      width: 150,
      borderRadius: 100,
    },
  });

  export default renderImage;