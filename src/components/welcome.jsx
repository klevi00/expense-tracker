// nome e importo sono delle Props, ovvero dei valori variabili che scrivo in app.jsx
function Welcome({username, total}){
    return (
        <>
            <h1>Welcome {username}!</h1>
            <p>
                Hai speso ${total}.
            </p>
        </>
    )
}

export default Welcome;