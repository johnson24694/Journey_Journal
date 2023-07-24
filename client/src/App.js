import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Form from './views/form';
import Register from './components/Register';
import Login from './components/Login';
import ViewAllJournals from './components/ViewAllJournals';
import ViewOneJournal from './components/ViewOneJournal';
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
                  {/* <Route element={<ViewOneJournal/>} path="/journal/:id"/> */}
                </Routes>
          </BrowserRouter>
    </div>
  );
}
export default App;