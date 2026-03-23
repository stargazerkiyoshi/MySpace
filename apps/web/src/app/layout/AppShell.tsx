import {
  ApartmentOutlined,
  BarsOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NodeIndexOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Segmented, Space, Tag, Typography } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { pickMessage, sharedMessages } from "@/shared/i18n/shared.messages";
import { useAppShellStore } from "@/shared/state/app-shell.store";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";

const { Header, Sider, Content } = Layout;

const menuItems = [
  { key: "/dashboard", icon: <DashboardOutlined />, labelKey: "dashboard" },
  { key: "/spaces", icon: <ApartmentOutlined />, labelKey: "spaces" },
  { key: "/nodes", icon: <NodeIndexOutlined />, labelKey: "nodes" },
  { key: "/timeline", icon: <BarsOutlined />, labelKey: "timeline" },
] as const;

export function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const { collapsed, toggleCollapsed } = useAppShellStore();
  const { locale, setLocale } = useUiLocaleStore();
  const selectedKey =
    menuItems.find((item) => location.pathname.startsWith(item.key))?.key ??
    location.pathname;
  const shellMessages = sharedMessages.appShell;
  const translatedMenuItems = menuItems.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: pickMessage(shellMessages.menu[item.labelKey], locale),
  }));

  return (
    <Layout className="app-shell">
      <Sider
        breakpoint="lg"
        collapsed={collapsed}
        collapsedWidth={88}
        width={224}
        theme="light"
        className="app-shell__sider"
      >
        <div
          className={`app-shell__brand${collapsed ? " app-shell__brand--collapsed" : ""}`}
        >
          <Typography.Title level={3} className="app-shell__title">
            {collapsed ? "MS" : pickMessage(shellMessages.brandTitle, locale)}
          </Typography.Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={translatedMenuItems}
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
                {pickMessage(shellMessages.headerEyebrow, locale)}
              </Typography.Text>
              <Typography.Title level={4} className="app-shell__header-title">
                {translatedMenuItems.find((item) =>
                  location.pathname.startsWith(item.key),
                )?.label ?? pickMessage(shellMessages.workspace, locale)}
              </Typography.Title>
            </div>
          </Space>
          <Space size="middle">
            <Typography.Text className="app-shell__header-eyebrow">
              {pickMessage(shellMessages.localeLabel, locale)}
            </Typography.Text>
            <Segmented<"zh-CN" | "en">
              value={locale}
              options={[
                {
                  label: shellMessages.locales[locale]["zh-CN"],
                  value: "zh-CN",
                },
                {
                  label: shellMessages.locales[locale].en,
                  value: "en",
                },
              ]}
              onChange={(value) => setLocale(value)}
            />
            <Tag color="cyan">{pickMessage(shellMessages.statusTag, locale)}</Tag>
          </Space>
        </Header>
        <Content className="app-shell__content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
