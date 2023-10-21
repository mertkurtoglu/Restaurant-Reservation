import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { MailOutlined, ShopOutlined, LogoutOutlined } from "@ant-design/icons";
import { Menu, message } from "antd";

const items = [
  {
    label: "Reservations",
    key: "reservations",
    icon: <MailOutlined />,
    path: "/reservations",
  },
  {
    label: "Restaurants",
    key: "restaurants",
    icon: <ShopOutlined />,
    path: "/restaurants",
  },
  {
    label: "Logout",
    key: "logout",
    icon: <LogoutOutlined />,
    path: "/logout", // You can set this path to your logout route
  },
];

const HeaderNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const findCurrentKeyByPath = (path) => {
    const matchedItem = items.find((item) => item.path === path);
    return matchedItem ? matchedItem.key : "dashboard";
  };

  const [current, setCurrent] = useState(findCurrentKeyByPath(location.pathname));

  useEffect(() => {
    setCurrent(findCurrentKeyByPath(location.pathname));
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success("Logout Successful");
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const onClick = (e) => {
    setCurrent(e.key);

    if (e.key === "logout") {
      handleLogout();
    }
  };

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
      {items.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.path}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default HeaderNav;
