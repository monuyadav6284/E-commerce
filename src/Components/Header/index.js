import React, { useState, useEffect } from "react";
import {
  Menu,
  Badge,
  Drawer,
  Table,
  InputNumber,
  Row,
  Col,
  Typography,
} from "antd";
import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../API";

function AppHeader() {
  const navigate = useNavigate();

  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };

  return (
    <div className="appHeader">
      <Row justify="space-between" align="middle">
        <Col>
          <Menu
            className="appMenu"
            onClick={onMenuClick}
            mode="horizontal"
            items={[
              {
                label: <HomeFilled />,
                key: "",
              },
              {
                label: "Men",
                key: "men",
                children: [
                  {
                    label: "Men's Shirts",
                    key: "mens-shirts",
                  },
                  {
                    label: "Men's Shoes",
                    key: "mens-shoes",
                  },
                  {
                    label: "Men's Watches",
                    key: "mens-watches",
                  },
                ],
              },
              {
                label: "Women",
                key: "women",
                children: [
                  {
                    label: "Women's Dresses",
                    key: "womens-dresses",
                  },
                  {
                    label: "Women's Shoes",
                    key: "womens-shoes",
                  },
                  {
                    label: "Women's Watches",
                    key: "womens-watches",
                  },
                  {
                    label: "Women's Bags",
                    key: "womens-bags",
                  },
                  {
                    label: "Women's Jewellery",
                    key: "womens-jewellery",
                  },
                ],
              },
              {
                label: "Fragrances",
                key: "fragrances",
              },
            ]}
          />
        </Col>
        <Col>
          <Typography.Title level={3}>Monu Store</Typography.Title>
        </Col>
        <Col>
          <AppCart />
        </Col>
      </Row>
    </div>
  );
}

function AppCart() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCart().then((res) => {
      setCartItems(res.products);
    });
  }, []);

  return (
    <>
      <Badge
        count={cartItems.length}
        className="shoppingCartIcon"
        onClick={() => setCartDrawerOpen(true)}
      >
        <ShoppingCartOutlined />
      </Badge>

      <Drawer
        placement="right"
        width={300}
        onClose={() => setCartDrawerOpen(false)}
        visible={cartDrawerOpen}
        title="Your Cart"
      >
        <Table
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => <span>${value}</span>,
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              render: (value, record) => (
                <InputNumber
                  defaultValue={value}
                  min={1}
                  max={record.maxQuantity} // Assuming 'maxQuantity' property in 'record' for limiting quantity
                />
              ),
            },
            {
              title: "Total",
              dataIndex: "total",
              render: (value) => <span>${value}</span>,
            },
          ]}
          dataSource={cartItems}
          pagination={false}
        />
      </Drawer>
    </>
  );
}

export default AppHeader;
