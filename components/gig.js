import axios from 'axios';
import { useRouter } from 'next/router';

const Gig = ({ gig, musicians, username }) => {
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    }
    
    const updateStatus = async (e) => {
        e.preventDefault();

        const res = await axios({
            url: '/api/gigs/updateStatus',
            method: 'PUT',
            data: { 
                    'status': e.target.value, 
                    'gigName': gig.gigName,
                    'musicianName': username
                }
        });
        if (res.status === 200) refreshData();
    }
    debugger
    return (
        <div className="container">
            <div className="fixed">
                <h2>{gig.displayName} {gig.date}</h2>
                <p><b>Status:</b> Tentative</p>
                <p><b>Venue:</b> 18-26 Palmetto St</p>
                <p><b>Call Time:</b> 3pm</p>
                <p><b>Hit Time:</b> 3:10pm</p>
                <p><b>Captains:</b> Allison duh</p>
                <p><b>Pay:</b> ${gig.pay}</p>
                <p><b>Description:</b> {gig.description}</p>

            </div>
            <div className="flex-item">

                <button value="yep" onClick={e => updateStatus(e)}>Going</button>
                <button value="iffy" onClick={e => updateStatus(e)}>Iffy</button>
                <button value="nope" onClick={e => updateStatus(e)}>Nope</button>
                
                <table border="1">
                    <tr>
                        <td>
                            <table>
                                <thead>
                                    <tr>
                                        <td><b>Trombones</b></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gig.band.trombone.map(name =>
                                        <tr>
                                            <td className={musicians[name].gigs[gig.gigName]}>
                                                {name}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table>
                                <thead>
                                    <tr>
                                        <td><b>Trumpets</b></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gig.band.trumpet.map(name =>
                                        <tr>
                                            <td className={musicians[name].gigs[gig.gigName]}>
                                                {name}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table>
                                <thead>
                                    <tr>
                                        <td><b>Saxophones</b></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gig.band.Sax.map(name =>
                                        <tr>
                                            <td className={musicians[name].gigs[gig.gigName]}>
                                                {name}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Gig