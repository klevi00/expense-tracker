import { Line } from "react-chartjs-2"

function LineBar({expenses, nordColors}){
    // Group expenses by date and calculate total for each date
    const expensesByDate = expenses.reduce((acc, expense) => {
        const dateObj = new Date(expense.createdAt);
        const dateKey = dateObj.toISOString().split('T')[0]; // Use YYYY-MM-DD for sorting
        if (!acc[dateKey]) {
            acc[dateKey] = { amount: 0, dateObj: dateObj };
        }
        acc[dateKey].amount += Number(expense.amount);
        return acc;
    }, {});

    // Sort dates chronologically and format for display
    const sortedEntries = Object.entries(expensesByDate)
        .sort((a, b) => new Date(a[0]) - new Date(b[0]))
        .map(([dateKey, data]) => ({
            date: data.dateObj.toLocaleDateString("it-IT"),
            amount: data.amount
        }));

    const sortedDates = sortedEntries.map(entry => entry.date);
    const amounts = sortedEntries.map(entry => entry.amount);

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title mb-4">Grafico a Linee</h2>
                <Line 
                    data={{ 
                        labels: sortedDates,
                        datasets: [
                            {
                                label: "Spese",
                                data: amounts,
                                borderColor: nordColors[2], // Frost blue
                                backgroundColor: nordColors[2] + '40', // Frost blue with transparency
                                borderWidth: 2,
                                fill: true,
                                tension: 0.4,
                                pointBackgroundColor: nordColors[2],
                                pointBorderColor: '#2E3440',
                                pointBorderWidth: 2,
                                pointRadius: 4,
                                pointHoverRadius: 6,
                            }
                        ]
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    color: '#3B4252',
                                },
                                ticks: {
                                    color: '#ECEFF4',
                                }
                            },
                            x: {
                                grid: {
                                    color: '#3B4252',
                                },
                                ticks: {
                                    color: '#ECEFF4',
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default LineBar;