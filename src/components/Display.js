import "./Display.css";

const Display = (props) => (
    <div className="component-display">
        <div>{props.value}</div>
    </div>
);

export default Display