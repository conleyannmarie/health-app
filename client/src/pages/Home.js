import React from 'react';
import { useQuery } from '@apollo/client';
import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';


const Home = () => {
   const loggedIn = Auth.loggedIn();
   //? use useQuery hook to make query request
   const { loading, data } = useQuery(QUERY_THOUGHTS);

   // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
   const { data: userData } = useQuery(QUERY_ME_BASIC);

   //* we use 'optional chaining (?.)' (browser side ONLY) TO CHECK IF A PROPERTY IS NOT NULLish (null or undefined)
   //* EQUIVALENT: if(data.thoughts) {thoughts = data.thoughts} else { thoughts = []};
   const thoughts = data?.thoughts || [];
   console.log(thoughts);

   return (
      <main>
         <div className='flex-row justify-space-between'>
            {loggedIn && (
               <div className='col-12 mb-3'>
                  <ThoughtForm />
               </div>
            )}
            <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
               {loading ? (
                  <div>Loading...</div>
               ) : (
                  <ThoughtList thoughts={thoughts} title='Some Feed for Thought(s)...' />
               )}
           
               </div>
         
         </div>
      </main>
   );
};

export default Home;
