import { useState } from 'react';
import phoneService from './services/phone';
import { useEffect } from 'react';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [notificatiion, setNotification] = useState(null);

  useEffect(() => {
    phoneService.getAll().then((response) => setPersons(response));
  }, []);

  const checkDuplicate = () => {
    const nameDuplicate = persons.find((person) => person.name === newName);
    const phoneDuplicate = persons.find((person) => person.phone === newPhone);

    if (nameDuplicate) {
      window.confirm(
        `${newName} is already added to phonebook, update number with new one`
      ) &&
        phoneService
          .update(nameDuplicate.id, { name: newName, phone: newPhone })
          .then((response) =>
            setPersons(
              persons.map((person) =>
                person.id !== nameDuplicate.id ? person : response
              )
            )
          );
    } else if (phoneDuplicate) {
      alert(`${newPhone} is already added to phonebook`);
    }

    return nameDuplicate || phoneDuplicate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.name === '') {
      alert('You have to enter a name.');
    } else if (!checkDuplicate()) {
      const newPerson = {
        name: newName,
        phone: newPhone,
      };
      phoneService.create(newPerson).then((response) => {
        setNotification(`${newPerson.name} created`);
        return setPersons([...persons, response]);
      });
      setNewName('');
      setNewPhone('');
      setTimeout(() => {
        setNotification(null);
      }, 10000);
    }
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);
  const handleFilterChange = (e) => {
    const value = e.target.value;

    const filter = persons.filter((person) =>
      person.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );

    value !== '' ? setNewFilter(filter) : setNewFilter('');
    console.log(newFilter);
  };

  const personsToShow = newFilter !== '' ? newFilter : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificatiion} />
      <Filter onChange={handleFilterChange} />
      <h2>add new</h2>
      <form onSubmit={handleSubmit}>
        <AddForm text="name" onChange={handleNameChange} value={newName} />
        <AddForm text="phone" onChange={handlePhoneChange} value={newPhone} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>phones</h2>
      <Persons
        filter={personsToShow}
        setPersons={setPersons}
        persons={persons}
      />
    </div>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="notification">{message}</div>;
};

const Filter = ({ onChange }) => (
  <div>
    filter shown with: <input onChange={onChange} />
  </div>
);

const Persons = ({ filter, setPersons, persons }) => {
  const deleteEntry = (id, name) => {
    window.confirm(`Do you really want to delete ${name}?`) &&
      phoneService.deleteOne(id).then((response) => {
        setPersons(persons.filter((person) => person.id !== id));
      });
  };

  return (
    <ul>
      {filter.map((person, id) => (
        <li key={id}>
          {person.name} {person.phone}
          <button onClick={() => deleteEntry(person.id, person.name)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

const AddForm = ({ text, onChange, value }) => (
  <div>
    {text}: <input onChange={onChange} value={value} />
  </div>
);

export default App;
