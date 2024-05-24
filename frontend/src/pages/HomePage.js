import CarouselComponent from "../components/Carousel";
import CardsLayout from "../components/CardsLayout";
import MetaComponent from "../components/MetaComponent";
import { useSelector } from "react-redux";
import axios from "axios";

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
        <CarouselComponent getBestsellers={getBestsellers} />
        <CardsLayout categories={categories} />
      </div>
    </div>
  );
}
