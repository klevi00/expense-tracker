import {CATEGORIES} from "../data/expense.js";

function FilterBar({ searchText, setSearchText, category, setCategory }) {
    const hasFilter = searchText || category;

    function handleReset(){
        setCategory("");
        setSearchText("");

    }
    return (
        <div className="card bg-base-100 shadow-lg mb-6">
            <div className="card-body">
                <h2 className="card-title text-xl mb-4">Filtra Spese</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="form-control flex-1">
                        <input
                            type="text"
                            value={searchText}
                            placeholder="Cerca per testo..."
                            onChange={(e) => setSearchText(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control flex-1">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="select select-bordered w-full"
                        >
                            <option value="">Seleziona Categoria</option>
                            {
                                CATEGORIES.map(category => {
                                    return <option key={category} value={category}>{category}</option>
                                })
                            }
                        </select>
                    </div>
                    {
                        hasFilter && (
                            <button type="button" onClick={handleReset} className="btn btn-outline">
                                Reset
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default FilterBar;
