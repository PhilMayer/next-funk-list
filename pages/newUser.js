import React from 'react';
import { connectToDatabase } from "../util/mongodb";

export default function newUser() {
    const [instrument, updateInstrument] = React.useState('');
    const [name, updateName] = React.useState('');

    const createProfile = (e) => {
        e.preventDefault();
        console.log(instrument);

    }
    
    return (
        <div>
            <div >
                <form className={styles.Form}>
                    <label>Name: </label>
                    <input onChange={(e) => updateName(e.target.value)}></input>
                    <br></br>
                    <label>Instrument: </label>
                    <input onChange={(e) => updateInstrument(e.target.value)}></input>
                    <br></br>
                    <button onClick={(e) => createProfile(e)}>Submit</button>
                </form>
            </div>
            
        </div>
    );
}
