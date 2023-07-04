//validation service for image upload
const imageValidate = (images) => {
  let imagesTable = [];
  //checking if one or more images were sent
  if (Array.isArray(images)) {
    imagesTable = images;
  } else {
    imagesTable.push(images);
  }
  //limit of 3 images per upload
  if (imagesTable.length > 3) {
    return { error: "Send only 3 images at once." };
  }
  //limit for size of images
  for (let image of imagesTable) {
    if (image.size > 104856)
      return { error: "File size too large (above 1MB)." };
    //checking the extension of images
    const filetypes = /jpg|jpeg|png/;
    const mimetype = filetypes.test(image.mimetype);
    if (!mimetype)
      return { error: "Incorrect mime type (should be jpg, jpeg or png)" };
  }
  //if no errors were returned before, image is validated: there is no error
  return { error: false };
};
module.exports = imageValidate;
