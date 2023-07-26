import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const ViewAllJournals = (props) => {
  const [journalList, setJournalList] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();
  const location = useLocation();
  
  const handleSelectSlot = ({ start }) => {
    const formattedDate = moment(start).format('YYYY-MM-DD');
    navigate(`/journals/new?date=${encodeURIComponent(formattedDate)}`);
  };

  const handleEventClick = (event) => {
    console.log("Event clicked:", event);
    navigate(`/journals/edit/:${event.id}`);
  };
  

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/journals', { withCredentials: true })
      .then((res) => {
        const events = res.data.map((journal) => ({
          id: journal._id,
          title: journal.feeling,
          start: new Date(journal.start),
          end: new Date(journal.end),
          notes: journal.notes,
        }));
        setJournalList(events);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

    console.log(journalList);

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
            .then(res => {
                navigate('/')
                console.log('User is logged out')
            })
            .catch(err => {
                console.log(err);
            })
    }
    
  return (
    <div className="calanderPage">
        <div className="logout">
            <p> <a href="#" onClick={logout} class="nav-link" aria-current="page">Log Out</a></p>
        </div>
        <div className="calanderContainer">
              <Calendar
              localizer={localizer}
              defaultView="month"
              defaultDate={new Date()}
              events={journalList}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 700, width:700 }}
              onSelectEvent={handleEventClick}
              selectable = 'true'
              onSelectSlot={handleSelectSlot}
              />
        </div>
        <br/>
    </div>
    
  )
}

export default ViewAllJournals