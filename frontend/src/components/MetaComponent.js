import { Helmet, HelmetProvider } from "react-helmet-async";

export default function MetaComponent({
  title = "Cosmetica",
  description = "Najbolji web shop!",
}) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    </HelmetProvider>
  );
}
