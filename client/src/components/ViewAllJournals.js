import React from 'react'
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format } from 'date-fns';

const localizer = momentLocalizer(moment);


const ViewAllJournals = (props) => {

  const navigate = useNavigate();
    const events = [
        {
          title: 'Event 1',
          start: new Date(2023, 6, 22, 10, 0), // July 22nd, 2023, 10:00 AM
          end: new Date(2023, 6, 22, 12, 0),   // July 22nd, 2023, 12:00 PM
        },
        // Add more events here
      ];
      

    // const [journalList, setJournalList] = useState([]);
    // const navigate = useNavigate();
    // const {id} = useParams();


    // useEffect( () => {
    //     axios.get('http://localhost:8000/api/journals',{withCredentials: true})
    //     .then(res => {
    //         console.log(res);
            
    //         setJournalList(res.data)
    //     })},[]
    // )

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
    <div>
        <div className="myCustomHeight">
              <Calendar
              localizer={localizer}
              defaultView="month"
              defaultDate={new Date()}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 700, width:700 }}
              />
        </div>
        <div>
            <a href="#" onClick={logout} class="nav-link" aria-current="page">Log Out</a>
        </div>



    </div>
  )
}

export default ViewAllJournals