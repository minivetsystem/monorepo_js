import React from 'react';
import { Routes, Route } from 'react-router-dom';
import * as Pages from './pages/index';
import { Layout } from './components';
import { PrivateRoute } from './components/common/PrivateRoute';

export const RouteManager = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Pages.Login />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <PrivateRoute component={Pages.Dashboard} />
            </Layout>
          }
        />
        <Route
          path="/users"
          element={
            <Layout>
              <PrivateRoute component={Pages.Users} />
            </Layout>
          }
        />
        <Route
          path="/user/:user_id?"
          element={
            <Layout>
              <PrivateRoute component={Pages.User} />
            </Layout>
          }
        />
        <Route
          path="/campaigns"
          element={
            <Layout>
              <PrivateRoute component={Pages.Campaigns} />
            </Layout>
          }
        />
        <Route
          path="/campaign/:campaign_id?"
          element={
            <Layout>
              <PrivateRoute component={Pages.Campaign} />
            </Layout>
          }
        />
        <Route
          path="/vendor-specs"
          element={
            <Layout>
              <PrivateRoute component={Pages.VendorSpecs} />
            </Layout>
          }
        />
        <Route
          path="/reports/outbound-client-ping-post"
          element={
            <Layout>
              <PrivateRoute component={Pages.OutboundClientPingPostAnalysis} />
            </Layout>
          }
        />
        <Route
          path="/reports/outbound-details"
          element={
            <Layout>
              <PrivateRoute
                component={Pages.OutboundClientPingPostAnalysisDetails}
              />
            </Layout>
          }
        />
        <Route
          path="/reports/outbound-ping-post"
          element={
            <Layout>
              <PrivateRoute component={Pages.OutboundPingPostAnalysis} />
            </Layout>
          }
        />
        <Route
          path="/reports/inbound"
          element={
            <Layout>
              <PrivateRoute component={Pages.InboundPingPostAnalysis} />
            </Layout>
          }
        />
         <Route
          path="/education-reports/education-client-sales"
          element={
            <Layout>
              <PrivateRoute component={Pages.EducationClientSales} />
            </Layout>
          }
        />
        <Route
          path="/education-reports/all-search-report"
          element={
            <Layout>
              <PrivateRoute component={Pages.AllSearchReport} />
            </Layout>
          }
        />
         <Route
          path="/education-reports/all-result-report"
          element={
            <Layout>
              <PrivateRoute component={Pages.AllResultReport} />
            </Layout>
          }
        />
        <Route
          path="/education-campaigns"
          element={
            <Layout>
              <PrivateRoute component={Pages.EducationCampaigns} />
            </Layout>
          }
        />
        <Route
          path="/revenue-matrix"
          element={
            <Layout>
              <PrivateRoute component={Pages.RevenueMatrix} />
            </Layout>
          }
        />
        <Route
          path="/reports/list-leads"
          element={
            <Layout>
              <PrivateRoute component={Pages.ListLeads} />
            </Layout>
          }
        />
        <Route
          path="/reports/outbound-ping-post-analysis"
          element={
            <Layout>
              <PrivateRoute component={Pages.OutboundPingPostAnalysisReport} />
            </Layout>
          }
        />
        <Route
          path="/reports/returns-suite-analysis"
          element={
            <Layout>
              <PrivateRoute component={Pages.ReturnsSuiteAnalysis} />
            </Layout>
          }
        />
        <Route
          path="/reports/inbound-sub-report"
          element={
            <Layout>
              <PrivateRoute component={Pages.InboundPingPostSubAnalysis} />
            </Layout>
          }
        />
        <Route
          path="/reports/inbound-details"
          element={
            <Layout>
              <PrivateRoute component={Pages.InboundPingPostAnalysisDetails} />
            </Layout>
          }
        />
        <Route
          path="/quality/import"
          element={
            <Layout>
              <PrivateRoute component={Pages.ImportReturns} />
            </Layout>
          }
        />
        <Route
          path="/reports/commissions"
          element={
            <Layout>
              <PrivateRoute component={Pages.CommissionsReport} />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
};
