import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client'


export default function newGig({session}) {
    const [gigName, updateGigName] = React.useState('');
    const [date, updateDate] = React.useState('');
    const [callTime, updateCallTime] = React.useState('');
    const [hitTime, updateHitTime] = React.useState('');
    const [venue, updateVenue] = React.useState('');
    const [description, updateDescription] = React.useState('');
    const [pay, updatePay] = React.useState(0);

    const router = useRouter();

    const createGig = async (e) => {
        e.preventDefault();
        await axios({
            url: '/api/gigs',
            method: 'POST',
            data: { 'gigName': (gigName + date).replace(/\s+/g, ''),
                    'displayName': gigName,
                    'createdBy': session.user.name, 
                    'date': date,
                    'callTime': callTime,
                    'hitTime': hitTime,
                    'venue': venue,
                    'description': description,
                    'pay': pay,
                    'status': 'tentative'
                   }
        });

        router.push('/gigs');
    }

    return (
        <div>
            <h1>THE FUNKLIST</h1>
            <h3>NEW GIG</h3>
            <div >
                <form>
                    <label>Gig Name: </label>
                    <br></br>
                    <input onChange={(e) => updateGigName(e.target.value)}></input>
                    <br></br>
                    <label>Date: </label>
                    <br></br>
                    <input onChange={(e) => updateDate(e.target.value)}></input>
                    <br></br>
                    <label>Call Time: </label>
                    <br></br>
                    <input onChange={(e) => updateCallTime(e.target.value)}></input>
                    <br></br>
                    <label>Hit Time: </label>
                    <br></br>
                    <input onChange={(e) => updateHitTime(e.target.value)}></input>
                    <br></br>
                    <label>Venue: </label>
                    <br></br>
                    <input onChange={(e) => updateVenue(e.target.value)}></input>
                    <br></br>
                    <label>Pay: </label>
                    <br></br>
                    <input onChange={(e) => updatePay(e.target.value)}></input>
                    <br></br>
                    <label>Description: </label>
                    <br></br>
                    <textarea onChange={(e) => updateDescription(e.target.value)}></textarea>
                    <br></br>
                    <br></br>
                    <button onClick={(e) => createGig(e)}>Submit</button>
                </form>
            </div>

        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context)

    return {
        props: {
            session
        },
    };
}