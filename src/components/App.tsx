import { useState } from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import calculate from "../logic/calculate";
import "./App.scss";

const App = () => {
    const [total, setTotal] = useState(null);
    const [next, setNext] = useState(null);
    const [operation, setOperation] = useState(null);

    const handleClick = (buttonName: string) => {
        calculate(
            total, setTotal,
            next, setNext,
            operation, setOperation,
            buttonName
        )
    };

    return (
        <div className="component-app">
            <Display value={next || total || "0"} />
            <ButtonPanel clickHandler={handleClick} />
        </div>
    );
};

export default App;
