import { Chart as ChartJS } from "chart.js/auto"
import { Doughnut, Bar } from "react-chartjs-2"
import { CATEGORIES } from "../data/expense"

function Chart({ expenses }) {
    const byCategory = expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) {
            acc[expense.category] = 0;
        }
        acc[expense.category] += Number(expense.amount);
        return acc;
    }, {});
    const values = CATEGORIES.map(category => byCategory[category] || 0)

    const nordColors = [
        '#88C0D0', // Frost light blue
        '#8FBCBB', // Frost cyan
        '#81A1C1', // Frost blue
        '#5E81AC', // Frost darker blue
        '#BF616A', // Aurora red
        '#D08770', // Aurora orange
        '#EBCB8B', // Aurora yellow
        '#A3BE8C', // Aurora green
        '#B48EAD', // Aurora purple
    ];

    const doughnutColors = nordColors.slice(0, CATEGORIES.length);

    console.log(CATEGORIES, values);
    return (
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title mb-4">Grafico a Barre</h2>
                    <Bar
                        data={{
                            labels: CATEGORIES,
                            datasets: [
                                {
                                    label: "Spese",
                                    data: values,
                                    borderRadius: 5,
                                    backgroundColor: nordColors[2], // Frost blue
                                }
                            ]
                        }}
                    />
                </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title mb-4">Grafico a Torta</h2>
                    <div className="flex justify-center">
                        <div className="w-full max-w-md">
                            <Doughnut
                                data={{
                                    labels: CATEGORIES,
                                    datasets: [
                                        {
                                            label: "Spese",
                                            data: values,
                                            backgroundColor: doughnutColors,
                                            borderColor: '#2E3440',
                                            borderWidth: 2,
                                            hoverOffset: 4
                                        }
                                    ]
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chart;