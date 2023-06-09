import React from 'react';
import Layout from '../components/Layout';

import '../styles/global.css'

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Layout>
      
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
