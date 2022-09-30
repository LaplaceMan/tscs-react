export type Application = {
  vidoId: number;
  videoName: string;
  applyId: number;
  platformName: string;
  language: string;
  payNumber: string;
  payType: string;
  applicant: string;
  uploads: number;
  duration: number;
  deadline: number;
};

export type Subtitle = {
  subtitleId: number;
  videoName: string;
  applyId: number;
  platformName: string;
  language: string;
  support: number;
  against: number;
  maker: string;
  uploads: number;
  duration: number;
  deadline: number;
};

export type NavbarItem = {
  title: string;
  link: string;
  icon: React.ReactElement;
};

export type DashboardMiniItem = {
  label: string;
  number: number;
  change: number;
  bg: string;
  iconBg: string;
  icon: React.ReactElement;
};
