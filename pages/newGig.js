import React from 'react';
import axios from 'axios';
import { getSession } from 'next-auth/client'


export default function newGig({session}) {
    const [gigName, updateGigName] = React.useState('');
    const [date, updateDate] = React.useState('');
    const [callTime, updateCallTime] = React.useState('');
    const [hitTime, updateHitTime] = React.useState('');
    const [venue, updateVenue] = React.useState('');
    const [description, updateDescription] = React.useState('');
    const [pay, updatePay] = React.useState(0);

    const createGig = async (e) => {
        e.preventDefault();
        await axios({
            url: '/api/gigs',
            method: 'POST',
            data: { 'gigName': gigName + date,
                    'displayName': gigName,
                    'createdBy': session.user.name, 
                    'date': date,
                    'callTime': callTime,
                    'hitTime': hitTime,
                    'venue': venue,
                    'description': description,
                    'pay': pay,
                    'status': 'tentative',
                'band': {
                    'trumpets': { 'confirmed': [], 'iffy': [], 'nope': []}, 
                    'trombones': { 'confirmed': [], 'iffy': [], 'nope': [] }, 
                    'tubas': { 'confirmed': [], 'iffy': [], 'nope': [] }, 
                    'saxes': { 'confirmed': [], 'iffy': [], 'nope': [] }, 
                    'vocals': { 'confirmed': [], 'iffy': [], 'nope': [] },
                    'drums': { 'confirmed': [], 'iffy': [], 'nope': [] }}
                   }
        }).then(response => {
            console.log(response.status)
        })
    }

    return (
        <div>
            <div >
                <form>
                    <label>GigName: </label>
                    <input onChange={(e) => updateGigName(e.target.value)}></input>
                    <br></br>
                    <label>Date: </label>
                    <input onChange={(e) => updateDate(e.target.value)}></input>
                    <br></br>
                    <label>Call Time: </label>
                    <input onChange={(e) => updateCallTime(e.target.value)}></input>
                    <br></br>
                    <label>Hit Time: </label>
                    <input onChange={(e) => updateHitTime(e.target.value)}></input>
                    <br></br>
                    <label>Venue: </label>
                    <input onChange={(e) => updateVenue(e.target.value)}></input>
                    <br></br>
                    <label>Description: </label>
                    <input onChange={(e) => updateDescription(e.target.value)}></input>
                    <br></br>
                    <label>Pay: </label>
                    <input onChange={(e) => updatePay(e.target.value)}></input>
                    <br></br>
                    <button onClick={(e) => createGig(e)}>Submit</button>
                </form>
            </div>

        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    console.log("SESSION:", session)

    return {
        props: {
            session
        },
    };
}