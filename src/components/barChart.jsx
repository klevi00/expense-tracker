import { Bar } from "react-chartjs-2"
import { CATEGORIES } from "../data/expense"
import { Chart as ChartJS } from "chart.js/auto"
import ChartDataLabels from 'chartjs-plugin-datalabels'
ChartJS.register(ChartDataLabels);

function BarChart({values, nordColors}){
    const total = values.reduce((sum, val) => sum + val, 0);
    
    // Format number with thousand separators
    const formatFullNumber = (num) => {
        return num.toLocaleString('it-IT', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };
    
    // Format number for compact display (K/M abbreviations)
    const formatCompactNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(2) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(2) + 'K';
        } else {
            return num.toFixed(2);
        }
    };
    
    // Create gradient colors for each bar
    const getGradientColor = (index) => {
        const baseColor = nordColors[index % nordColors.length];
        return baseColor;
    };

    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="card-title text-2xl">Spese per Categoria</h2>
                    {total > 0 && (
                        <div className="badge badge-primary badge-lg">
                            Totale: €{formatFullNumber(total)}
                        </div>
                    )}
                </div>
                <div className="h-80">
                    <Bar
                        data={{
                            labels: CATEGORIES,
                            datasets: [
                                {
                                    label: "Spese (€)",
                                    data: values,
                                    borderRadius: 8,
                                    borderSkipped: false,
                                    backgroundColor: values.map((val, index) => 
                                        val > 0 ? getGradientColor(index) : '#E5E7EB'
                                    ),
                                    borderColor: values.map((val, index) => 
                                        val > 0 ? nordColors[(index + 2) % nordColors.length] : '#D1D5DB'
                                    ),
                                    borderWidth: 2,
                                    barThickness: 'flex',
                                    maxBarThickness: 60,
                                }
                            ]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                datalabels: {
                                    anchor: 'end',
                                    align: 'top',
                                    color: '#1F2937',
                                    formatter: (value) => {
                                        if (value <= 0) return '';
                                        // Use compact format for large numbers
                                        if (value >= 1000) {
                                            return `€${formatCompactNumber(value)}`;
                                        }
                                        return `€${value.toFixed(2)}`;
                                    },
                                    font: {
                                        weight: 'bold',
                                        size: 12
                                    },
                                    padding: {
                                        top: 4
                                    }
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
                                            const value = context.parsed.y;
                                            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                            return [
                                                `Importo: €${formatFullNumber(value)}`,
                                                `Percentuale: ${percentage}%`
                                            ];
                                        }
                                    },
                                    displayColors: true,
                                    boxPadding: 6
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        callback: function(value) {
                                            if (value >= 1000) {
                                                return '€' + formatCompactNumber(value);
                                            }
                                            return '€' + value.toFixed(0);
                                        },
                                        font: {
                                            size: 11
                                        },
                                        color: '#6B7280'
                                    },
                                    grid: {
                                        color: 'rgba(0, 0, 0, 0.05)',
                                        drawBorder: false
                                    }
                                },
                                x: {
                                    ticks: {
                                        font: {
                                            size: 12,
                                            weight: '500'
                                        },
                                        color: '#374151'
                                    },
                                    grid: {
                                        display: false
                                    }
                                }
                            },
                            animation: {
                                duration: 1000,
                                easing: 'easeInOutQuart'
                            },
                            interaction: {
                                intersect: false,
                                mode: 'index'
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default BarChart;