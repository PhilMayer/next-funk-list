import axios from 'axios';
import { useRouter } from 'next/router';

const Gig = ({ gig, musicians, username }) => {
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    }
    
    const updateStatus = async (e) => {
        e.preventDefault();
        document.getElementById(e.target.value).play()

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
    
    return (
        <div className="container">
            <div className="flex-item">
                <h2>{gig.displayName} {gig.date}</h2>
                <p><b>Status:</b> {gig.status}</p>
                <p><b>Venue:</b> {gig.venue}</p>
                <p><b>Call Time:</b> {gig.callTime}</p>
                <p><b>Hit Time:</b> {gig.hitTime}</p>
                <p><b>Captains:</b> OMG WHO IS CAPTAIN</p>
                <p><b>Pay:</b> ${gig.pay}</p>
                <p><b>Description:</b> {gig.description}</p>

            </div>
            <div className="fixed">

                <button value="yep" onClick={e => updateStatus(e)}>Going</button>
                <button value="iffy" onClick={e => updateStatus(e)}>Iffy</button>
                <button value="nope" onClick={e => updateStatus(e)}>Nope</button>

                <audio id="nope"><source src="FRnope.m4a"></source></audio>
                <audio id="iffy"><source src="funkrust.m4a"></source></audio>
                <audio id="yep"><source src="terminus.m4a"></source></audio>

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
                                    {gig.band.sax.map(name =>
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
                                        <td><b>Tubas</b></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gig.band.tuba.map(name =>
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
                                        <td><b>Drums</b></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gig.band.drums.map(name =>
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
                                        <td><b>Vocals</b></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gig.band.vocals.map(name =>
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