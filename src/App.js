import React from 'react';
import 'antd/dist/reset.css'; 
import Analytics from './components/Analytics';
import ChatApp from './components/ChatApp';
const App = () => {

  return (
    <div className="App">
      <h1>Salary Dashboard</h1>
      <Analytics></Analytics>
      <h1>Chat App</h1>
      <ChatApp />
    </div>
  );
};

export default App;
