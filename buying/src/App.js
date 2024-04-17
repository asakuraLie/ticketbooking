import "./App.css";
import { useState, useEffect } from "react";
import Seat from "./components/seat";

import axios from "axios";

function App() {
    const [chosenSeat, setChosenSeat] = useState(null);
    const [seatClicked, setSeatClicked] = useState(false);
    const [reservedClicked, setReservedClicked] = useState(false);
    const [seatList, setSeatList] = useState([]);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/seat/list/`)
            .then((response) => {
                setSeatList(response.data);
            })
            .catch((err) => console.log(err));
    }, [seatClicked]);

    const handleClick = (seat) => {
        if (seat.reserved === false) {
            setChosenSeat(seat);
            setSeatClicked(true);
        } else {
            setChosenSeat(seat);
            setReservedClicked(true);
        }
    };

    const handleConfirm = () => {
        axios
            .patch(`http://127.0.0.1:8000/seat/${chosenSeat.id}/reserve/`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => console.log(err));
        setSeatClicked(false);
    };

    const handleCancel = () => {
        setSeatClicked(false);
    };

    const handleFreeConfirm = () => {
        axios
            .patch(`http://127.0.0.1:8000/seat/${chosenSeat.id}/make_available/`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => console.log(err));
            setReservedClicked(false);
    };

    const handleFreeCancel = () => {
        setReservedClicked(false);
    };

    return (
        <div className="App">
            <h1 className="header">Escolha seu Assento</h1>
            <div className="seating-map">
                <div className="content">
                    {seatList.map((seat) => {
                        return (
                            <div classname="grid">
                                <Seat
                                    name={seat.name}
                                    reserved={seat.reserved}
                                    handleClick={() => handleClick(seat)}
                                />
                            </div>
                        );
                    })}
                </div>
                {seatClicked && (
                    <div className="confirm-seat">
                        <h4>Reservar assento {chosenSeat.name}?</h4>
                        <button onClick={handleConfirm}>Sim</button>
                        <button onClick={handleCancel}>Não</button>
                    </div>
                )}
                {reservedClicked && (
                    <div className="confirm-seat">
                        <h4>Liberar assento {chosenSeat.name}?</h4>
                        <button onClick={handleFreeConfirm}>Sim</button>
                        <button onClick={handleFreeCancel}>Não</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
