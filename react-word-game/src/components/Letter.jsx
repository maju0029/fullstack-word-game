export default function Letter ({letter, result}) {
    return (
        <span className={`letter ${result}`}>
            {letter} - {result}
        </span>
    )
};