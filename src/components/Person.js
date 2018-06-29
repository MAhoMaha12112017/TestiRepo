import React from 'react';

// const Person = ({person, deletePerson}) =>  <p key={person.name}>{person.name} {person.number} <button onClick={deletePerson}>poista</button></p>
const Person = (props) => (
  <p key={props.person.name}>
    {props.person.name} {props.person.number}  
    <button onClick={props.deletePerson} value={props.person.id}>
      poista
    </button>
  </p>
) 

export default Person;