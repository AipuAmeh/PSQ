
import './App.css'
import { useCookies } from 'react-cookie'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client'
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";

function App() {
const cookies = useCookies(['auth_token']);

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: cookies?.auth_token ? `Bearer ${cookies.auth_token}` : ""
  }
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

  return (
<ApolloProvider client={client}>
<main>
  <Outlet />
</main>
</ApolloProvider>
  )
}

export default App;
