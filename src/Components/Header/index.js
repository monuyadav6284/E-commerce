import React, { useState, useEffect } from "react";
import { Menu, Badge, Drawer, Table, InputNumber  } from "antd";
import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Typography from "antd/es/typography/Typography";
import { getCart } from "../../API";


function AppHeader() {
  const navigate = useNavigate();
  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };
  return (
    <div className="aapHeader">
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
      <Typography.Title>Monu Store</Typography.Title>
      <AppCart />
    </div>
  );
}

function AppCart() {
  const [cardDrowerOpen, setCardDrowerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    getCart().then((res) => {
      setCartItems(res.products);
    });
  }, []);
  return (
    <>
      <Badge
        count={13}
        className="shopingCartIcon"
        onClick={() => {
          setCardDrowerOpen(true);
        }}
      >
        <ShoppingCartOutlined />
      </Badge>

      <Drawer
        open={cardDrowerOpen}
        onClose={() => {
          setCardDrowerOpen(false);
        }}
        title="your Cart"
       
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
              render: (value) => {
                return <span>${value}</span>;
              },
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              render: (value) => {
                return <InputNumber defaultValue={value}></InputNumber>;
              },
            },
            {
              title: "Total",
              dataIndex: "total",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
          ]}
          dataSource={cartItems}
        ></Table>
      </Drawer>
    </>
  );
}

export default AppHeader;
