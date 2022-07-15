import React, { useState, useEffect } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";

export default function Bread() {
  const [breadName, setBreadName] = useState(""); //数据变化时通知DOM更新
  const { pathname } = useLocation(); //获取路由路径
  //监听路由的路径
  useEffect(() => {
    switch (pathname) {
      case "/list":
        setBreadName("查看文章列表");
        break;
      case "/edit":
        setBreadName("文章编辑");
        break;
      case "/means":
        setBreadName("修改资料");
        break;
      default:
        setBreadName(pathname.includes("edit") ? "文字编辑" : "");
        break;
    }
  }, [pathname]);

  return (
    <div>
      <Breadcrumb style={{ height: "30px", lineHeight: "30px" }}>
        <Breadcrumb.Item href="/list">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>{breadName}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
