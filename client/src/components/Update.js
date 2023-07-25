import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

const Update = (props) => {

    const{ removeFromDom, journal } = props;

    const {id} = useParams();
    const [feeling, setFeeling] = useState("");
    const [notes, setNotes] = useState("");
    const [start, setStart] = useState( new Date());
    const [end, setEnd] = useState( new Date());
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    // Added this because the ':' in the value of the id was throwing off the axios requests
    const newId = id.substring(1,id.length);

    useEffect(() => {
        axios.get('http://localhost:8000/api/journal/' + newId)
            
            .then(response => {
                setFeeling(response.data.feeling);
                setNotes(response.data.notes);
                setStart(new Date(response.data.start));
                setEnd(new Date(response.data.end));
            })
            .catch(err => console.log(err))
    }, []);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const formattedStart = moment(start).format("MM-DD-YYYY HH:mm:ss");
        const formattedEnd = moment(end).format("MM-DD-YYYY HH:mm:ss");
        axios.patch('http://localhost:8000/api/journals/' + newId, {
            feeling,    
            notes,
            start: formattedStart,
            end: formattedEnd,
        })
            .then((response) => {
                console.log(response);
                navigate("/journals/view"); 
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            });
    }

    const deleteJournal = () => {
        axios.delete('http://localhost:8000/api/journals/' + newId)
            .then(res => {
                console.log(res);
                navigate("/journals/view"); 
            })
            .catch(err => console.log(err))
        }

    return(
        <div>
            <form onSubmit={onSubmitHandler}>
            <h1>Update Journal Entry</h1>
                    <div>
                        <p>
                            <label>How are you feeling today? </label>
                            <input type="text" name = "feeling" value = {feeling} onChange = {(e)=>setFeeling(e.target.value)}/>
                            {errors.feeling ? <p style={{ color: 'red' }}>{errors.feeling.message}</p> : null}
                        </p>
                        <p>
                            <label>What notable events happened today? </label>
                            <input type="text" name = "notes" value = {notes} onChange = {(e)=>setNotes(e.target.value)}/>
                            {errors.notes ? <p style={{ color: 'red' }}>{errors.notes.message}</p> : null}
                        </p>
                        <p>
                            <label>Started on: </label>
                            <input
                                type="datetime-local"
                                name = "start"
                                value={moment(start).format("YYYY-MM-DDTHH:mm")}
                                onChange={(e) => setStart(new Date(e.target.value))}
                            />
                        </p>
                        <p>
                            <label>Ended on: </label>
                            <input
                                type="datetime-local"
                                name= "end"
                                value={moment(end).format("YYYY-MM-DDTHH:mm")}
                                onChange={(e) => setEnd(new Date(e.target.value))}
                            />
                        </p>
                    </div>
                    <input type="submit"/>
                    <hr></hr>
                    <button onClick={(e)=>{deleteJournal()}}>Delete</button>
            </form>
        </div>
    )
}

export default Update