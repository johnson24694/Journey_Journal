import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate} from "react-router-dom";

const JournalForm= (props) => {
    const {journal, setJournal} = props;
    const [feeling, setFeeling] = useState("");
    const [notes, setNotes] = useState("");
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post(
            'http://localhost:8000/api/journal', 
            {
                feeling,
                notes
            }, 
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
        })
        .then(res=> {
            console.log(res);
        })
        .catch(err=>console.log(err))
    }

        return (
            <div>
                <form onSubmit={onSubmitHandler}>
                    <h1>Create New Journal Entry</h1>
                    <div>
                        <p>
                            <label>How are you feeling today? </label>
                            <input type="text" onChange = {(e)=>setFeeling(e.target.value)}/>
                        </p>
                        <p>
                            <label>What notable things happened today? </label>
                            <input type="text" onChange = {(e)=>setNotes(e.target.value)}/>
                        </p>
                    </div>

                    <input type="submit" onSubmit={(e)=>setJournal({feeling,notes})}  />
                </form>
            </div>
        )
}
export default JournalForm;

