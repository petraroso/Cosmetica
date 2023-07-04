export const changeCategory = (
  e,
  categories,
  setAttributesFromDb,
  setCategoryChoosen
) => {
  //getting the main category from redux
  const highLevelCategory = e.target.value.split("/")[0];
  const highLevelCategoryAllData = categories.find(
    (cat) => cat.name === highLevelCategory
  );
  if (highLevelCategoryAllData && highLevelCategoryAllData.attrs) {
    setAttributesFromDb(highLevelCategoryAllData.attrs);
  } else {
    setAttributesFromDb([]);
  }
  setCategoryChoosen(e.target.value);
};

export const setValuesForAttrFromDbSelectForm = (
  e,
  attributesFromDb,
  attrVal
) => {
  //e.target.value gets the value of the attribute key selected in <select>
  if (e.target.value !== "Izaberite atribut") {
    var selectedAttr = attributesFromDb.find(
      (item) => item.key === e.target.value
    );
    let valuesForAttrKeys = attrVal.current;
    if (selectedAttr && selectedAttr.value.length > 0) {
      //clean up
      while (valuesForAttrKeys.options.length) {
        valuesForAttrKeys.remove(0);
      }
      valuesForAttrKeys.options.add(
        new Option("Izaberite vrijednost atributa")
      );
      //adding corresponding values
      selectedAttr.value.map((item) => {
        valuesForAttrKeys.add(new Option(item));
        return "";
      });
    }
  }
};

export const setAttributesTableWrapper = (key, val, setAttributesTable) => {
  setAttributesTable((attr) => {
    //if there are attributes in the attribute table
    if (attr.length !== 0) {
      //checking if the key already exists in the table
      var keyExistsInOldTable = false;
      let modifiedTable = attr.map((item) => {
        if (item.key === key) {
          keyExistsInOldTable = true;
          //changing the value that belongs to the existing key in table
          item.value = val;
          return item;
        } else {
          //return unmodified attribute to the table
          return item;
        }
      });
      //if the attribute was only changed
      if (keyExistsInOldTable) return [...modifiedTable];
      //if the attribute was added to the table
      else return [...modifiedTable, { key: key, value: val }];
    } else {
      //if there are no attributes in the attribute table
      return [{ key: key, value: val }];
    }
  });
};
