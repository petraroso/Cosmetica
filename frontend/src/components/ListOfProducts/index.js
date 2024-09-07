import styles from "./style.module.css";
import ProductCard from "../ProductCard";
//api calls should be inside useEffect
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import Spinner from "../Spinner";

export default function ListOfProducts({
  itemsPerPage,
  getProducts,
  sortOption,
  filters,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //right side is the default values when page is entered for the first time
  const { categoryName } = useParams() || "";
  const { searchQuery } = useParams() || "";

  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    getProducts(categoryName, searchQuery, filters, sortOption)
      .then((products) => {
        //console.log("Fetched products:", products);
        setProducts(products.products);
        setLoading(false);
      })
      .catch((er) => {
        console.log(er);
        setError(true);
      });
    //console.log("Category name:", categoryName);
  }, [getProducts, searchQuery, filters, sortOption, categoryName]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, products]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <h3 className={styles.loadingMessage}>
          Greška pri učitavanju proizvoda. Pokušajte ponovo kasnije.
        </h3>
      ) : (
        <>
          <div className={styles.cardLayout}>
            {currentItems.map((product) => (
              <ProductCard
                key={product._id}
                images={product.images}
                name={product.name}
                description={product.description}
                price={product.price}
                rating={product.rating}
                reviewsNumber={product.reviewsNumber}
                productId={product._id}
              />
            ))}
          </div>

          <ReactPaginate
            breakLabel="..."
            nextLabel={<BsFillArrowRightCircleFill />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<BsFillArrowLeftCircleFill />}
            renderOnZeroPageCount={null}
            containerClassName={styles.pagination}
            pageLinkClassName={styles.pageNum}
            previousLinkClassName={styles.pageNum}
            nextLinkClassName={styles.pageNum}
            activeLinkClassName={styles.active}
          />
        </>
      )}
    </>
  );
}
