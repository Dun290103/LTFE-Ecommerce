const ProductItems = ({ productsPerPage, totalProducts, paginate, currentPage, num }) => {
    const pageNumbers = [];

    // Tạo mảng các số trang
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {/* Render các số trang */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <span className="page-link" onClick={() => currentPage > 1 && paginate(currentPage - 1)}>Previous</span>
                </li>
            {pageNumbers.map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                <a onClick={() => paginate(number)} href={num} className="page-link">
                    {number}
                </a>
            </li>
        ))}
        <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
            <span className="page-link" onClick={() => currentPage < pageNumbers.length && paginate(currentPage + 1)}>Next</span>
        </li>
            </ul>
        </nav>
    );
};
export default ProductItems;
