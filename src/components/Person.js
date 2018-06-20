import React from 'react';

const Person = ({person}) =>  <p key={person.name}>{person.name} {person.number}</p>

export default Person;