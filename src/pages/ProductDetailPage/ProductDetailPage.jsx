import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addProductToCart } from "@redux/reducers/cart/cartThunks";

import useFetch from "@hooks/useFetch";

import LoadingThumbnail from "@components/LoadingThumbnail";
import Button from "@components/Button";
import Divider from "@components/Divider";
import PageLoader from "@components/PageLoader";
import PageErrorResult from "@components/PageErrorResult";

import { REQUEST_METHOD, FETCH_STATUS, API_SERVER } from "../../constants";

import styles from "./ProductDetailPage.module";

function ProductDetailPage() {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const {
    fetch: getProductDetail,
    data: productDetail,
    status: getProductDetailStatus,
    error: getProductDetailError,
  } = useFetch({
    method: REQUEST_METHOD.GET,
    url: `${API_SERVER.BASE_URL}${API_SERVER.PATH.PRODUCTS}/${productId}`,
  });

  const handleAddToCartButtonClick = () => {
    dispatch(addProductToCart({ productId, quantity: 1 }));
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  if (getProductDetailStatus === FETCH_STATUS.PENDING) return <PageLoader />;
  if (getProductDetailStatus === FETCH_STATUS.FAIL)
    return <PageErrorResult errorMessage={getProductDetailError.message} />;

  const { name, price, thumbnailImage } = productDetail;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <LoadingThumbnail
          src={thumbnailImage.url}
          alt={thumbnailImage.alt}
          minHeight={300}
        />
        <p className={styles.productName}>{name}</p>
      </div>
      <Divider />
      <div className={styles.bottom}>
        <span className={styles.productPriceText}>금액</span>
        <p className={styles.productPrice}>{price.toLocaleString()}원</p>
      </div>
      <Button variant="primary" block onClick={handleAddToCartButtonClick}>
        장바구니 담기
      </Button>
    </div>
  );
}

export default ProductDetailPage;
