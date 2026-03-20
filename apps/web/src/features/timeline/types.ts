export type TimelineCard = {
  title: string;
  description: string;
};

export type TimelineResponse = {
  module: string;
  status: string;
  items: unknown[];
};
