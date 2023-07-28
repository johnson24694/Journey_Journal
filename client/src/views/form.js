import React, { useState } from 'react'
import axios from 'axios';
import JournalForm from '../components/JournalForm';

const Form = (props) => {
    
    const [journal, setJournal] = useState([]);
    
    return (
        <div>
            <JournalForm journal={journal} setJournal={setJournal}/>
        </div>
    )
}
export default Form;