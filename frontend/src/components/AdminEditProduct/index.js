import styles from "./style.module.css";
import AttributesTable from "../AttributesTable";
import Uploader from "../Uploader";
import { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  changeCategory,
  setValuesForAttrFromDbSelectForm,
  setAttributesTableWrapper,
} from "../utils/utils";

export default function AdminEditProduct({
  categories,
  fetchProduct,
  updateProductApiRequest,
  reduxDispatch,
  saveAttributeToCatDoc,
  imageDeleteHandler,

  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
}) {
  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState({});
  const [updateProductResponseState, setUpdateProductResponseState] = useState({
    message: "",
    error: "",
  });
  const [attributesFromDb, setAttributesFromDb] = useState([]); // for select lists
  const [attributesTable, setAttributesTable] = useState([]); // for html table
  const [categoryChoosen, setCategoryChoosen] = useState(
    "Izaberite kategoriju"
  );
  //for asigning new attributes to a product
  const [newAttrKey, setNewAttrKey] = useState(false);
  const [newAttrValue, setNewAttrValue] = useState(false);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [isUploading, setIsUploading] = useState(""); //for showing message
  const [imageUploaded, setImageUploaded] = useState(false); //for changing the state and refreshing the page

  const attrVal = useRef(null);
  const attrKey = useRef(null);
  const createNewAttrKey = useRef(null);
  const createNewAttrVal = useRef(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    //collecting data from form inputs tosend them to db to update the product
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
      updateProductApiRequest(id, formInputs)
        .then((data) => {
          if (data.message === "product updated") navigate("/admin/products");
        })
        .catch((er) =>
          setUpdateProductResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }

    setValidated(true);
  };
  useEffect(() => {
    fetchProduct(id)
      .then((product) => setProduct(product))
      .catch((er) => console.log(er));
  }, [fetchProduct, id, imageRemoved, imageUploaded]);

  useEffect(() => {
    //getting attributes for a category
    let categoryOfEditedProduct = categories.find(
      (item) => item.name === product.category
    );
    if (categoryOfEditedProduct) {
      //products in db have main category and subcategories divided by /
      //getting the main category
      const mainCategoryOfEditedProduct =
        categoryOfEditedProduct.name.split("/")[0];
      //getting all data about the main category
      const mainCategoryOfEditedProductAllData = categories.find(
        (categoryOfEditedProduct) =>
          categoryOfEditedProduct.name === mainCategoryOfEditedProduct
      );
      if (
        //if there is data about main category and it has attributes
        mainCategoryOfEditedProductAllData &&
        mainCategoryOfEditedProductAllData.attrs.length > 0
      ) {
        //set attributes into attributtesFromDb state
        setAttributesFromDb(mainCategoryOfEditedProductAllData.attrs);
      }
    }
    setCategoryChoosen(product.category);
    setAttributesTable(product.attrs);
  }, [product, categories]);

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

  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };

  const newAttrKeyHandler = (e) => {
    e.preventDefault();
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
        setNewAttrKey(false);
        setNewAttrValue(false);
      }
    }
  };

  return (
    <>
      <h2 className={styles.title}>Ažurirajte proizvod</h2>
      <form
        //className={styles.form}
        noValidate
        validated={validated.toString()}
        onSubmit={handleSubmit}
        onKeyDown={(e) => checkKeyDown(e)}
      >
        <div className={styles.container}>
          <label className={styles.textareaLabel}>Ime</label>
          <input
            required
            className={styles.input}
            type="text"
            name="name"
            defaultValue={product.name}
          ></input>
          <label className={styles.textareaLabel}>Opis</label>
          <textarea
            className={styles.textarea}
            required
            type="text"
            name="description"
            rows={3}
            defaultValue={product.description}
          ></textarea>
          <label className={styles.textareaLabel}>
            Količina na raspolaganju
          </label>
          <input
            required
            className={styles.input}
            type="number"
            name="count"
            defaultValue={product.count}
          ></input>
          <label className={styles.textareaLabel}>Cijena</label>
          <input
            required
            className={styles.input}
            type="text"
            name="price"
            defaultValue={product.price}
          ></input>
        </div>
        <div className={styles.container}>
          <label className={styles.textareaLabelCategory}>
            <b>Kategorija</b>
          </label>

          <select
            required
            name="category"
            onChange={(e) =>
              changeCategory(
                e,
                categories,
                setAttributesFromDb,
                setCategoryChoosen
              )
            }
          >
            <option value="Izaberite kategoriju">Izaberite kategoriju</option>
            {categories.map((category, idx) => {
              return product.category === category.name ? (
                <option selected key={idx} value={category.name}>
                  {category.name}
                </option>
              ) : (
                <option key={idx} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <label className={styles.textareaLabel}>
            Kreirajte novu kategoriju
          </label>
          <input
            className={styles.input}
            type="text"
            name="newCategoryName"
            placeholder="Ime nove kategorije"
            maxLength="160"
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
                  <option>Izaberite atribut</option>
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
                disabled={categoryChoosen === "Izaberite kategoriju"}
                className={styles.input}
                type="text"
                placeholder="Prvo izaberite ili kreirajte kategoriju"
                name="newAttrKey"
                onKeyUp={newAttrKeyHandler}
                required={newAttrValue}
              ></input>
            </div>
            <div className={styles.column}>
              <label className={styles.textareaLabel}>
                Vrijednost atributa
              </label>
              <input
                ref={createNewAttrVal}
                disabled={categoryChoosen === "Izaberite kategoriju"}
                required={newAttrKey}
                className={styles.input}
                type="text"
                placeholder="Prvo izaberite ili kreirajte kategoriju"
                name="newAttrValue"
                onKeyUp={newAttrValueHandler}
              ></input>
            </div>
          </div>
          {newAttrKey && newAttrValue ? (
            <div className={styles.attributeHelp}>
              Nakon unosa imena i vrijednosti atributa pritisnite tipku Enter
            </div>
          ) : (
            ""
          )}
          {attributesTable && attributesTable.length > 0 && (
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
          <div className={styles.imagesLayout}>
            {product.images &&
              product.images.map((image, idx) => (
                <div key={idx} style={{ position: "relative" }}>
                  <img
                    className={styles.cardImage}
                    alt="product"
                    crossOrigin="anonymous"
                    src={image.path ?? null}
                    fluid="true"
                  />
                  <IoClose
                    onClick={() =>
                      imageDeleteHandler(image.path, id).then((data) =>
                        setImageRemoved(!imageRemoved)
                      )
                    }
                    className={styles.deleteImage}
                  />
                </div>
              ))}
          </div>

          <Uploader
            id={id}
            setIsUploading={setIsUploading}
            setImageUploaded={setImageUploaded}
            imageUploaded={imageUploaded}
            isUploading={isUploading}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Ažurirajte proizvod
        </button>
        {updateProductResponseState.error ?? ""}
      </form>
    </>
  );
}
