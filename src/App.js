import { useState } from 'react';
import './App.css';
import { db } from './helpers/db';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(null);
  const [users, setUsers] = useState([]);

  const saveUser = async () => {
    try {
      const newUser = {
        name,
        email,
        age,
      }
      await db.collection('users').add(newUser);

    } catch(error){
      console.log(error);
    }
  }

  const showUsers = async () => {
    try {
      const snapshot = await db.collection('users').get();
      const docs = [];
      snapshot.forEach(doc =>{
        const id = doc.id;
        const data = doc.data();
        docs.push({id, ...data})
      })
      setUsers(docs);
      console.log(users);
    } catch(error){
      console.log(error);
    }
  }

  return (
    <div className="App">
      <input
      type='text'
      onChange={(e) => setName(e.target.value) }
      />
      <input
      type='email'
      onChange={(e) => setEmail(e.target.value) }
      />
      <input
      type='number'
      onChange={(e) => setAge(e.target.value) }
      />
      <button onClick={saveUser}>Save User</button>
      <button onClick={showUsers}>Show Users</button>
    </div>
  );
}

export default App;