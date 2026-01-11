import { Doughnut } from "react-chartjs-2"
import { CATEGORIES } from "../data/expense"
import { Chart as ChartJS } from "chart.js/auto"
import ChartDataLabels from 'chartjs-plugin-datalabels'
ChartJS.register(ChartDataLabels);
function PieChart({values, nordColors}) {

    const doughnutColors = nordColors.slice(0, CATEGORIES.length);
    
    return (
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
                            options={{
                                plugins: {
                                    datalabels: {
                                        color: '#2E3440',
                                        formatter: (value, context) => {
                                            const dataset = context.chart.data.datasets[0];
                                            const total = dataset.data.reduce((sum, val) => sum + val, 0);
                                            const percentage = total ? (value / total * 100).toFixed(1) : 0;
                                            return `${percentage}%`;
                                        },
                                        font: {
                                            weight: 'bold',
                                            size: 14
                                        }
                                    },
                                    legend: {
                                        position: 'bottom'
                                    }
                                }
                            }}
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}
export default PieChart;