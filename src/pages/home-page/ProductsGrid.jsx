import Product from "./Product";

function ProductsGrid({ products, getCartData }) {
    return (
        <div className="products-grid">
            {products.map((product) => {
                return (
                    <Product key={product.id} product={product} getCartData={getCartData}/>
                );
            })}

        </div>
    );
}

export default ProductsGrid;