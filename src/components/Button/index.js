import styles from "./styles.module.css"

export const Button = (props) => {
    return (
        <button 
            className={props.className} 
            type={props.type} 
            style={{backgroundColor: props.color}} 
            onClick={props.onClick}>{props.value}
        </button>
    );
}

Button.defaultProps = {
    className: "",
    color: "white",
    onClick: (e) => {},
    type: "button",
}