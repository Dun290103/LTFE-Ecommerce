import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductInfor from "./ProductInfor";
import { getDataProduct } from "../../services/apiService";

const DetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProduct();
  }, [id]);

  const getProduct = async () => {
    const res = await getDataProduct(id);

    if (res && res.data) {
      setProduct(res.data);
    }
  };

  return (
    <div className="detail-page-title">
      <h1>Sản phẩm</h1>
      {product && <ProductInfor product={product} />}
    </div>
  );
};
export default DetailPage;
