/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import './src/assets/sass/main.scss';
import React from 'react';
import Layout from '@components/Layout';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>
}