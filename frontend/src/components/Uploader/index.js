import {
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
} from "../../pages/admin/utils/utils";
import styles from "./style.module.css";

export default function Uploader({
  id,
  setIsUploading,
  setImageUploaded,
  imageUploaded,
  isUploading,
}) {
  return (
    <main>
      <label>Ovjde ispustite sliku ili kliknite dugme "Odabir datoteka":</label>
      <div className={styles.inputForm}>
        <input
          required
          type="file"
          multiple
          name="imageUpload"
          //accept="image/*"
          className={styles.inputField}
          //hidden={true}
          onChange={(e) => {
            setIsUploading("Učitavanje slike u tijeku...");
            if (process.env.NODE_ENV !== "production") {
              uploadImagesApiRequest(e.target.files, id)
                .then((data) => {
                  setIsUploading("Učitavanje datoteke dovršeno");
                  setImageUploaded(!imageUploaded);
                })
                .catch((er) =>
                  setIsUploading(
                    er.response.data.message
                      ? er.response.data.message
                      : er.response.data
                  )
                );
            } else {
              uploadImagesCloudinaryApiRequest(e.target.files, id);
              setIsUploading(
                "Učitavanje datotetke dovršeno. Pričekajte rezultat ili osvježite stranicu po potrebi."
              );
              setTimeout(() => {
                //changing the state to refresh html of the page
                setImageUploaded(!imageUploaded);
              }, 5000);
            }
          }}
        />
        {isUploading}
      </div>
    </main>
  );
}
