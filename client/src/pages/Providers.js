import { useQuery } from '@apollo/client';
import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import {QUERY_USER_BY_ID} from '../utils/queries';

const Provider = () => {
    const {search} = useLocation();
    const parameters = useMemo(() => new URLSearchParams(search), [search]);

    
    const {loading, error, data} = useQuery(QUERY_USER_BY_ID, {
        variables: {id: parameters.get("id")}
    });

    useEffect(() => console.log(data), [data])

    return <div></div>;
} 

export default Provider;