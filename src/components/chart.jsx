import { CATEGORIES } from "../data/expense"
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
    const total = values.reduce((sum, val) => sum + val, 0);
    
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

    if (total === 0) {
        return (
            <div className="card bg-base-100 shadow-xl mb-8">
                <div className="card-body text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Nessun dato disponibile</h3>
                    <p className="text-gray-500">Aggiungi delle spese per visualizzare i grafici</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <BarChart values={values} nordColors={nordColors}/>
            <PieChart values={values} nordColors={nordColors}/>
        </div>
    )
}

export default Chart;