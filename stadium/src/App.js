import "./App.css";
import { useState, useEffect } from "react";
import Seat from "./components/seat";

import axios from "axios";

function App() {

    const [seatList, setSeatList] = useState([]);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/seat/list/`)
            .then((response) => {
                setSeatList(response.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="App">
        <h1 className="header">Mapa de Assentos</h1>
        <div className="seating-map">
            <div className="content">
                {seatList.map((seat) => {
                    return (
                        <div classname="grid">
                            <Seat
                                name={seat.name}
                                reserved={seat.reserved}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
    );
}

export default App;
