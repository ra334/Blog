import './Button.css'

type ButtonType = {
    text: string;
    onClick: () => void;
}

function Button(props: ButtonType) {
    return (
        <button onClick={props.onClick} >{props.text}</button>
    )
}

export default Button