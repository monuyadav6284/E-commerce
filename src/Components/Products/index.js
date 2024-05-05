import {
  Card,
  List,
  Image,
  Typography,
  Badge,
  Rate,
  Button,
  message,
  Spin,
} from "antd";
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
    ( param?.categoryId
        ? getProductsByCategory(param.categoryId)
        : getAllProducts()
    ).then((res) => {
      setItems(res.products);
      setLoading1(false);
    });
  }, [param]);
  if (loading1) {
    return <div className="example">
      <Spin spinning  size="large"></Spin>;
    </div>
  }
  return (
    <div>
      <List
        grid={{ column: 3 }}
        renderItem={(products, index) => {
          return (
            <Badge.Ribbon
              className="itemCardBadge"
              text={products.discountPercentage}
              color="pink"
            >
              <Card
                className="itemCard"
                title={products.title}
                key={index}
                cover={
                  <Image className="itemCardImg" src={products.thumbnail} />
                }
                actions={[
                  <Rate value={products.rating} allowHalf disabled />,
                  <ADDToCartButton item={products} />,
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      ${products.price} {"  "}
                      <Typography.Text delete type="danger">
                        ${" "}
                        {parseFloat(
                          products.price +
                            (products.price * products.discountPercentage) / 100
                        ).toFixed(2)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                    >
                      {products.description}
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
              </Card>
            </Badge.Ribbon>
          );
        }}
        dataSource={items}
      ></List>
    </div>
  );
}

function ADDToCartButton({ item }) {
  const [loading, setLoading] = useState(false);
  const addProductsToCart = () => {
    setLoading(true);
    addToCart(item.id).then((res) => {
      message.success(`${item.title} has been added to cart!`);
      setLoading(false);
    });
  };
  return (
    <Button
      type="link"
      onClick={() => {
        addProductsToCart();
      }}
      loading={loading}
    >
      ADD to cart
    </Button>
  );
}

export default Products;
