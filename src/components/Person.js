import React from 'react';

const Person = (props) => (
  <tr>
    <td width="20%">{props.person.name}</td>
    <td width="20%">{props.person.number} </td>
    <td width="20%"><button onClick={props.deletePerson} value={props.person.id} width="20%">poista</button></td>
  </tr>
) 

export default Person;  