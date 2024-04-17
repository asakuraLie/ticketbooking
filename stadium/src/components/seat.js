import {React, useEffect, useState} from "react";

import "./seat.css";

function Seat ({name, handleClick, reserved}) {

    const [reservedSeat, setReservedSeat] = useState(name);

    useEffect(() => {
        if(reserved === true) {
            setReservedSeat("X")
        }
    }, [reservedSeat])

    return (
        <div className="seat">
            <h4 onClick={handleClick}>{reservedSeat}</h4>
        </div>
    );
};

export default Seat;
