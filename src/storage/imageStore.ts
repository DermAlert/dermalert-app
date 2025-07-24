let imageUri: string | null = null;

export const setImageUri = (uri: string) => {
  imageUri = uri;
};

export const getImageUri = () => imageUri;

export const removeImageUri = () => {
  imageUri = null;
};


// let imageTempUri = '';

// export const setImageUri = (uri: string) => {
//   imageTempUri = uri;
// };

// export const getImageUri = () => imageTempUri;
