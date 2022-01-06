import React, { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import Auth from "../utils/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import { QUERY_PROVIDERS_BY_SPEC, QUERY_GET_SPEC } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { ADD_APPT } from "../utils/mutations";

const ScheduleAppt = (props) => {
  const {search} = useLocation();
  const parameters = useMemo(() => new URLSearchParams(search), [search]);
  const {loading, error, data} = useQuery(QUERY_PROVIDERS_BY_SPEC, {
    variables: {specialty: parameters.get("specialty")}
  });

  const providers = useMemo(() => data ? [ ...data.providers_by_spec]:[], [data])
  const {data: specialtyData} = useQuery(QUERY_GET_SPEC)
  const specialties = useMemo(() => {
    return ([ ...new Set(specialtyData?.providers_by_spec.map(d => d.specialty))]);
  }, [specialtyData]);
  

  useEffect (() => {console.log(parameters.get("specialty"))}, [parameters]);

  

  return (
    <main>
      <h1>Schedule An Appointment</h1>
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Specialty
          </Dropdown.Toggle>

          <Dropdown.Menu className='specialtyList'>
          {specialties.length > 0 && specialties.map(specialty => <ul> <Link to = {`?specialty=${specialty}`} key={specialty}>{specialty}</Link></ul>)} 
          
          </Dropdown.Menu>
        </Dropdown>

        {/* type=date */}

        {/* <ul className="providerList">
          {providers.length > 0 && providers.map(provider => <li className="providers"><Link to = {`?provider=${provider._id}`} key={provider._id}>{provider.username}</Link></li>)}
        </ul> */}
        <table class="table table-primary table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialty</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
          {providers.length > 0 && providers.map(provider => 

            <tr>
              <td>{provider.username}</td>
              <td>{provider.specialty}</td>
              <td><Link to={`/providers?id=${provider._id}`}>Set an Appointment</Link></td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ScheduleAppt;

