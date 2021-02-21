import './App.css';
import { useState } from 'react';
import Axios from 'axios';
// import { response } from 'express';

function App() {

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [newName, setNewName] = useState('');

  const [employeeList, setEmployeeList] = useState([])

  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {name: name, age: age, country: country}).then(() => {
      console.log('success');
    });
  }

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      setEmployeeList(response.data);
    });
  }

  const updateEmployeeAge = (id) => {
    Axios.put('http://localhost:3001/update', {name: newName, id: id}).then((response) => {
      setEmployeeList(employeeList.map((val) => {
        return val.id === id ? {id: val.id, name: val.name, country: val.country, age: val.age} : val;
      }));
    });
  }

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(employeeList.filter((val) => {
        return val.id !== id;
      }))
    })
  }

  return (
    <div className='App'>
      <div className='infomation'>
        <label>Name:</label>
        <input type='text' onChange={(e) => {setName(e.target.value)}}></input>
        <label>Age:</label>
        <input type='number' onChange={(e) => {setAge(e.target.value)}}></input>
        <label>country:</label>
        <input type='text' onChange={(e) => {setCountry(e.target.value)}}></input>
        <button onClick={addEmployee}>Add</button>
      </div>
      <div className={'show'}>
        <button onClick={getEmployees}>Show</button>
        {employeeList.map((val, key) => {
          return (
            <div>
              <div>
              <h3>{val.name}</h3>
              <h3>{val.age}</h3>
              <h3>{val.country}</h3>
              </div>
              <div>
                {' '}
                <input type='text' placeholder='' onChange={(e) => {setNewName(e.target.value)}} />
                <button onClick={() => {updateEmployeeAge(val.id)}}>update</button>
                <button onClick={() => {deleteEmployee(val.id)}}>Delete</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
