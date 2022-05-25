import "./Display.css";

type DisplayProps = {
    value: string
}

const Display = (props: DisplayProps) => (
    <div className="component-display">
        <div>{props.value}</div>
    </div>
);

export default Display