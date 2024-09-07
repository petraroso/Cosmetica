import styles from "./style.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";

export default function CarouselComponent({ getBestsellers }) {
  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getBestsellers()
      .then((data) => {
        setBestsellers(data);
        setLoading(false);
      })
      .catch((er) => {
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        );
        setError(true);
      });
  }, [getBestsellers]);
  //if bestsellers.length>0 show carousel
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
          <div className={styles.carouselContainer}>
            <Carousel
              autoPlay
              infiniteLoop
              useKeyboardArrows
              dynamicHeight={true}
              interval={4500}
              transitionTime={2000}
              showStatus={false}
              showThumbs={false}
            >
              {bestsellers.map((item, idx) => (
                <Link
                  key={idx}
                  className={styles.link}
                  to={`/product-details/${item._id}/`}
                >
                  <div>
                    <img
                      crossOrigin="anonymous"
                      src={item.images ? item.images[0].path : null}
                      className={styles.image}
                      alt="carousel"
                    />
                    <div className={styles.legend}>
                      <h3>
                        Najprodavaniji proizvod iz kategorije {item.category}:
                      </h3>
                      <h3>{item.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </Carousel>
          </div>
        </>
      )}
    </>
  );
}
