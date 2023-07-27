import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../styles.css'

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
            'http://localhost:8000/api/journal', /*feeling, notes, start, end, { withCredentials: true },*/
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
            // setJournal([...journal, res.data])
            navigate('/journals/view')
        })
        .catch((err)=> {
        console.log(err);
        // if(!err.response.data.verify){
        //     setErrors({loggedIn: 'You must be logged in to create a journal entry!'})
        // }
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
    });
}

        return (
            <div className="formPage">
                <div className='formContainer'>
                    
                    <form onSubmit={onSubmitHandler}>
                        <h1>Create New Journal Entry</h1>
                        <div>
                            <div className="q1">
                                <label>How are you feeling today? </label>
                                <input type="text" onChange = {(e)=>setFeeling(e.target.value)}/>
                                {errors.feeling ? <p>{errors.feeling.message}</p> : null}
                            </div>
                            <br/>
                            <div className="q2">
                                <label>What notable events happened today? </label>
                                <textarea rows="5" cols="33" onChange = {(e)=>setNotes(e.target.value)}/>
                                {errors.notes ? <p>{errors.notes.message}</p> : null}
                            </div>
                            <br/>
                            <div className='dates'>
                                <label>Started on: </label>
                                <input
                                    type="datetime-local"
                                    value={moment(start).format("YYYY-MM-DDTHH:mm")}
                                    onChange={(e) => setStart(new Date(e.target.value))}
                                />
                            <br/>
                                <label>Ended on: </label>
                                <input
                                    type="datetime-local"
                                    value={moment(end).format("YYYY-MM-DDTHH:mm")}
                                    onChange={(e) => setEnd(new Date(e.target.value))}
                                />
                            </div>
                        </div>
                        <br/>
                            <div style={{ textAlign: 'center'}} >
                                <input className='button' type="submit" onSubmit={(e)=>setJournal({feeling,notes,start,end})}/>
                            </div>
                    </form>
                    {/* {
                        errors.loggedIn?
                        <h1 style={{ textAlign: 'center'}}>{errors.loggedIn}</h1>: null
                    } */}
                </div>
            </div>
            )
}
export default JournalForm;

