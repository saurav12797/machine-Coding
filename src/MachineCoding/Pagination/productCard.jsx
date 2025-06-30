import "./style.css";

const ProductCard = ({ productData }) => {
  console.log({ productData });
  return (
    <div className="product-card" key={productData?.id}>
      {productData?.map((item, index) => {
        return (
          <div className="product-container" key={item?.id}>
            <p className="product-title">{item?.title}</p>
            <img src={item?.thumbnail} alt="Product Image" />
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;
