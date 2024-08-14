import React from 'react';
import { useLocation } from 'react-router-dom';

interface DashboardLocationState {
  userId: string;
  token: string;
  name: string;
  email: string;
  phone_number: number;
}

const Dashboard: React.FC = () => {
  const location = useLocation();
  const state = location.state as DashboardLocationState;

  if (!state) {
    return <div>Error: No state available</div>;
  }

  const { userId, token, name, email, phone_number} = state;

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>User ID: {userId}</p>
      <p>Token: {token}</p>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Phone Number: {phone_number}</p>
      {/* Your dashboard content */}
    </div>
  );
};

export default Dashboard;
