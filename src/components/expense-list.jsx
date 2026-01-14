import ExpenseItem from "./expense-item";

function ExpenseList({expenses, editingId, onDelete, onSave, onCancel, onEdit}){
    const sortedExpenses = [...expenses].sort((a, b) => {
        // PocketBase uses 'created' instead of 'createdAt'
        const dateA = new Date(a.created || a.createdAt);
        const dateB = new Date(b.created || b.createdAt);
        return dateB - dateA;
    });

    if(expenses.length === 0){
        return (
            <div className="card bg-base-100 shadow-lg mb-8">
                <div className="card-body">
                    <div className="flex flex-col items-center justify-center py-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-16 h-16 text-gray-400 mb-4">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">Nessuna spesa trovata</h3>
                        <p className="text-sm text-gray-500 text-center">Aggiungi una nuova spesa utilizzando il form sopra</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Lista Spese
                </h2>
                <div className="badge badge-primary badge-lg">
                    {expenses.length} {expenses.length === 1 ? 'spesa' : 'spese'}
                </div>
            </div>
            <ul className="space-y-3">
                {
                    sortedExpenses.map(item => {
                        return <ExpenseItem key={item.id} expenseItem = {item} isEditing = {editingId === item.id} onSave={onSave} onCancel={onCancel} onEdit={onEdit} onDelete={onDelete}/>;
                    })
                }
            </ul>
        </div>
    )

}

export default ExpenseList;