import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Form from './views/form';
import Register from './components/Register';
import Login from './components/Login';
import ViewAllJournals from './components/ViewAllJournals';
import Update from './components/Update';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
                <Routes>
                  <Route element={<Login/>} path="/" default />
                  <Route element={<Register/>} path="/register"/>
                  <Route element={<Form/>} path="/journals/new"/>
                  <Route element={<ViewAllJournals/>} path="/journals/view"/>
                  <Route element={<Update/>} path="/journals/edit/:id"/>
                </Routes>
          </BrowserRouter>
    </div>
  );
}
export default App;