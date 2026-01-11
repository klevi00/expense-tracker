
import { CATEGORIES } from "../data/expense"
import ChartDataLabels from 'chartjs-plugin-datalabels'
import PieChart from "./pieChart"
import BarChart from "./barChart";



function Chart({ expenses }) {
    const byCategory = expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) {
            acc[expense.category] = 0;
        }
        acc[expense.category] += Number(expense.amount);
        return acc;
    }, {});
    const values = CATEGORIES.map(category => byCategory[category] || 0);
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

    return (
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <BarChart values={values} nordColors={nordColors}/>
            <PieChart values={values} nordColors={nordColors}/>
        </div>
    )
}

export default Chart;