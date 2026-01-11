function Dashboard({ expenses }) {
    const total = expenses.reduce((acc, expense) => acc + Number(expense.amount), 0);
    const totalCount = expenses.length;
    const averageExpense = totalCount > 0
        ? expenses.reduce((sum, exp) => sum + Number(exp.amount), 0) / totalCount
        : 0;

    const byCategory = expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) {
            acc[expense.category] = 0;
        }
        acc[expense.category] += Number(expense.amount);
        return acc;
    }, {});
    //chiavi-valori 
    return (
        <div>
            <h2>
                Totale: ${total.toFixed(2)};
            </h2>
            <p>
                Hai registrato {totalCount} spese
            </p>
            <p>Media: ${averageExpense.toFixed(2)}</p>
            <div className="category-summary">
                <h3>Per categoria</h3>
                {Object.entries(byCategory).map(([cat, amount]) => (
                    <div key={cat} className="category-row">
                        <span>{cat}</span>
                        <span>${amount.toFixed(2)}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;