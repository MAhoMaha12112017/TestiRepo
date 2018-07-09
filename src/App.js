import React from 'react';
import AddForm from './components/AddForm';
import Person from './components/Person';
import personService from './services/persons'; // includes axios
import Notification from './components/Notification';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filterText: '',
      message: null
    }
  }

  componentDidMount() {
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

  handleSearchChange = (e) => {
    this.setState({
      filterText: e.target.value
    });
  }

  notify = (message) => {
    this.setState({ message })
    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
  }

  addPerson = (e) => {
    e.preventDefault();

    const personToAdd = {
      name: this.state.newName,
      number: this.state.newNumber,
    };

    // check if person exists or not
    const duplicateID = this.checkDuplicate(this.state.newName);
    if (duplicateID) { // person exists

      // confirmation needed for update
      const confirmation = window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella?`);
      if (!confirmation) {
        return;
      }
      // old person updated
      this.updatePerson(duplicateID, personToAdd)

    } else { 
      // new person added
      this.createPerson(personToAdd);
    }
  }

  // old person updated
  updatePerson = (duplicateID, personToAdd) => {
    personService.update(duplicateID, personToAdd)
    .then((person) => { 
      this.setState({
        persons: this.state.persons.map(person => person.id !== duplicateID ? person : personToAdd ),
        newName: '',
        newNumber: '',
      });
      this.notify(`muokattiin: ${person.name}`);
    }).catch(error => {
      this.setState({
         persons: this.state.persons.filter(p => p.name !== personToAdd.name) ,
      });
      this.notify(`henkilö '${personToAdd.name}' on jo valitettavasti poistettu palvelimelta`);
    })
  }
  
  // new person added
  createPerson = (personToAdd) => {
    personService.create(personToAdd)
    .then((person) => {
      this.setState({
        persons: this.state.persons.concat(person),
        newName: '',
        newNumber: '',
      });
      this.notify(`lisättiin: ${person.name}`);
    });
  }


  checkDuplicate = (name) => {
    const duplicatePerson = this.state.persons.find((person) => person.name === name);
    if(duplicatePerson) {
      return duplicatePerson.id;
    } else {
      return 0; // not found, return 0
    }
  }

  deletePerson = (id, name) => {
    return () => {
      const result = window.confirm(`Poistetaanko ${name}?`);

      if (result) {
        personService
        .deletePerson(id)
          .then(() => {
            const filteredPersons = this.state.persons.filter((person) => person.id !== id);
            this.setState({
              persons: filteredPersons,
            });
            this.notify(`poistettiin: ${name}`);
          })
          .catch(error => {
            this.setState({
               persons: this.state.persons.filter(p => p.name !== name) ,
            });
            this.notify(`henkilö '${name}' on jo valitettavasti poistettu palvelimelta`);
          })
      }
    }
  }

  addPersons = () => {
    return (
      <table>
        <tbody>
          {this.state.persons
            .filter((person) => person.name.toLowerCase().indexOf(this.state.filterText.toLowerCase()) !== -1)
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
        <Notification message={this.state.message} />
        <p>rajaa näytettäviä <input onChange={this.handleSearchChange}/></p>
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
