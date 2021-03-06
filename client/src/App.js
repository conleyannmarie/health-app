import React from 'react';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import './App.css';

import Login from './pages/Login';
import Signup from './pages/Signup';
import SelectProvider from './pages/SelectProvider';
import Messages from './pages/Messages';
import Providers from './pages/Providers';
import Home from './pages/Home';

import Header from './components/Header';
import Footer from './components/Footer';
import SelectDate from './components/SelectDate';
import TimeAvailable from './components/TimeAvailable';

// const httpLink = createHttpLink({
//    uri: 'http://localhost:3001/graphql',
// });

const httpLink = createHttpLink({
   uri: '/graphql',
});

//* With the configuration of authLink, we use the setContext() function to retrieve the token from localStorage and
//* set the HTTP request headers of every request to include the token, whether the request needs it or not. This is
//* fine, because if the request doesn't need the token, our server-side resolver function won't check for it.
//*
//* We wont use the first parameter of setContext(), which stores the current request object in case this function
//* is running after we've initiated a request. Because we're not using the first parameter, but we still need to
//* access the second one, we can use an underscore _ to serve as a placeholder for the first parameter.
const authLink = setContext((_, { headers }) => {
   const token = localStorage.getItem('id_token');
   return {
      headers: {
         ...headers,
         authorization: token ? `Bearer ${token}` : '',
      },
   };
});

//* use ApolloClient() constructor to instantiate the Apollo Client and create the connection to the API endpoint
//*
//* link: authLink.concat(httpLink) - combine the authLink and httpLink objects so that every request retrieves the
//* token and sets the request headers before making the request to the API. With this in place, we
//* won't have to worry about doing this manually with every single request. It'll just do it for us.
const client = new ApolloClient({
   link: authLink.concat(httpLink),
   cache: new InMemoryCache(),
});

function App() {
   return (
      <ApolloProvider client={client}>
         <Router>
            <div className='flex-column justify-flex-start min-100-vh'>
               <Header />
               <div className='container'>
                  <Switch>
                     {/* <Route exact path='/createAppt' component={CreateAppt} /> */}
                     <Route exact path='/' component={Login} />
                     <Route exact path='/home' component={Home} />
                     <Route exact path='/login' component={Login} />
                     <Route exact path='/signup' component={Signup} />
                     <Route exact path='/selectdate/:provider/:specialty' component={SelectDate} />
                     <Route exact path='/timeavailable/:provider/:specialty/:date' component={TimeAvailable} />
                     <Route exact path='/selectprovider' component={SelectProvider} />
                     {/* <Route exact path='/messages' component={Messages}/> */}
                     <Route exact path='/providers' component={Providers} />
                  </Switch>
               </div>
               <Footer />
            </div>
         </Router>
      </ApolloProvider>
   );
}

export default App;
