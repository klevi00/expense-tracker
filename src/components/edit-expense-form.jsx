import { useState } from "react";
import { CATEGORIES } from "../data/expense";

function EditExpenseForm({ expense, onSave, onCancel }) {
    const [description, setDescription] = useState(expense.description);
    const [amount, setAmount] = useState(expense.amount);
    const [category, setCategory] = useState(expense.category);

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

        onSave(expense.id, {description, amount, category});
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
            <button type="submit">Salva spesa</button>
            <button type="button" onClick={onCancel}>Annulla operazione</button>
        </form>
    )
}

export default EditExpenseForm;