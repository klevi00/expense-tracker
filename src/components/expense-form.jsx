import { useState } from "react";
import { CATEGORIES } from "../data/expense";
function ExpenseForm({ setExpenses }) {
    // description = variabile, setDescription = funzione che cambia il valore della variabile
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");

    //handleSubmit ci crea la spesa quando schiacciamo il submit nel form
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!description.trim()) {
            alert('Inserisci una descrizione');
            return;
        }

        if (!amount || amount <= 0) {
            alert('Inserisci un importo valido');
            return;
        }

        if (!category) {
            alert('Seleziona una categoria');
            return;
        }

        const newExpense = {
            id: Date.now(),
            description,
            amount,
            category,
            createdAt: new Date()
        };

        setExpenses((prevExpenses) => [...prevExpenses, newExpense]); // ... Spread Operator
        //prevExpenses sono le spese che ho già. A quelle aggiungo la newExpense
        setDescription("");
        setCategory("");
        setAmount("");
    }

    return (
        <form onSubmit={handleSubmit} className="expense-form">
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Seleziona Categoria</option>
                {
                    CATEGORIES.map(category => {
                        return <option key={category} value={category}>{category}</option>
                    })
                }
            </select>
            <input
                name="description"
                //quando cambierà il valore di description, cambierà automaticamente il valore dell'input
                value={description}
                placeholder="Inserisci la descrizione della spesa"
                onChange={(e) => setDescription(e.target.value)}
            // e è il valore che inserisce l'utente. Quando cambia, cambiamo la descrizione con setDescription
            />
            <input
                name="amount"
                value={amount}
                placeholder="Inserisci l'importo della spesa"
                onChange={(e) => setAmount(e.target.value)}
            />
            <button type="submit">Aggiungi spesa</button>
        </form>
    )
}

export default ExpenseForm;