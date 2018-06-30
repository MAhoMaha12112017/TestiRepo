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
            message: `muokattiin: ${person.name}`
          });
          setTimeout(() => {
            this.setState({message: null})
          }, 5000)
        }).catch(error => {
          this.setState({
             persons: this.state.persons.filter(p => p.name !== newPerson.name) ,
             message: `henkilö '${newPerson.name}' on jo valitettavasti poistettu palvelimelta`
          })
        })
    } else { 
      // new person added
      personService.create(newPerson)
      .then((person) => {
        this.setState({
          persons: this.state.persons.concat(person),
          newName: '',
          newNumber: '',
          message: `lisättiin: ${person.name}`
        });
        setTimeout(() => {
          this.setState({message: null})
        }, 5000)
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

      if (result) {
        personService.deletePerson(id)
          .then(() => {
            const filteredPersons = this.state.persons.filter((person) => person.id !== id);
            this.setState({
              persons: filteredPersons,
              message: `poistettiin: ${name}`
            });
            setTimeout(() => {
              this.setState({message: null})
            }, 5000)
          })
          .catch(error => {
            this.setState({
               persons: this.state.persons.filter(p => p.name !== name) ,
               message: `henkilö '${name}' on jo valitettavasti poistettu palvelimelta`
            })
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
