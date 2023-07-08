import Filters from "../components/Filters";
import ListOfProducts from "../components/ListOfProducts";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";

let filtersUrl = "";
const proceedFilters = (filters) => {
  filtersUrl = "";
  //constructing the part of the url that can be sent to the back-end
  //mapping through the keys of an object
  Object.keys(filters).map((key, index) => {
    if (key === "price") filtersUrl += `&price=${filters[key]}`;
    else if (key === "rating") {
      let rat = "";
      //ratings have additional keys if they are selected
      Object.keys(filters[key]).map((key2, index2) => {
        if (filters[key][key2]) rat += `${key2},`;
        //if no ratings are chosen
        return "";
      });
      filtersUrl += "&rating=" + rat;
    } else if (key === "category") {
      let cat = "";
      //categories have additional keys if they are selected
      Object.keys(filters[key]).map((key3, index3) => {
        if (filters[key][key3]) cat += `${key3},`;
        //if no categories are chosen
        return "";
      });
      filtersUrl += "&category=" + cat;
    }
    //if no filters are chosen
    return "";
  });
  return filtersUrl;
};

const getProducts = async (
  categoryName = "",
  searchQuery = "",
  filters = {},
  sortOption = ""
) => {
  //filtersUrl = "&price=60&rating=1,2,3&category=a,b,c,d";
  //console.log(filters);
  filtersUrl = proceedFilters(filters);
  const search = searchQuery ? `search/${searchQuery}/` : "";
  const category = categoryName ? `category/${categoryName}/` : "";
  const url = `/api/products/${category}${search}?${filtersUrl}&sort=${sortOption}`;
  const { data } = await axios.get(url);
  return data;
};

export default function ProductsListPage() {
  const [filters, setFilters] = useState({}); //collect all filters
  const [sortOption, setSortOption] = useState("");
  const { categories } = useSelector((state) => state.getCategories);

  return (
    <>
      <Filters
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <ListOfProducts
        itemsPerPage={6}
        getProducts={getProducts}
        sortOption={sortOption}
        filters={filters}
      />
    </>
  );
}
