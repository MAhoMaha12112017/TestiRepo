import React from 'react';

const Kurssi = ({kurssi}) => {
  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
}

const Otsikko = (props) => {
  return (
    <h1>{props.kurssi}</h1>
  );
} 

const Sisalto = ({osat}) => {
  return (
    <div>
      {osat.map((osa) => <Osa osa={osa.nimi} tehtavia={osa.tehtavia} key={osa.id}/>)}
    </div>
  )
} 

const Osa = (props) => {
  return (
    <p>{props.osa} {props.tehtavia}</p>
  )
}

const Yhteensa = ({osat}) => {
  return (
    <p>yhteensä<span> </span>
      {osat.reduce((sum, osa) => sum + osa.tehtavia
      , 0)} 
      <span> </span>tehtävää</p>
  )
}

export default Kurssi;