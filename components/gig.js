import axios from 'axios';

const Gig = ({gig, musicians}) => {
    
    const updateStatus = async (e) => {
        e.preventDefault();

        await axios({
            url: '/api/gigs/updateStatus',
            method: 'PUT',
            data: { 
                    'status': e.target.value, 
                    'gigName': gig.gigName,
                    'musicianName': 'Phil Mayer'
                }
        }).then(res => console.log(res.status))
    }
    return (
        <div>
            <h1>{gig.displayName}</h1>
            <button value="yep" onClick={e => updateStatus(e)}>Going</button>
            <button value="iffy" onClick={e => updateStatus(e)}>Iffy</button>
            <button value="nope" onClick={e => updateStatus(e)}>Nope</button>
            <p>Date: 12/31/2020</p>
            <p>Pay: ${gig.pay}</p>
            
            <h3>Band</h3>

            <h4>Trumpets</h4>
                {musicians.filter(musician => musician.instrument === 'trumpet').map(musician => 
                    <p style={musician.gigs[gig.gigName] === "nope" ? { color: 'red' } : { color: 'green' }}>
                        {musician.displayName}
                    </p>
                )}  
            <h4>Trombones</h4>
                {musicians.filter(musician => musician.instrument === 'trombone').map(musician =>
                    <p style={musician.gigs[gig.gigName] === "nope" ? {color:'red'} : {color:'green'}}>
                        {musician.displayName}
                    </p>
                )} 
            <h4>Saxophones</h4>
                {musicians.filter(musician => musician.instrument === 'Sax').map(musician =>
                    <p style={musician.gigs[gig.gigName] === "nope" ? { color: 'red' } : { color: 'green' }}>
                        {musician.displayName}
                    </p>
                )} 
        </div>
    )
}

export default Gig