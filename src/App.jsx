import { useEffect, useMemo, useState } from 'react'
import './App.css'

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
    <>
      <Header title={"expenseTracker"}></Header>
      <Dashboard expenses = {expenses}/>
      <FilterBar category={category} setCategory={setCategory} searchText={searchText} setSearchText={setSearchText}/>
      {
        filteredExpenses.length === 0 && (searchText || category) 
        ?
        <p>Nessuna spesa trovata per i criteri di ricerca impostati</p>
        : 
        <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} onSave={saveExpense} onEdit={editExpense} editingId={editingId} onCancel = {cancelEdit}/>
      }
      <ExpenseForm setExpenses={setExpenses}></ExpenseForm>
    </>
  )
}

export default App;
