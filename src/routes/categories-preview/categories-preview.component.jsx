import { Fragment } from "react";
import { useSelector } from "react-redux";

import Spinner from "../../components/spinner/spinner.component";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { categories, isLoading } = useSelector((state) => state.category);

  return (
    <Fragment>
      { isLoading ? ( 
        <Spinner /> 
      ) : (
        Object.keys(categories).map(title => {
          const products = categories[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;