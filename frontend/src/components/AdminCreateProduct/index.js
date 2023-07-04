import styles from "./style.module.css";
import AttributesTable from "../AttributesTable";
//import Uploader from "../Uploader";
import { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  changeCategory,
  setValuesForAttrFromDbSelectForm,
  setAttributesTableWrapper,
} from "../utils/utils";

export default function AdminCreateProduct({
  createProductApiRequest,
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
  categories,
  reduxDispatch,
  newCategory,
  deleteCategory,
  saveAttributeToCatDoc,
}) {
  const [validated, setValidated] = useState(false);
  const [attributesTable, setAttributesTable] = useState([]);
  const [images, setImages] = useState(false);
  const [isCreating, setIsCreating] = useState("");
  const [createProductResponseState, setCreateProductResponseState] = useState({
    message: "",
    error: "",
  });
  const [categoryChoosen, setCategoryChoosen] = useState(
    "Izaberite kategoriju"
  );
  const [attributesFromDb, setAttributesFromDb] = useState([]); // for select lists
  const [newAttrKey, setNewAttrKey] = useState(false);
  const [newAttrValue, setNewAttrValue] = useState(false);

  const attrKey = useRef(null);
  const attrVal = useRef(null);
  const createNewAttrKey = useRef(null);
  const createNewAttrVal = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const formInputs = {
      name: form.name.value,
      description: form.description.value,
      count: form.count.value,
      price: form.price.value,
      category: form.category.value,
      attributesTable: attributesTable,
    };

    if (event.currentTarget.checkValidity() === true) {
      if (images.length > 3) {
        setIsCreating("Maksimalno 2 datoteke odjednom");
        return;
      }
      //sending info from inputs to function that posts product to db
      createProductApiRequest(formInputs)
        .then((data) => {
          //if there are images to be uploaded, use uploadImagesApiRequest function
          if (images) {
            //checking if it's production or development
            //to do: change to !==
            if (process.env.NODE_ENV !== "production") {
              uploadImagesApiRequest(images, data.productId)
                .then((res) => {})
                .catch((er) =>
                  setIsCreating(
                    er.response.data.message
                      ? er.response.data.message
                      : er.response.data
                  )
                );
            } else {
              //using Cloudinary for image storage
              uploadImagesCloudinaryApiRequest(images, data.productId);
            }
          }
          if (data.message === "product created") navigate("/admin/products");
        })
        .catch((er) => {
          setCreateProductResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          });
        });
    }

    setValidated(true);
  };

  const uploadHandler = (images) => {
    setImages(images);
  };
  const newCategoryHandler = (e) => {
    if (e.keyCode && e.keyCode === 13 && e.target.value) {
      //dispatching the newCategory action
      reduxDispatch(newCategory(e.target.value));
      //setTimeout to help automatically select the newly created category
      setTimeout(() => {
        let element = document.getElementById("cats");
        setCategoryChoosen(e.target.value);
        element.value = e.target.value;
        e.target.value = "";
      }, 200);
    }
  };

  const deleteCategoryHandler = () => {
    let element = document.getElementById("cats");
    reduxDispatch(deleteCategory(element.value));
    setCategoryChoosen("Izaberite kategoriju");
  };

  const attributeValueSelected = (e) => {
    if (e.target.value !== "Vrijednost atributa") {
      setAttributesTableWrapper(
        attrKey.current.value,
        e.target.value,
        setAttributesTable
      );
    }
  };

  //function for deleting attributes from attribute table
  const deleteAttribute = (key) => {
    //returning only items with key different from the key in the argument of the function
    setAttributesTable((table) => table.filter((item) => item.key !== key));
  };

  const newAttrKeyHandler = (e) => {
    e.preventDefault(); //to prevent sending the form manually
    setNewAttrKey(e.target.value);
    addNewAttributeManually(e);
  };

  const newAttrValueHandler = (e) => {
    e.preventDefault();
    setNewAttrValue(e.target.value);
    addNewAttributeManually(e);
  };

  const addNewAttributeManually = (e) => {
    //if new attribute name and value is inputed and Enter key is hit
    //13 is Enter
    if (e.keyCode && e.keyCode === 13) {
      if (newAttrKey && newAttrValue) {
        //dispatching action to save new attribute to db collections. after page
        //refresh it can be selected as already existing attribute with value
        reduxDispatch(
          saveAttributeToCatDoc(newAttrKey, newAttrValue, categoryChoosen)
        );
        //sending new attribute to be displayed in the table
        setAttributesTableWrapper(newAttrKey, newAttrValue, setAttributesTable);
        //resetting the new attribute input fields
        e.target.value = "";
        createNewAttrKey.current.value = "";
        createNewAttrVal.current.value = "";
        //cleaning up the values
        setNewAttrKey(false);
        setNewAttrValue(false);
      }
    }
  };

  //preventing reloading of the page when hitting enter
  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };

  return (
    <>
      <h2 className={styles.title}>Kreirajte novi proizvod</h2>
      <form
        //className={styles.form}
        noValidate
        validated={validated.toString()}
        onSubmit={handleSubmit}
        onKeyDown={(e) => checkKeyDown(e)}
      >
        <div className={styles.container}>
          <label className={styles.textareaLabel}>Ime proizvoda</label>
          <input
            required
            name="name"
            className={styles.input}
            type="text"
            maxLength="160"
          ></input>
          <label className={styles.textareaLabel}>Opis</label>
          <textarea
            className={styles.textarea}
            name="description"
            required
            type="text"
            maxLength="1000"
          ></textarea>
          <label className={styles.textareaLabel}>
            Količina na raspolaganju
          </label>
          <input
            required
            name="count"
            className={styles.input}
            type="number"
            maxLength="160"
          ></input>
          <label className={styles.textareaLabel}>Cijena</label>
          <input
            required
            className={styles.input}
            name="price"
            type="text"
            maxLength="160"
          ></input>
        </div>
        <div className={styles.container}>
          <label className={styles.textareaLabel}>
            <b>Kategorija proizvoda</b>
          </label>
          <div className={styles.categoryContainer}>
            <select
              className={styles.select}
              required
              name="category"
              id="cats"
              onChange={(e) =>
                changeCategory(
                  e,
                  categories,
                  setAttributesFromDb,
                  setCategoryChoosen
                )
              }
            >
              <option value="">Izaberite kategoriju</option>
              {categories.map((category, idx) => (
                <option key={idx} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <IoClose
              className={styles.closeIcon}
              onClick={deleteCategoryHandler}
            />
            (izbrišite odabranu kategoriju iz baze podataka)
          </div>
          <label className={styles.textareaLabel}>
            Ili kreirajte novu kategoriju
          </label>
          <input
            className={styles.input}
            type="text"
            maxLength="160"
            name="newCategory"
            placeholder="Ime nove kategorije"
            onKeyUp={newCategoryHandler}
          ></input>
          <div className={styles.attributeHelp}>
            Nakon upisa imena nove kategorije pritisnite tipku Enter i izaberite
            kategoriju
          </div>
          {attributesFromDb.length > 0 && (
            <div className={styles.chooseAtribute}>
              <div className={styles.column}>
                <label className={styles.textareaLabel}>
                  Izaberite atribut
                </label>
                <select
                  name="attrKey"
                  ref={attrKey}
                  onChange={(e) =>
                    setValuesForAttrFromDbSelectForm(
                      e,
                      attributesFromDb,
                      attrVal
                    )
                  }
                >
                  <option value="0">Izaberite atribut</option>
                  {attributesFromDb.map((item, idx) => (
                    <option key={idx} value={item.key}>
                      {item.key}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.column}>
                <label className={styles.textareaLabel}>
                  Vrijednost atributa
                </label>
                <select
                  name="attrVal"
                  ref={attrVal}
                  onChange={attributeValueSelected}
                >
                  <option value="0">Vrijednost atributa</option>
                </select>
              </div>
            </div>
          )}

          <div className={styles.chooseAtribute}>
            <div className={styles.column}>
              <label className={styles.textareaLabel}>
                Kreirajte novi atribut
              </label>
              <input
                ref={createNewAttrKey}
                disabled={["", "Izaberite kategoriju"].includes(
                  categoryChoosen
                )}
                className={styles.input}
                type="text"
                placeholder="Prvo izaberite ili kreirajte kategoriju"
                maxLength="160"
                name="newAttrKey"
                onKeyUp={newAttrKeyHandler}
              ></input>
            </div>
            <div className={styles.column}>
              <label className={styles.textareaLabel}>
                Vrijednost atributa
              </label>
              <input
                ref={createNewAttrVal}
                disabled={["", "Izaberite kategoriju"].includes(
                  categoryChoosen
                )}
                required={newAttrKey}
                className={styles.input}
                type="text"
                placeholder="Prvo izaberite ili kreirajte kategoriju"
                maxLength="160"
                name="newAttrValue"
                onKeyUp={newAttrValueHandler}
              ></input>
            </div>
          </div>
          {newAttrKey && newAttrValue && (
            <div className={styles.attributeHelp}>
              Nakon upisa imena i vrijednosti atributa pritisnite tipku Enter
            </div>
          )}
          {attributesTable.length > 0 && (
            <AttributesTable
              attributesTable={attributesTable}
              deleteAttribute={deleteAttribute}
            />
          )}
        </div>

        <div className={styles.imagesContainer}>
          <label className={styles.textareaLabel}>
            <b>Slike</b>
          </label>

          <div className={styles.inputForm}>
            <input
              required
              type="file"
              multiple
              name="imageUpload"
              //accept="image/*"
              className={styles.inputField}
              //hidden={true}
              onChange={(e) => uploadHandler(e.target.files)}
            />
            {isCreating}
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Kreirajte proizvod
        </button>

        {
          //if there is error, show it here, otherwise empty string
          createProductResponseState.error ?? ""
        }
      </form>
    </>
  );
}
