import axios from "axios";
//functions extracted here so they can be shared for editing and creating product

export const uploadImagesApiRequest = async (images, productId) => {
  const formData = new FormData();
  Array.from(images).forEach((image) => {
    //images is key, image is data
    formData.append("images", image);
  });
  const { data } = await axios.post(
    "/api/products/admin/upload?productId=" + productId,
    formData
  );
  return data;
};

//without additional service, images are only uploaded to local disc
//code example taken from cloudinary documentation
export const uploadImagesCloudinaryApiRequest = (images, productId) => {
  //dogj4guom is the Product environment cloud name on Cloudinery
  const url = "https://api.cloudinary.com/v1_1/dogj4guom/image/upload";
  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    let file = images[i];
    formData.append("file", file);
    //xy8ehlum is name of the Unsigned upload preset
    formData.append("upload_preset", "xy8ehlum");
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //cloudinary=true to distinguish two upload paths
        axios.post(
          "/api/products/admin/upload?cloudinary=true&productId=" + productId,
          data
        );
      });
  }
};
