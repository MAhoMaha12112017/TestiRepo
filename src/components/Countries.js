import React from 'react';
import Country from './Country';

const Countries = (props) => {
  let countries = props.countries;
  let palautus = '';
  if (countries.length >= 10) {
    palautus = <div>too many matches, specify another filter</div>;
  } else if (countries.length === 1) {
    palautus = 
      <Country country={countries[0]} info="full" handleCountryClick={this.handleCountryClick}/>
  } else if (countries.length > 1) {
    palautus = 
      <div>
        {countries.map((country) => <Country key={country.name} country={country} handleCountryClick={props.handleCountryClick} />)}
      </div>
  } else {
    palautus = ''
  }
  
  return palautus;
}

export default Countries;