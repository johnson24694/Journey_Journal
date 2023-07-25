import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

const JournalForm= (props) => {
    const {journal, setJournal, formattedDate} = props;
    const {id} = useParams();
    const [feeling, setFeeling] = useState("");
    const [notes, setNotes] = useState("");
    const [start, setStart] = useState( formattedDate);
    const [end, setEnd] = useState( formattedDate);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setStart(formattedDate);
        setEnd(formattedDate);
    }, [formattedDate]);

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
                            <input type="text" name="feeling" onChange = {(e)=>setFeeling(e.target.value)}/>
                            {errors.feeling ? <p style={{ color: 'red' }}>{errors.feeling.message}</p> : null}
                        </p>
                        <p>
                            <label>What notable events happened today? </label>
                            <input type="text" name="notes" onChange = {(e)=>setNotes(e.target.value)}/>
                            {errors.notes ? <p style={{ color: 'red' }}>{errors.notes.message}</p> : null}
                        </p>
                        <p>
                            <label>Started on: </label>
                            <input
                                type="datetime-local"
                                name= "start"
                                value={moment(start).format("YYYY-MM-DDTHH:mm")}
                                onChange={(e) => setStart(new Date(e.target.value))}
                            />
                        </p>
                        <p>
                            <label>Ended on: </label>
                            <input
                                type="datetime-local"
                                name="end"
                                value={moment(end).format("YYYY-MM-DDTHH:mm")}
                                onChange={(e) => setEnd(new Date(e.target.value))}
                            />
                        </p>
                    </div>
                    <input type="submit" onSubmit={(e)=>setJournal({feeling,notes,start,end})}/>
                </form>
            </div>
        )
}
export default JournalForm;

