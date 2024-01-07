import './ErrorComponent.css'

type ErrorProps = {
    message: string;
}

function Error(props: ErrorProps) {
    return (
        <div className="error__wrapper">
            <h3>{props.message}</h3>
        </div>
    )
}

export default Error