import EditExpenseForm from "./edit-expense-form";
function ExpenseItem({expenseItem, isEditing, onSave, onCancel, onDelete, onEdit}) {
    const dateFormatted = new Date (expenseItem.createdAt).toLocaleDateString("it-IT");

    if(isEditing){
        return <EditExpenseForm expense = {expenseItem} onSave={onSave} onCancel={onCancel} onEdit={onEdit}/>


    }
    return (
        <li className="expense-item">
            <span>{expenseItem.description}</span>
            <span>${expenseItem.amount}</span>
            <span>{expenseItem.category}</span>
            <span>{dateFormatted}</span>
            <button type="button" onClick={() => {
                onEdit(expenseItem.id)
            }}>
                Modifica
            </button>
            <button onClick={() => {
                onDelete(expenseItem.id)
            }}>
                Elimina
            </button>
        </li>
    )


}

export default ExpenseItem;