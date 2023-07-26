import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../styles.css'


const Update = (props) => {

    const{ removeFromDom, journal } = props;

    const {id} = useParams();
    const [feeling, setFeeling] = useState("");
    const [notes, setNotes] = useState("");
    const navigate = useNavigate();

    // Added this because the ':' in the value of the id was throwing off the axios requests
    const newId = id.substring(1,id.length);

    


    useEffect(() => {
        axios.get('http://localhost:8000/api/journal/' + newId)
            .then(res => {
                setFeeling(res.data.feeling);
                setNotes(res.data.notes);
            })
            .catch(err => console.log(err))
    }, [])

    const updateJournal = (e) => {
        e.preventDefault();
        axios.patch('http://localhost:8000/api/journals/' + newId, {
            feeling,    
            notes      
        })
            .then(res => {
                console.log(res);
                navigate("/journals/view"); 
            })
            .catch(err => console.log(err))
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
        <div className='updatePage'>
            <div className='updateContainer'>
                <form onSubmit={updateJournal}>
                <h1>Update Journal Entry</h1>
                        <div>
                            <div className='q1'>
                                <label>How are you feeling today? </label>
                                <input type="text" name = "feeling" value = {feeling} placeholder={feeling} onChange = {(e)=>setFeeling(e.target.value)}/>
                            </div>
                            <br/>
                            <div className='q2'>
                                <label>What notable events happened today? </label>
                                <textarea rows="5" cols="33" name = "notes" value = {notes} onChange = {(e)=>setNotes(e.target.value)}/>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center'}}>
                        <input type="submit"/>
                        <br/>
                        <button className='delete' onClick={(e)=>{deleteJournal()}}>Delete</button>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default Update