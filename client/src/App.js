import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import JournalForm from './components/JournalForm';
import Register from './components/Register';
import Login from './components/Login';
import ViewAllJournals from './components/ViewAllJournals';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
                <Routes>
                  <Route element={<Login/>} path="/" default />
                  <Route element={<Register/>} path="/register"/>
                  <Route element={<JournalForm/>} path="/journals/new"/>
                  <Route element={<ViewAllJournals/>} path="/journals/view"/>
                  
                </Routes>
          </BrowserRouter>
    </div>
  );
}
export default App;