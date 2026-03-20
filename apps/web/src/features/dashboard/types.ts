export type DashboardCard = {
  title: string;
  description: string;
};

export type DashboardResponse = {
  module: string;
  status: string;
  metrics: unknown[];
};
