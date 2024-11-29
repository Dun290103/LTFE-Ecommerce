import axios from "../utils/axiosCustomize";

const getAllProducts = () => {
  return axios.get("api/products");
};

const getDataProduct = (id) => {
  return axios.get(`api/products/${id}`);
};

const getAllCategories = () => {
  return axios.get("api/categories");
};

export { getAllProducts, getDataProduct, getAllCategories };
