import './App.css';
import { useState } from 'react';
import Axios from 'axios';
// import { response } from 'express';

function App() {

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');

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
          return <div key={key}>{val.name}</div>
        })}
      </div>
    </div>
  );
}

export default App;
