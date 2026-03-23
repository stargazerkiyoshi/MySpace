import { ConfigProvider, theme } from "antd";
import { AppProviders } from "./providers/AppProviders";
import { AppRouter } from "./router";

export function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#2f5b8a",
          borderRadius: 14,
          fontFamily:
            "'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif",
          colorBgLayout: "#f4f1eb",
          colorBgContainer: "#fcfbf8",
          colorBorder: "#ddd6cb",
          colorText: "#1f2937",
          colorTextSecondary: "#6b7280",
        },
      }}
    >
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ConfigProvider>
  );
}
