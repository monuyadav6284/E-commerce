import { Card, Typography, Badge, Rate, Button, message, Spin, Col, Row } from "antd";
import { getAllProducts } from "../../API";
import { useState, useEffect } from "react";
import { addToCart, getProductsByCategory } from "../../API";
import { useParams } from "react-router-dom";

function Products() {
  const [loading1, setLoading1] = useState(false);
  const param = useParams();
  const [items, setItems] = useState();

  useEffect(() => {
    setLoading1(true);
    (param?.categoryId ? getProductsByCategory(param.categoryId) : getAllProducts())
      .then((res) => {
        setItems(res.products);
        setLoading1(false);
      });
  }, [param]);

  if (loading1) {
    return (
      <div className="example">
        <Spin spinning size="large" />
      </div>
    );
  }

  return (
    <Row gutter={[16, 16]} justify="start">
      {items &&
        items.map((product, index) => (
          <Col key={index} xs={24} sm={24} md={12} lg={8} xl={8}>
            <ProductCard product={product} />
          </Col>
        ))}
    </Row>
  );
}

function ProductCard({ product }) {
  const addProductsToCart = () => {
    addToCart(product.id).then((res) => {
      message.success(`${product.title} has been added to cart!`);
    });
  };

  return (
    <Badge.Ribbon className="itemCardBadge" text={`${product.discountPercentage}% Off`} color="pink">
      <Card
        className="itemCard"
        title={product.title}
        cover={<img className="itemCardImg" src={product.thumbnail} alt={product.title} />}
        actions={[
          <Rate value={product.rating} allowHalf disabled />,
          <Button type="link" onClick={addProductsToCart}>ADD to cart</Button>,
        ]}
      >
        <Card.Meta
          title={
            <Typography.Paragraph>
              ${product.price}{"  "}
              <Typography.Text delete type="danger">
                ${parseFloat(product.price + (product.price * product.discountPercentage) / 100).toFixed(2)}
              </Typography.Text>
            </Typography.Paragraph>
          }
          description={
            <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>
              {product.description}
            </Typography.Paragraph>
          }
        />
      </Card>
    </Badge.Ribbon>
  );
}

export default Products;
