import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = momentLocalizer(moment);


const ViewAllJournals = (props) => {

  const [journalList, setJournalList] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();
  const [selectedDate, setSelectedDate] = useState(null); // Add state to store the selected date

  // const [events, setEvents] = useState([
  //   {
  //     title: 'Event 1',
  //     start: new Date(2023, 6, 22, 10, 0), // July 22nd, 2023, 10:00 AM
  //     end: new Date(2023, 6, 22, 12, 0),   // July 22nd, 2023, 12:00 PM
  //   },
  //   // Add more events here
  // ]);
  // // const events = [
  //       {
  //         title: 'Event 1',
  //         start: new Date(2023, 6, 22, 10, 0), // July 22nd, 2023, 10:00 AM
  //         end: new Date(2023, 6, 22, 12, 0),   // July 22nd, 2023, 12:00 PM
  //       },
  //       // Add more events here
  //     ];


  // const handleEventClick = (event) => {
  //   // You can perform actions when an event is clicked
  //   console.log("Event clicked:", event);
  //   navigate('/journals/new')
  //   // For example, you can navigate to a new page or display event details in a modal.
  // };

  // const handleNavigate = (date, view) => {
  //   // Check if the view is 'day' and if a date is selected
  //   if (view === 'day' && date) {
  //     // Navigate to the JournalForm page with the selected date as a parameter
  //     navigate(`/journals/new?date=${encodeURIComponent(date)}`);
  //   }
  // };

  // const handleSelectSlot = ({ start }) => {
  //   setSelectedDate(start); // Update the selected date in the state
  //   navigate('/journals/new'); // Navigate to the JournalForm page
  // };

  const handleSelectSlot = ({ start }) => {
    const formattedDate = moment(start).format('YYYY-MM-DD'); // Format the selected date
    navigate(`/journals/new?date=${encodeURIComponent(formattedDate)}`);
  };
  

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/journals', { withCredentials: true })
      .then((res) => {
        const events = res.data.map((journal) => ({
          title: journal.feeling,
          start: new Date(journal.createdAt), // Convert the createdAt date to a Date object
          end: new Date(journal.createdAt), // For simplicity, setting end to the same as start
          notes: journal.notes,
        }));
        setJournalList(events);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const handleSlotSelect = (slotInfo) => {
  //   const newEvent = {
  //     title: 'New Event',
  //     start: slotInfo.start,
  //     end: slotInfo.end,
  //   };
  //   setEvents(prevEvents => [...prevEvents, newEvent]);
  // };

  // const handleDayClick = (date) => {
  //   // Redirect to a new page based on the clicked date
  //   navigate(`/journals/new/${date.toISOString()}`);
  // };
      // const handleNavigate = (date, view) => {
      //     navigate(`/journals/new`);
        
      // };
      // 
    
    
    // useEffect( () => {
    //     axios.get('http://localhost:8000/api/journals',{withCredentials: true})
    //     .then(res => {
    //         console.log(res.data);
            
    //         setJournalList(res.data)
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
      
    //   },[]
    // );

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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="myCustomHeight">
              <Calendar
              localizer={localizer}
              defaultView="month"
              defaultDate={new Date()}
              events={journalList}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 700, width:700 }}
              // onSelectEvent={handleEventClick}
              // onSelectSlot={handleSlotSelect}
              // selectable={true}
              // onNavigate={handleDayClick}
              // onNavigate={handleNavigate}
              selectable
              onSelectSlot={handleSelectSlot} // Call the function when a date is selected

              
              />
        </div>
        <div>
            <p> <a href="#" onClick={logout} class="nav-link" aria-current="page">Log Out</a></p>
        </div>
    </div>
    
  )
}

export default ViewAllJournals