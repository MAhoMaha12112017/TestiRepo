import React from 'react';
import AddForm from './components/AddForm';
import Person from './components/Person';
import personService from './services/persons'; // includes axios

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
    // axios
    //   .get('http://localhost:3001/persons')
    personService.getAll()
      .then(persons => {
        this.setState({
          persons
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

    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber,
    };

    const duplicateID = this.checkDuplicate(this.state.newName);
    if (duplicateID) { // person exists

      // confirmation needed
      const confirmation = window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella?`);
      if (!confirmation) {
        return;
      }

      // old person updated
      personService.update(duplicateID, newPerson)
        .then((person) => {
          let personsCopy = [...this.state.persons];
          personsCopy = personsCopy.filter((person) => person.id !== duplicateID);

          this.setState({
            persons: personsCopy.concat(person),
            newName: '',
            newNumber: '',
          });
        });
    } else { 
      // new person added
      personService.create(newPerson)
      .then((person) => {
        this.setState({
          persons: this.state.persons.concat(person),
          newName: '',
          newNumber: '',
        });
      });
    }
  }

  checkDuplicate = (name) => {
    const duplicate = this.state.persons.filter((person) => person.name === name);
    if(duplicate.length > 0) {
      return duplicate[0].id;
    } else {
      return 0;
    }
  }

  filterPersons = (e) => {
    this.setState({
      filterText: e.target.value
    });
  }

  deletePerson = (id, name) => {
    return () => {
      const result = window.confirm(`Poistetaanko ${name}?`);
      console.log(id)
      if (result) {
        personService.deletePerson(id);
        const filteredPersons = this.state.persons.filter((person) => person.id !== id);
        this.setState({
          persons: filteredPersons
        });
      }
    }
  }

  addPersons = () => {
    return (
      <table>
        <tbody>
          {this.state.persons
            .filter((person) => person.name.indexOf(this.state.filterText) !== -1)
            .map((person) => <Person person={person} key={person.name} deletePerson={this.deletePerson(person.id, person.name)}/>)
          }
        </tbody>
      </table>
    )
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
        {this.addPersons()}
      </div>
    )
  }
}

export default App;
