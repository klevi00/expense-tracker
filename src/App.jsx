import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Chart from './components/chart';
import Header from './components/header';
import ExpenseForm from './components/expense-form';
import ExpenseList from './components/expense-list';
import FilterBar from './components/filter-bar';
import Dashboard from './components/dashboard';
function App() {

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    if(saved){
      return JSON.parse(saved);
    }
    return [];
  });
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

  //quando cambia uno degli array di dipendenze (expenses, category, searchText), viene effettuata la funzione dentro useMemo
  const filteredExpenses = useMemo(() => {
    return expenses
    .filter(exp => exp.description.toLowerCase().includes(searchText.toLowerCase()))
    .filter(exp => !category || exp.category === category);
  }, [expenses, category, searchText]);
  
  const [editingId, setEditingId] = useState(null);
  


  //esegue la funzione solo quando l'array che mettiamo come parametro finale cambia
  useEffect(() => {
    if(expenses?.length > 0){
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  }, [expenses]);

  const deleteExpense = (id) => {
    const confirmed = window.confirm(
      "Sei sicuro di voler eliminare questa spesa?"
    )
    if(confirmed){
    setExpenses(expenses.filter(exp => exp.id !== id));
    }
  }

  const editExpense = (id) => {
    setEditingId(id);
  }

  const saveExpense = (id, updatedData) => {
    setExpenses(expenses.map(exp => 
      exp.id === id
      ? {...exp, ...updatedData} //prendo i campi di exp e gli cambio i cami con updatedData
      : exp
    ))
    setEditingId(null);
  }

  const cancelEdit = () => {
    setEditingId(null);
  }
  return (
    <div className="min-h-screen bg-base-200">
      <Header title={"expenseTracker"}></Header>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Dashboard expenses = {expenses}/>
        {filteredExpenses.length > 0 && (
          <Chart expenses={filteredExpenses}/>
        )}
        <FilterBar category={category} setCategory={setCategory} searchText={searchText} setSearchText={setSearchText}/>
        {
          filteredExpenses.length === 0 && (searchText || category) 
          ?
          <div className="alert alert-warning shadow-lg mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>Nessuna spesa trovata per i criteri di ricerca impostati</span>
          </div>
          : 
          <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} onSave={saveExpense} onEdit={editExpense} editingId={editingId} onCancel = {cancelEdit}/>
        }
        <ExpenseForm setExpenses={setExpenses}></ExpenseForm>
      </div>
    </div>
  )
}

export default App;
