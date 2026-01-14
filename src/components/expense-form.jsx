import { useState } from "react";
import { CATEGORIES } from "../data/expense";
import { pb } from "../lib/pocketbase";

function ExpenseForm({ onExpenseAdded }) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
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

        setIsLoading(true);
        try {
            const newExpense = {
                description,
                amount: Number(amount),
                category
            };

            await pb.collection('expenses').create(newExpense);
            
            // Refresh the expenses list
            if (onExpenseAdded) {
                onExpenseAdded();
            }
            
            setDescription("");
            setCategory("");
            setAmount("");
            setIsOpen(false);
        } catch (err) {
            console.error('Errore nel salvataggio della spesa:', err);
            let errorMessage = 'Errore nel salvataggio della spesa.';
            if (err.status === 404) {
                errorMessage = 'La collezione "expenses" non esiste in PocketBase. Crealo prima di aggiungere spese.';
            } else if (err.status === 0) {
                errorMessage = 'Impossibile connettersi a PocketBase. Verifica che il server sia avviato.';
            } else if (err.message) {
                errorMessage = `Errore: ${err.message}`;
            }
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body p-4 md:p-6">
                <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                            <div className="bg-primary text-primary-content rounded-full w-10">
                                <span className="text-xl">+</span>
                            </div>
                        </div>
                        <h2 className="card-title text-xl md:text-2xl">Aggiungi Nuova Spesa</h2>
                    </div>
                    <button 
                        type="button"
                        className={`btn btn-ghost btn-sm btn-circle transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
                
                <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="form-control">
                                <label className="label py-2">
                                    <span className="label-text font-semibold">Categoria</span>
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Seleziona</option>
                                    {
                                        CATEGORIES.map(cat => {
                                            return <option key={cat} value={cat}>{cat}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label py-2">
                                    <span className="label-text font-semibold">Descrizione</span>
                                </label>
                                <input
                                    name="description"
                                    type="text"
                                    value={description}
                                    placeholder="Es. Pranzo al ristorante"
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label py-2">
                                    <span className="label-text font-semibold">Importo (€)</span>
                                </label>
                                <input
                                    name="amount"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={amount}
                                    placeholder="0.00"
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                            <button 
                                type="button" 
                                className="btn btn-ghost"
                                onClick={() => {
                                    setIsOpen(false);
                                    setDescription("");
                                    setCategory("");
                                    setAmount("");
                                }}
                            >
                                Annulla
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Salvataggio...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Aggiungi Spesa
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ExpenseForm;