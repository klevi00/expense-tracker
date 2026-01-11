function Bottone({ valore, onClick }) {

    const getButtonClass = () => {
        if (valore === "=") return "btn btn-success col-span-2";
        if (valore === "C") return "btn btn-error";
        if (valore === "DEL") return "btn btn-warning";
        if (["+", "-", "*", "/"].includes(valore)) return "btn btn-primary";
        return "btn btn-neutral";
    };


    return (
        <button onClick={() => onClick(valore)} className={getButtonClass()}>
            {valore}
        </button>
    )
}

export default Bottone;