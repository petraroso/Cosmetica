import CarouselComponent from "../components/Carousel";
import CardsLayout from "../components/CardsLayout";
import MetaComponent from "../components/MetaComponent";
import { useSelector } from "react-redux";
import axios from "axios";
import Spinner from "../components/Spinner";

const getBestsellers = async () => {
  const { data } = await axios.get("/api/products/bestsellers");
  return data;
};

export default function HomePage() {
  const { categories } = useSelector((state) => state.getCategories);
  return (
    <div>
      <MetaComponent />
      <div>
        {categories ? (
          <>
            <CarouselComponent getBestsellers={getBestsellers} />
            <CardsLayout categories={categories} />
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
