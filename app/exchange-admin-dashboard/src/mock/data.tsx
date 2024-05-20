import React from 'react';
import {
  GroupOutlined,
  Dashboard,
  Assessment,
  PeopleOutlineOutlined,
  DynamicFeedOutlined,
  AdsClickOutlined,
} from '@mui/icons-material';

export const links = [
  {
    index: 1,
    icon: <Dashboard />,
    label: 'Dashboard',
    nestedList: [],
    route: '/dashboard',
    permissions: ['CAN_MANAGE_ADMIN'],
  },
  {
    index: 2,
    icon: <Assessment />,
    label: 'Revenue Matrix',
    nestedList: [],
    route: '/revenue-matrix',
    permissions: ['CAN_MANAGE_ADMIN'],
  },
  {
    index: 3,
    icon: <Dashboard />,
    label: 'Specifications',
    nestedList: [],
    route: '/vendor-specs',
    permissions: ['CAN_VIEW_SPECS'],
  },
  {
    index: 4,
    icon: <Assessment />,
    label: 'Reports',
    permissions: ['CAN_MANAGE_ADMIN'],
    nestedList: [
      {
        index: 1,
        label: 'Outbound Client Ping/Post Analysis',
        icon: <Assessment />,
        route: '/reports/outbound-client-ping-post',
      },
      {
        index: 2,
        label: 'Inbound Ping/Post Analysis',
        icon: <GroupOutlined />,
        route: '/reports/inbound',
      },
      // {
      //   index: 3,
      //   label: 'List Leads',
      //   icon: <GroupOutlined />,
      //   route: '/reports/list-leads',
      // },
      // {
      //   index: 6,
      //   label: 'Outbound Ping/Post Analysis',
      //   icon: <GroupOutlined />,
      //   route: '/reports/outbound-ping-post-analysis',
      // },
      {
        index: 7,
        label: 'Returns Suite Analysis',
        icon: <GroupOutlined />,
        route: '/reports/returns-suite-analysis',
      },
      // {
      //   index: 8,
      //   label: 'Commissions',
      //   icon: <GroupOutlined />,
      //   route: '/reports/commissions',
      // },
    ],
  },
  {
    index: 5,
    icon: <Assessment />,
    label: 'Education Reports',
    permissions: ['CAN_MANAGE_ADMIN'],
    nestedList: [
      // {
      //   index: 1,
      //   label: 'Education Client Sales',
      //   icon: <Assessment />,
      //   route: '/education-reports/education-client-sales',
      // },
      {
        index: 2,
        label: 'All Search Report',
        icon: <Assessment />,
        route: '/education-reports/all-search-report',
      },
      {
        index: 2,
        label: 'All Result Report',
        icon: <Assessment />,
        route: '/education-reports/all-result-report',
      },
    ],
  },
  {
    index: 6,
    icon: <Assessment />,
    label: 'Education Campaigns',
    permissions: ['CAN_MANAGE_ADMIN'],
    nestedList: [
      {
        index: 1,
        label: 'All Education Campaigns',
        icon: <Assessment />,
        route: '/education-campaigns',
      }
    ],
  },
  {
    index: 7,
    label: 'Quality Control',
    icon: <AdsClickOutlined />,
    permissions: ['CAN_MANAGE_RETURNS'],
    nestedList: [
      {
        index: 1,
        label: 'Import Client Returns',
        icon: <DynamicFeedOutlined />,
        route: '/quality/import',
      },
    ],
  },
  {
    index: 8,
    label: 'Campaigns',
    icon: <DynamicFeedOutlined />,
    permissions: ['CAN_MANAGE_ADMIN'],
    nestedList: [
      {
        index: 1,
        label: 'All Campaigns',
        icon: <DynamicFeedOutlined />,
        route: '/campaigns',
      },
      {
        index: 2,
        label: 'Add New',
        icon: <DynamicFeedOutlined />,
        route: '/campaign',
      },
    ],
  },
  {
    index: 9,
    label: 'Users & Clients',
    icon: <PeopleOutlineOutlined />,
    permissions: ['CAN_MANAGE_ADMIN'],
    nestedList: [
      {
        index: 1,
        label: 'All Users',
        icon: <PeopleOutlineOutlined />,
        route: '/users',
      },
      {
        index: 2,
        label: 'Add New',
        icon: <PeopleOutlineOutlined />,
        route: '/user',
      },
    ],
  },
];
