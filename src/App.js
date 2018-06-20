import React from 'react';
import AddForm from './components/AddForm';
import Persons from './components/Persons';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filterText: ''
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data);
        this.setState({
          persons: response.data
        });
      });
  }

  handleNameChange = (e) => {  
    this.setState({
      newName: e.target.value
    });
  }

  handleNumberChange = (e) => {  
    this.setState({
      newNumber: e.target.value
    });
  }

  addPerson = (e) => {
    e.preventDefault();
    if (this.checkDuplicate(this.state.newName)) {
      return;
    }
    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber,
    };
    this.setState({
      persons: this.state.persons.concat(newPerson),
      newName: '',
      newNumber: '',
    });
  }

  checkDuplicate = (name) => {
    const duplicate = this.state.persons.filter((person) => person.name === name);
    return !!duplicate.length;
  }

  filterPersons = (e) => {
    this.setState({
      filterText: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <p>rajaa näytettäviä <input onChange={this.filterPersons}/></p>
        <AddForm 
          newName={this.state.newName} 
          newNumber={this.state.newNumber}
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange}
          addPerson={this.addPerson} 
        />
        <h2>Numerot</h2>
        <Persons persons={this.state.persons} filterText={this.state.filterText}/>
      </div>
    )
  }
}

export default App;
