import ExpenseItem from "./expense-item";

function ExpenseList({expenses, editingId, onDelete, onSave, onCancel, onEdit}){
    const sortedExpenses = [...expenses].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    if(expenses.length === 0){
        return (
            <div className="alert alert-info shadow-lg mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Non ci sono spese disponibili. Aggiungine una qui sotto!</span>
            </div>
        )
    }

    return (
        <ul className="space-y-4 mb-8">
            {
                sortedExpenses.map(item => {
                    return <ExpenseItem key={item.id} expenseItem = {item} isEditing = {editingId === item.id} onSave={onSave} onCancel={onCancel} onEdit={onEdit} onDelete={onDelete}/>;
                })
            }
        </ul>
    )

}

export default ExpenseList;