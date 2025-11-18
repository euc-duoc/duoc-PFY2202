import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

async function enableMocking() {
    if(process.env.NODE_ENV != 'development')
        return;

    const { worker } = await import('./mocks/browser');
    return worker.start();
}

const client = new ApolloClient({
  link: new HttpLink({ uri: "/graphql" }),
  cache: new InMemoryCache()
});

enableMocking().then(() => {
    createRoot(document.getElementById('root')).render(      
      <Router>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Router>
    )
});