import React from 'react';
import Person from './Person';

const Persons = (props) => {
  return (
    <div>
      {props.persons
        .filter((person) => person.name.indexOf(props.filterText) !== -1)
        .map((person) => <Person person={person} />)
      }
    </div>
  );
}

export default Persons;