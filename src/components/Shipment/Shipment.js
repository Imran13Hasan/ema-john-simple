import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser)

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        console.log("form submitted", data);
    }

    console.log(watch("")); // watch input value by passing the name of it

    return (
        < form className="ship-form" onSubmit = { handleSubmit(onSubmit) } >
            {/* < input name = "example" defaultValue = "test" ref = { register } /> */}

            < input name = "name" defaultValue={loggedInUser.name} ref = { register({ required: true }) } placeholder="Enter your Name" />
            { errors.name && <span className="error">Name is required</span> }

            < input name = "email" defaultValue={loggedInUser.email} ref = { register({ required: true }) } placeholder="Enter your Email"/>
            { errors.email && <span className="error">Email is required</span> }
            
            < input name = "phone" ref = { register({ required: true }) } placeholder="Enter your Phone No."/>
            { errors.phone && <span className="error">Phone Number is required</span> }

            < input name = "address" ref = { register({ required: true }) } placeholder="Enter your Address"/>
            { errors.address && <span className="error">Your address is required</span> }

            < input name = "city" ref = { register({ required: true }) } placeholder="Enter your current city"/>
            { errors.city && <span className="error">This field is required</span> }

            <input type="submit" />
        </form >
  );
};

export default Shipment;