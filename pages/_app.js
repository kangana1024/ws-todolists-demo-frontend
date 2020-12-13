import React from 'react';
import createApolloClient from '../src/helpers/apollo-client';
import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import '../styles/globals.css';
if (!process.env.GQL_WS_URL) {
  require("dotenv").config()
}
function MyApp({ Component, pageProps, apollo }) {
  return <ApolloProvider client={apollo}><Component {...pageProps} /></ApolloProvider>
}

export default withApollo(({ ctx, initialState }) => {
  return createApolloClient(initialState, ctx);
})(MyApp);
