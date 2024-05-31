import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Mainpage from './Components/pages/Dashboard';
import MainRoutes from './Components/routes';

function App() {
  const [data, setData] = useState([]);

  return (
    <div className="App">
        <MainRoutes/>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li> // change 'id' and 'name' to match your table's columns
        ))}
      </ul>
    </div>
  );
}

export default App;






