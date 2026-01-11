import { Bar } from "react-chartjs-2"
import { CATEGORIES } from "../data/expense"

function BarChart({values, nordColors}){
    return (
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
    )
}

export default BarChart;