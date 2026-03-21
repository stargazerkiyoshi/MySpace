import {
  ApartmentOutlined,
  BarsOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NodeIndexOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Space, Tag, Typography } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppShellStore } from "@/shared/state/app-shell.store";

const { Header, Sider, Content } = Layout;

const menuItems = [
  { key: "/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
  { key: "/spaces", icon: <ApartmentOutlined />, label: "Spaces" },
  { key: "/nodes", icon: <NodeIndexOutlined />, label: "Nodes" },
  { key: "/timeline", icon: <BarsOutlined />, label: "Timeline" },
];

export function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const { collapsed, toggleCollapsed } = useAppShellStore();
  const selectedKey =
    menuItems.find((item) => location.pathname.startsWith(item.key))?.key ??
    location.pathname;

  return (
    <Layout className="app-shell">
      <Sider
        breakpoint="lg"
        collapsed={collapsed}
        collapsedWidth={88}
        width={272}
        theme="light"
        className="app-shell__sider"
      >
        <div className="app-shell__brand">
          <Typography.Text className="app-shell__eyebrow">
            Space Collaboration
          </Typography.Text>
          <Typography.Title level={3} className="app-shell__title">
            MySpace MVP
          </Typography.Title>
          <Typography.Paragraph className="app-shell__description">
            工程壳层与后续业务能力的统一入口。
          </Typography.Paragraph>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          className="app-shell__menu"
        />
      </Sider>
      <Layout>
        <Header className="app-shell__header">
          <Space size="middle">
            <Button
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapsed}
            />
            <div>
              <Typography.Text className="app-shell__header-eyebrow">
                MVP Foundation
              </Typography.Text>
              <Typography.Title level={4} className="app-shell__header-title">
                {menuItems.find((item) => location.pathname.startsWith(item.key))
                  ?.label ?? "Workspace"}
              </Typography.Title>
            </div>
          </Space>
          <Tag color="cyan">Space Loop Ready</Tag>
        </Header>
        <Content className="app-shell__content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
