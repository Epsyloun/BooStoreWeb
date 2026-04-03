import { memo, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ProductElement from "../../components/generic/ProductElement";
import { CustomPagination } from "../../components/product/Pagination";

const ITEMS_PER_PAGE = 12;

export const ProductList = memo(({ productList }) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentProducts = productList.slice(startIndex, endIndex);

  return (
    <>
      <Grid container pb={2} spacing={2}>
        {currentProducts.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <ProductElement productInfo={product} />
          </Grid>
        ))}
      </Grid>

      <CustomPagination
        totalItems={productList.length}
        itemsPerPage={ITEMS_PER_PAGE}
        page={page}
        onChange={setPage}
      />
    </>
  );
});
