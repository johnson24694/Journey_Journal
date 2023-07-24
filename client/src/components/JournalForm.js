import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

const JournalForm= (props) => {
    const {journal, setJournal} = props;
    const [feeling, setFeeling] = useState("");
    const [notes, setNotes] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const formattedStart = moment(start).format("MM-DD-YYYY HH:mm:ss");
        const formattedEnd = moment(end).format("MM-DD-YYYY HH:mm:ss");
        axios.post(
            'http://localhost:8000/api/journal', 
            {
                feeling,
                notes,
                start: formattedStart,
                end: formattedEnd,
            }, 
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
        })
        .then(res=> {
            console.log(res);
            navigate('/journals/view')
        })
        .catch((err)=> {
        console.log(err);
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
    });
}

        return (
            <div>
                <form onSubmit={onSubmitHandler}>
                    <h1>Create New Journal Entry</h1>
                    <div>
                        <p>
                            <label>How are you feeling today? </label>
                            <input type="text" onChange = {(e)=>setFeeling(e.target.value)}/>
                            {errors.feeling ? <p>{errors.feeling.message}</p> : null}
                        </p>
                        <p>
                            <label>What notable events happened today? </label>
                            <input type="text" onChange = {(e)=>setNotes(e.target.value)}/>
                            {errors.notes ? <p>{errors.notes.message}</p> : null}
                        </p>
                        <p>
                            <label>Started on: </label>
                            <input
                                type="datetime-local"
                                value={moment(start).format("YYYY-MM-DDTHH:mm")}
                                onChange={(e) => setStart(new Date(e.target.value))}
                            />
                        </p>
                        <p>
                            <label>Ended on: </label>
                            <input
                                type="datetime-local"
                                value={moment(end).format("YYYY-MM-DDTHH:mm")}
                                onChange={(e) => setEnd(new Date(e.target.value))}
                            />
                        </p>
                    </div>

                    <input type="submit" onSubmit={(e)=>setJournal({feeling,notes,start,end})}  />
                </form>
            </div>
        )
}
export default JournalForm;

