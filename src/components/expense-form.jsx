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
        <div className="card bg-base-100 shadow-xl mt-8 mb-8">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Aggiungi Nuova Spesa</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Categoria</span>
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="select select-bordered w-full"
                        >
                            <option value="">Seleziona Categoria</option>
                            {
                                CATEGORIES.map(category => {
                                    return <option key={category} value={category}>{category}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Descrizione</span>
                        </label>
                        <input
                            name="description"
                            type="text"
                            value={description}
                            placeholder="Inserisci la descrizione della spesa"
                            onChange={(e) => setDescription(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Importo</span>
                        </label>
                        <input
                            name="amount"
                            type="number"
                            step="0.01"
                            value={amount}
                            placeholder="Inserisci l'importo della spesa"
                            onChange={(e) => setAmount(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4">Aggiungi spesa</button>
                </form>
            </div>
        </div>
    )
}

export default ExpenseForm;