import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filterText: ''
    }
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
      number: this.state.newNumber
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
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange}/>
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
          {this.state.persons
            .filter((person) => person.name.indexOf(this.state.filterText) !== -1)
            .map((person) => <p key={person.name}>{person.name} {person.number}</p>)
          }
      </div>
    )
  }
}

export default App;
