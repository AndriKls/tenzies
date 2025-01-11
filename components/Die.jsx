export default function Die(props) {
    return (
        <button onClick={props.onClick} className={`die ${props.isHeld ? "held" : ""}`}>{props.value}</button>
    )
}