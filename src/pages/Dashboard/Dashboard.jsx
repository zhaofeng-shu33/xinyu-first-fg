import React, { Component, Suspense } from 'react';
import PageLoading from '../../components/PageLoading';

const ServiceCardBlock = React.lazy(() =>
  import('./components/ServiceCardBlock')
);


export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-page">
        <Suspense fallback={<PageLoading />}>
          <ServiceCardBlock />
        </Suspense>
      </div>
    );
  }
}
