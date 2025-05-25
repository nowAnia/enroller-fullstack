export default function MeetingsList({meetings,username, onDelete, onJoin, onUnJoin}) {
    return (
        <table>
            <thead>
            <tr>
                <th>Nazwa spotkania</th>
                <th>Opis</th>
                <th>Usuń</th>
                <th>Dołącz</th>
                <th>Odłącz</th>

            </tr>
            </thead>
            <tbody>
            {
                meetings.map((meeting, index) => <tr key={index}>
                    <td>{meeting.title}</td>
                    <td>{meeting.description}</td>
                    <td><button type="button" onClick={() => onDelete(meeting)}>Usuń</button></td>
                    <td><button type="button" onClick={() => onJoin(meeting)}>Dołącz</button></td>
                    <td><button type="button" onClick={() => onUnJoin(meeting)}>Odłącz</button></td>
                </tr>)
            }
            </tbody>
        </table>
    );
}
