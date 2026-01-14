import { Doughnut } from "react-chartjs-2"
import { CATEGORIES } from "../data/expense"
import { Chart as ChartJS } from "chart.js/auto"
import ChartDataLabels from 'chartjs-plugin-datalabels'
ChartJS.register(ChartDataLabels);

function PieChart({values, nordColors}) {
    const doughnutColors = nordColors.slice(0, CATEGORIES.length);
    const total = values.reduce((sum, val) => sum + val, 0);
    
    // Format number for display - handles large numbers gracefully
    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(2) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(2) + 'K';
        } else {
            return num.toFixed(2);
        }
    };
    
    // Format number with thousand separators for full display
    const formatFullNumber = (num) => {
        return num.toLocaleString('it-IT', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };
    
    // Determine font size based on number length
    const getFontSize = (num) => {
        const numStr = formatNumber(num);
        if (numStr.length <= 6) return 'text-3xl';
        if (numStr.length <= 8) return 'text-2xl';
        if (numStr.length <= 10) return 'text-xl';
        return 'text-lg';
    };
    
    // Filter out categories with zero values for better visualization
    const filteredData = values.map((val, index) => ({
        value: val,
        label: CATEGORIES[index],
        color: doughnutColors[index]
    })).filter(item => item.value > 0);
    
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="card-title text-2xl">Distribuzione Spese</h2>
                    {total > 0 && (
                        <div className="badge badge-primary badge-lg">
                            Totale: €{formatFullNumber(total)}
                        </div>
                    )}
                </div>
                <div className="flex flex-col lg:flex-row items-center gap-6">
                    <div className="w-full lg:w-2/5 flex justify-center">
                        <div className="relative w-full max-w-xs">
                            <Doughnut
                                data={{
                                    labels: CATEGORIES,
                                    datasets: [
                                        {
                                            label: "Spese (€)",
                                            data: values,
                                            backgroundColor: doughnutColors,
                                            borderColor: '#FFFFFF',
                                            borderWidth: 3,
                                            hoverOffset: 8,
                                            hoverBorderWidth: 4
                                        }
                                    ]
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                    cutout: '60%',
                                    plugins: {
                                        datalabels: {
                                            display: function(context) {
                                                const value = context.dataset.data[context.dataIndex];
                                                const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                                                const percentage = total > 0 ? (value / total * 100) : 0;
                                                // Only show label if percentage is >= 5% for readability
                                                return percentage >= 5;
                                            },
                                            color: '#1F2937',
                                            formatter: (value, context) => {
                                                const dataset = context.chart.data.datasets[0];
                                                const total = dataset.data.reduce((sum, val) => sum + val, 0);
                                                const percentage = total > 0 ? (value / total * 100).toFixed(1) : 0;
                                                return `${percentage}%`;
                                            },
                                            font: {
                                                weight: 'bold',
                                                size: 13
                                            },
                                            textStrokeColor: '#FFFFFF',
                                            textStrokeWidth: 3,
                                            padding: 4
                                        },
                                        legend: {
                                            display: false
                                        },
                                        tooltip: {
                                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                            padding: 12,
                                            titleFont: {
                                                size: 14,
                                                weight: 'bold'
                                            },
                                            bodyFont: {
                                                size: 13
                                            },
                                            callbacks: {
                                                label: function(context) {
                                                    const value = context.parsed;
                                                    const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                                                    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                                    return [
                                                        `Categoria: ${context.label}`,
                                                        `Importo: €${value.toFixed(2)}`,
                                                        `Percentuale: ${percentage}%`
                                                    ];
                                                }
                                            },
                                            displayColors: true,
                                            boxPadding: 6
                                        }
                                    },
                                    animation: {
                                        animateRotate: true,
                                        animateScale: true,
                                        duration: 1000,
                                        easing: 'easeInOutQuart'
                                    },
                                    interaction: {
                                        intersect: false
                                    }
                                }}
                            />
                            {total > 0 && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="text-center px-2">
                                        <div className={`${getFontSize(total)} font-bold text-primary break-words`}>
                                            €{formatNumber(total)}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {total >= 1000 && (
                                                <span className="block opacity-75">
                                                    {formatFullNumber(total)} €
                                                </span>
                                            )}
                                            <span>Totale</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full lg:w-3/5">
                        <div className="space-y-3">
                            {CATEGORIES.map((category, index) => {
                                const value = values[index];
                                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                
                                if (value === 0) return null;
                                
                                return (
                                    <div key={category} className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors">
                                        <div 
                                            className="w-4 h-4 rounded-full flex-shrink-0" 
                                            style={{ backgroundColor: doughnutColors[index] }}
                                        ></div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-sm text-gray-700 truncate">
                                                    {category}
                                                </span>
                                                <span className="font-bold text-sm text-gray-900 ml-2 whitespace-nowrap">
                                                    €{formatFullNumber(value)}
                                                </span>
                                            </div>
                                            <div className="mt-1">
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className="h-2 rounded-full transition-all duration-500"
                                                        style={{ 
                                                            width: `${percentage}%`,
                                                            backgroundColor: doughnutColors[index]
                                                        }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs text-gray-500 mt-1 block">
                                                    {percentage}% del totale
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {total === 0 && (
                                <div className="text-center text-gray-500 py-8">
                                    <p>Nessuna spesa da visualizzare</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PieChart;