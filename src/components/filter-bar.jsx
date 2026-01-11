import {CATEGORIES} from "../data/expense.js";

function FilterBar({ searchText, setSearchText, category, setCategory }) {
    const hasFilter = searchText || category;

    function handleReset(){
        setCategory("");
        setSearchText("");

    }
    return (
        <div className="'filter-bar">
            <input
                value={searchText}
                placeholder="Cerca per testo..."
                onChange={(e) => setSearchText(e.target.value)}
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Seleziona Categoria</option>
                {
                    CATEGORIES.map(category => {
                        return <option key={category} value={category}>{category}</option>
                    })
                }
            </select>
            {
                hasFilter && (
                    <button type="button" onClick={handleReset}>
                        Reset
                    </button>
                )
            }
        </div>
    )
}

export default FilterBar;
