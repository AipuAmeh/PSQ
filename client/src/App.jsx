
import './App.css'
import { useCookies,} from 'react-cookie'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client'
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import { Box } from '@chakra-ui/react';

function App() {
const [cookies] = useCookies(["auth_token"]);

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
  opts: {
    credentials: "include"
  }
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
     authorization: cookies?.auth_token ? `Bearer ${cookies.auth_token}` : ""  
  },
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

  return (
<ApolloProvider client={client}>
  <Box>
  <Header />
<Box>
  <Outlet />
</Box>
  </Box>
  <Footer />
</ApolloProvider>
  )
}

export default App;
