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
        <li className="card bg-base-200 shadow-md mb-4">
            <div className="card-body">
                <h3 className="card-title text-lg mb-4">Modifica Spesa</h3>
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
                    <div className="flex gap-2 mt-2">
                        <button type="submit" className="btn btn-success flex-1">Salva spesa</button>
                        <button type="button" onClick={onCancel} className="btn btn-ghost flex-1">Annulla</button>
                    </div>
                </form>
            </div>
        </li>
    )
}

export default EditExpenseForm;