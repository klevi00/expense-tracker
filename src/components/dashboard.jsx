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
        <div className="mt-20 mb-8">
            <div className="stats stats-vertical lg:stats-horizontal shadow w-full mb-6">
                <div className="stat">
                    <div className="stat-title">Totale Spese</div>
                    <div className="stat-value text-primary">${total.toFixed(2)}</div>
                    <div className="stat-desc">Spesa totale registrata</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Numero Spese</div>
                    <div className="stat-value text-secondary">{totalCount}</div>
                    <div className="stat-desc">Hai registrato {totalCount} spese</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Media per Spesa</div>
                    <div className="stat-value text-accent">${averageExpense.toFixed(2)}</div>
                    <div className="stat-desc">Media delle spese</div>
                </div>
            </div>
            {Object.keys(byCategory).length > 0 && (
                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-4">Per Categoria</h2>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>Categoria</th>
                                        <th className="text-right">Importo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(byCategory).map(([cat, amount]) => (
                                        <tr key={cat}>
                                            <td className="font-semibold">{cat}</td>
                                            <td className="text-right font-bold">${amount.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard;