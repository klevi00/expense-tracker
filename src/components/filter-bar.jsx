import {CATEGORIES} from "../data/expense.js";

function FilterBar({ searchText, setSearchText, category, setCategory }) {
    const hasFilter = searchText || category;

    function handleReset(){
        setCategory("");
        setSearchText("");
    }
    
    return (
        <div className="card bg-base-100 shadow-lg mb-6">
            <div className="card-body p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <h2 className="card-title text-lg md:text-xl">Filtra Spese</h2>
                    </div>
                    {hasFilter && (
                        <div className="badge badge-primary gap-2">
                            <span>Filtri attivi</span>
                            <button 
                                type="button" 
                                onClick={handleReset}
                                className="btn btn-ghost btn-xs btn-circle"
                                title="Rimuovi tutti i filtri"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex flex-col md:flex-row gap-3 items-stretch">
                    <div className="form-control flex-1">
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchText}
                                placeholder="Cerca per descrizione..."
                                onChange={(e) => setSearchText(e.target.value)}
                                className="input input-bordered w-full pl-10 pr-10"
                            />
                            {searchText && (
                                <button 
                                    type="button"
                                    onClick={() => setSearchText("")}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-ghost btn-xs btn-circle"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="form-control flex-1">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="select select-bordered w-full h-12"
                        >
                            <option value="">Tutte le categorie</option>
                            {
                                CATEGORIES.map(cat => {
                                    return <option key={cat} value={cat}>{cat}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterBar;
