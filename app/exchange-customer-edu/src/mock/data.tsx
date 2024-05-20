import {
  GroupOutlined,
  OnlinePrediction,
  DescriptionOutlined,
  SettingsOutlined,
} from '@mui/icons-material';

export const profileData = {
  image: '/assets/images/logo2.png',
  name: 'Welcome, Lead Vendor',
  userId: '112543',
  data: [
    { name: 'Net Earnings', value: '$5,145' },
    { name: 'Active Lead Campaigns', value: '8' },
    { name: 'Leads Sold Today', value: '48' },
  ],
};

export const costData = [
  {
    heading: 'Per Lead Revenue',
    subHeading: 'Average revenue per lead in past 30 days',
    percentage: 75,
    value: '$55',
  },
  {
    heading: 'Total Leads Sold',
    subHeading: 'Sold in past 30 days compared to total leads sold',
    value: '243',
    percentage: 50,
    color: '#2DD4BF',
  },
  {
    heading: 'Total Revenue',
    subHeading: 'Total revenue generated in past 30 days',
    value: '$2755',
    percentage: 75,
    color: '#FBBF24',
  },
  {
    heading: 'Total Returns',
    subHeading: 'Number of leads returned in last 30 days',
    value: '8',
    percentage: 4,
    color: '#F43F5E',
  },
];

export const links = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    isActive:
      window.location.href.includes('/dashboard') ||
      window.location.href.includes('/'),
  },
  {
    name: 'All Leads',
    icon: <GroupOutlined />,
    isActive: false,
  },
  {
    name: 'Campaigns',
    icon: <OnlinePrediction />,
    isActive: false,
  },
  {
    name: 'Billing',
    icon: <DescriptionOutlined />,
    isActive: false,
  },
  {
    name: 'Settings',
    icon: <SettingsOutlined />,
    isActive: false,
  },
];
