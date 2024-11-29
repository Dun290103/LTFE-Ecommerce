import { useEffect, useState } from "react";
import ProductItems from "./ProductItems";
import React from "react";
import { Link } from "react-router-dom";
import { getAllCategories, getAllProducts } from "../../services/apiService";

function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState("All"); // Khai báo state currentCategory để lưu category hiện tại
  const productsPerPage = 12;

  useEffect(() => {
    fetchListProducts();
    fetchListCategories();
  }, []);

  const fetchListProducts = async () => {
    const res = await getAllProducts();

    if (res && res.data.length > 0) {
      setProducts(res.data);
    }
  };

  const fetchListCategories = async () => {
    const res = await getAllCategories();

    if (res && res.data.length > 0) {
      setCategories(res.data);
    }
  };

  //xử lý sự kiện thay đổi id phân loại
  const handleCategoryChange = (categoryId) => {
    setCurrentCategory(categoryId);
    setCurrentPage(1); // Reset lại trang hiện tại khi thay đổi category
  };
  //lọc sản phẩm theo phân loại
  const filteredProducts =
    currentCategory === "All"
      ? products
      : products.filter((product) => product.categoryId === currentCategory);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  let pageNumb;
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    pageNumb = pageNumber;
    //thêm scroll to top
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <h1 className="text-center">Product</h1>
      <hr />
      <div className="mb-3">
        <label htmlFor="categorySelect" className="form-label">
          Filter by Category:
        </label>
        <select
          id="categorySelect"
          className="form-select"
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="product-grid">
        {currentProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <li key={product.id} className="product-item">
              <img className="card-img-top" src={product.image_url} alt="Card" />
              <h2 className="productName fw-lighter fs-7 ">{product.name}</h2>
              <p className="productDes fw-bold fs-8">
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                  product.price
                )}
              </p>
              <p>{categories.find((cat) => cat.id === product.categoryId)?.name || "Unknown"}</p>
            </li>
          </Link>
        ))}
      </div>
      <ProductItems
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
        currentPage={currentPage}
        num={pageNumb}
      />
    </div>
  );
}
export default Product;
