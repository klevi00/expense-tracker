import ExpenseItem from "./expense-item";

function ExpenseList({expenses, editingId, onDelete, onSave, onCancel, onEdit}){
    const sortedExpenses = [...expenses].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    if(expenses.length === 0){
        return (
            <p>
                Non ci sono spese disponibili. Aggiungine una qui sotto!
            </p>
        )
    }

    return (
        <ul>
            {
                expenses.map(item => {
                    return <ExpenseItem key={item.id} expenseItem = {item} isEditing = {editingId === item.id} onSave={onSave} onCancel={onCancel} onEdit={onEdit} onDelete={onDelete}/>;
                })
            }
        </ul>
    )

}

export default ExpenseList;