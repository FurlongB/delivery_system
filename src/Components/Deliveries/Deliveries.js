import React, {useState, useContext} from 'react';
import axios from 'axios';
import devClass from './Deliveries.css'
import Icon from './icon/icon'
import Parcel from '../ParcelDetails/ParcelDetails';
import PickUp from '../PickUpDetails/PickUpDetails';
import AuthContext from '../../Context/auth-context';


const deliveries = (props) =>{
    const [parcel, setParcel] = useState(null)
    const [pickup, setPickUp] = useState(null)
    const [packageID, setPackageID] = useState(null);
    const authStatus = useContext(AuthContext);
    const getCurParcel = (parcelID) =>{
        console.log('parcelID', parcelID)
        setPackageID(parcelID)
        axios.get(`https://my-ups-4b5b7.firebaseio.com/${authStatus.status.area}/${parcelID}.json`)
        .then(res => {
            console.log('res.data', res.data)
            if(res.data.status === 'delivery'){
                setParcel(res.data);
            }else{
                setPickUp(res.data);
            }
           
        })
        .catch(err =>{
            console.log(err)
        });
    }

    const closeHandler = () =>{
        parcel ? setParcel(null) : setPickUp(null);
        props.clicked();
    }

     return(
        <div>
            {props.locations.map((plr, index) =>
                    (<div key={plr.id} className={plr.status !== 'null' ? devClass.disabled: devClass.deliveries} onClick={plr.status !== 'null' ? null: getCurParcel.bind(this, plr.id)}>
                        <span className={devClass.img}><Icon/></span>
                        <span className={devClass.address}>
                            <b>{Number(index+1)} - {plr.name}</b><br/>
                            <span>{plr.address === undefined ? null : plr.address+', '} {plr.area}</span>
                        </span>
                    </div>)
                )}
            {parcel ? <Parcel details={parcel} id={packageID} clicked={closeHandler}/> : null} 
            {pickup ? <PickUp details={pickup} id={packageID} clicked={closeHandler}/> : null}    
        </div>
    )
}

export default deliveries;