import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ReadOutlined,
  EditOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("查看文章列表", "list", <ReadOutlined />),
  getItem("文章编辑", "edit", <EditOutlined />),
  getItem("修改资料", "means", <DatabaseOutlined />),
];

export default function Aside() {
  const navigate = useNavigate();
  const location = useLocation();
  const [defaultKey, setDefaultKey] = useState("");

  // 一般加个空数组就是为了模仿componentDidMounted
  useEffect(() => {
    let path = location.pathname;
    let key = path.split("/")[1];
    setDefaultKey(key);
  }, [location.pathname]);

  const handleClick = (e) => {
    navigate("/" + e.key);
    setDefaultKey(e.key);
    console.log("click ", e);
  };
  return (
    <Menu
      onClick={handleClick}
      style={{ width: 180 }}
      selectedKeys={[defaultKey]}
      defaultOpenKeys={["list"]}
      mode="inline"
      className="aside"
      theme="dark"
      items={items}
    ></Menu>
  );
}
