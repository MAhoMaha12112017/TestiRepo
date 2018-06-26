import React from 'react';

const Country = (props) => {

  if (props.info === "full") {
    return (
      <div>
        <h1 key={props.country.name}>{props.country.name}</h1>
        <p>capital: {props.country.capital}</p>
        <p>population: {props.country.population}</p>
        <p><img src={props.country.flag} alt="lippu" width="30%"/></p>
      </div>
    )
  } else {
    return (
      <p key={props.country.name} onClick={ () => alert('tehtävä 2.13* kesken') } >{props.country.name} </p>
    )
  }

}
export default Country;