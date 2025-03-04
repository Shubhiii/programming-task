import React, { useEffect, useState } from 'react'
import './App.css'
import { User } from './types';
import { mockData } from './mockData';
import { tableHeaders } from './utils';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setUsers(mockData);
    };

    fetchData();
  }, []);

  const calculateDaysSince = (dateString: string): number => {
    const pastDate = new Date(dateString);
    const currentDate = new Date();
    return Math.floor((currentDate.getTime() - pastDate.getTime()) / (1000 * 60 * 60 * 24));
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <section className='main-content'>
      <h2>User Access Table</h2>

      <table>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header.key}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{formatDate(user.createDate)}</td>
              <td>{formatDate(user.passwordChangedDate)}</td>
              <td>{calculateDaysSince(user.passwordChangedDate)}</td>
              <td>{formatDate(user.lastAccessDate)}</td>
              <td>{calculateDaysSince(user.lastAccessDate)}</td>
              <td>{user.mfaEnabled ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default App
