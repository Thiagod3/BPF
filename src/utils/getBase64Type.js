const isJPEG = async (base64String) => {
  if (typeof base64String !== "string") {
    return false;
  }

  const jpegPrefixes = ["data:image/jpeg", "/9j/", "ffd8ffe0"];
  return jpegPrefixes.some((prefix) => base64String.startsWith(prefix));
};

const isPNG = async (base64String) => {
  if (typeof base64String !== "string") {
    return false;
  }

  const pngPrefixes = ["data:image/png", "iVBORw0KGgoAAAANSUhEUgAA"];
  return pngPrefixes.some((prefix) => base64String.startsWith(prefix));
};

const isURL = (base64String) => {
  // Regular expression pattern to match URLs
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  // Test the string against the URL pattern
  return urlPattern.test(base64String);
};



const detectImageType = (base64String) => {
  if (isJPEG(base64String)) {
    return "data:image/jpeg;base64," + base64String;
  } else if (isPNG(base64String)) {
    return "data:image/png;base64," + base64String;
  } else if (isURL(base64String)) {
    return base64String;
  }
};

export { detectImageType, isURL };
