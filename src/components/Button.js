import "./Button.css";

// name: PropTypes.string,
// orange: PropTypes.bool,
// wide: PropTypes.bool,
// clickHandler: PropTypes.func,

const Button = (props) => {
    const handleClick = () => {
        props.clickHandler(props.name);
    };

    const className = [
        "component-button",
        props.orange ? "orange" : "",
        props.wide ? "wide" : "",
    ];

    return (
        <div className={className.join(" ").trim()}>
            <button onClick={handleClick}>{props.name}</button>
        </div>
    );
};

export default Button