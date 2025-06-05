import {useEffect, useState} from "react";
import NewMeetingForm from "./NewMeetingForm";
import MeetingsList from "./MeetingsList";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MeetingsPage({username}) {
    const [meetings, setMeetings] = useState([]);
    const [addingNewMeeting, setAddingNewMeeting] = useState(false);




    useEffect(() => {
        const fetchMeetings = async () => {
            const response = await fetch(`/api/meetings`);
            if (response.ok) {
                const meetings = await response.json();
                setMeetings(meetings);
            }
        };

        fetchMeetings();

    }, []);

    async function handleNewMeeting(meeting) {
        const response = await fetch('/api/meetings', {
            method: 'POST',
            body: JSON.stringify(meeting),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const newMeeting = await response.json();
            const nextMeetings = [...meetings, newMeeting];
            setMeetings(nextMeetings);
            setAddingNewMeeting(false);
        }
    }

    async function handleDeleteMeeting(meeting) {
        const response = await fetch(`/api/meetings/${meeting.id}`, {
            method: 'DELETE',
        });

        if (response.ok){
            const nextMeetings = meetings.filter(m => m !== meeting);
            setMeetings(nextMeetings);
        } else {
            toast.error("Nie można usunąć spotkania, na liście wciąż są użytkownicy");
        }

    }

    async function handleJoinMeeting(meeting) {
        const response = await fetch(`/api/meetings/${meeting.id}/participants`, {
            method: 'POST',
            body: JSON.stringify({login : username}),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok){

        }
    }

    async function handleUnJoinMeeting(meeting) {
        const response = await fetch(`/api/meetings/${meeting.id}/participants`, {
            method: 'DELETE',
            body: JSON.stringify({login : username}),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok){
            console.log("deleted")
        }
    }

    return (
        <div>
            <h2>Zajęcia ({meetings.length})</h2>
            {
                addingNewMeeting
                    ? <NewMeetingForm onSubmit={(meeting) => handleNewMeeting(meeting)}/>
                    :
                    <button onClick={() => setAddingNewMeeting(true)}>Dodaj nowe spotkanie</button>
            }
            {meetings.length > 0 &&
                <MeetingsList meetings={meetings} username={username}
                              onDelete={handleDeleteMeeting} onJoin={handleJoinMeeting}
                              onUnJoin={handleUnJoinMeeting}/>}
            <ToastContainer position="top-right" autoClose={3000}/>

        </div>
    )
}
