import EditExpenseForm from "./edit-expense-form";
function ExpenseItem({expenseItem, isEditing, onSave, onCancel, onDelete, onEdit}) {
    const dateFormatted = new Date (expenseItem.createdAt).toLocaleDateString("it-IT");

    if(isEditing){
        return <EditExpenseForm expense = {expenseItem} onSave={onSave} onCancel={onCancel} onEdit={onEdit}/>


    }
    return (
        <li className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
            <div className="card-body">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                        <h3 className="card-title text-lg mb-2">{expenseItem.description}</h3>
                        <div className="flex flex-wrap gap-4 text-sm">
                            <div className="badge badge-primary badge-lg">${parseFloat(expenseItem.amount).toFixed(2)}</div>
                            <div className="badge badge-secondary badge-lg">{expenseItem.category}</div>
                            <div className="text-base-content/70">{dateFormatted}</div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            type="button" 
                            onClick={() => onEdit(expenseItem.id)}
                            className="btn btn-sm btn-outline btn-primary"
                        >
                            Modifica
                        </button>
                        <button 
                            type="button"
                            onClick={() => onDelete(expenseItem.id)}
                            className="btn btn-sm btn-error"
                        >
                            Elimina
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )


}

export default ExpenseItem;