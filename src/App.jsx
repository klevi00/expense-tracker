import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Chart from './components/chart';
import Header from './components/header';
import ExpenseForm from './components/expense-form';
import ExpenseList from './components/expense-list';
import FilterBar from './components/filter-bar';
import Dashboard from './components/dashboard';
import Auth from './components/auth';
import {pb} from './lib/pocketbase';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshExpenses = async () => {
    if (!pb.authStore.isValid) {
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
  
      let records;
      try {
        // First try: Standard relation filter (most efficient)
        records = await pb.collection('expenses').getFullList({
          sort: '-created',
        });
      } catch (filterErr) {
        console.warn('Filter failed, trying client-side filtering:', filterErr);
        
        // Fallback: Get all records and filter client-side
        // This works but is less efficient - configure PocketBase rules for better performance
        const allRecords = await pb.collection('expenses').getFullList({
          sort: '-created',
        });
        
      }
      setExpenses(records);
    } catch (err) {
      console.error('Errore nel recupero delle spese:', err);
      // Ignore abort errors (they're expected during cleanup)
      if (err.name === 'AbortError' || err.message?.includes('autocancelled')) {
        return;
      }
      let errorMessage = '';
      if (err.status === 404) {
        errorMessage = `404 - La collezione "expenses" non esiste in PocketBase. URL: ${pb.baseUrl}`;
      } else if (err.status === 0 || err.message?.includes('Failed to fetch')) {
        errorMessage = `Impossibile connettersi a PocketBase. URL configurato: ${pb.baseUrl}. Verifica che il server sia avviato.`;
      } else if (err.status === 400) {
        errorMessage = `Errore nella richiesta (400). Verifica che il campo "user" esista nella collezione "expenses" e sia configurato come relazione con "users". Dettagli: ${err.message || 'Bad Request'}`;
      } else if (err.status === 401 || err.status === 403) {
        errorMessage = 'Non autorizzato. Effettua il login.';
        pb.authStore.clear();
        setUser(null);
      } else {
        errorMessage = `Errore ${err.status || 'sconosciuto'}: ${err.message || JSON.stringify(err)}`;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Check authentication status on mount
  useEffect(() => {
    // Check if user is already authenticated (from localStorage)
    // PocketBase automatically stores auth tokens in localStorage
    // This means: Login once per device, stay logged in forever (until logout)
    const checkAuth = async () => {
      try {
        // Check if we have a valid token stored in localStorage
        if (pb.authStore.isValid && pb.authStore.model) {
          // Try to refresh the token to ensure it's still valid
          try {
            await pb.collection('users').authRefresh();
          } catch (refreshErr) {
            // If refresh fails, token might be expired - clear it
            console.log('Token refresh failed, clearing auth:', refreshErr);
            pb.authStore.clear();
            setUser(null);
            setIsAuthLoading(false);
            return;
          }
          
          setUser(pb.authStore.model);
          refreshExpenses();
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Errore nel controllo autenticazione:', err);
        setUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes (e.g., token refresh, logout)
    // This ensures the UI updates when auth state changes
    const unsubscribe = pb.authStore.onChange((token, model) => {
      setUser(model);
      if (model) {
        refreshExpenses();
      } else {
        setExpenses([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleAuthSuccess = () => {
    setUser(pb.authStore.model);
    setIsAuthLoading(false);
    refreshExpenses();
  };

  const handleLogout = () => {
    pb.authStore.clear();
    setUser(null);
    setExpenses([]);
  };

  //quando cambia uno degli array di dipendenze (expenses, category, searchText), viene effettuata la funzione dentro useMemo
  const filteredExpenses = useMemo(() => {
    return expenses
    .filter(exp => exp.description.toLowerCase().includes(searchText.toLowerCase()))
    .filter(exp => !category || exp.category === category);
  }, [expenses, category, searchText]);

  const deleteExpense = async (id) => {
    const confirmed = window.confirm(
      "Sei sicuro di voler eliminare questa spesa?"
    );
    if (confirmed) {
      try {
        await pb.collection('expenses').delete(id);
        await refreshExpenses();
      } catch (err) {
        console.error('Errore nell\'eliminazione della spesa:', err);
        if (err.status === 401 || err.status === 403) {
          alert('Non autorizzato. Effettua il login.');
          pb.authStore.clear();
          setUser(null);
        } else {
          alert('Errore nell\'eliminazione della spesa. Riprova.');
        }
      }
    }
  }

  const editExpense = (id) => {
    setEditingId(id);
  }

  const saveExpense = async (id, updatedData) => {
    try {
      await pb.collection('expenses').update(id, {
        description: updatedData.description,
        amount: Number(updatedData.amount),
        category: updatedData.category
      });
      await refreshExpenses();
      setEditingId(null);
    } catch (err) {
      console.error('Errore nell\'aggiornamento della spesa:', err);
      if (err.status === 401 || err.status === 403) {
        alert('Non autorizzato. Effettua il login.');
        pb.authStore.clear();
        setUser(null);
      } else {
        alert('Errore nell\'aggiornamento della spesa. Riprova.');
      }
    }
  }

  const cancelEdit = () => {
    setEditingId(null);
  }
  // Show auth screen if not authenticated
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Header title={"expenseTracker"} user={user} onLogout={handleLogout}></Header>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {error && (
          <div className="alert alert-error shadow-lg mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <h3 className="font-bold">Errore di connessione PocketBase</h3>
              <div className="text-sm mt-1 font-mono bg-base-200 p-2 rounded">{error}</div>
              <div className="text-xs mt-3">
                <strong>URL attuale:</strong> <span className="font-mono">{pb.baseUrl}</span>
              </div>
              <div className="text-xs mt-2">
                <strong>Per risolvere:</strong>
                <ol className="list-decimal list-inside mt-1 space-y-1">
                  <li>Assicurati che PocketBase sia avviato</li>
                  <li>Apri l'admin panel: <a href={pb.baseUrl + '/_/'} target="_blank" rel="noopener noreferrer" className="link link-primary">{pb.baseUrl}/_/</a></li>
                  <li>Crea una collezione chiamata <strong>"expenses"</strong> (nome esatto, minuscolo)</li>
                  <li>Aggiungi i campi: <strong>description</strong> (text), <strong>amount</strong> (number), <strong>category</strong> (text)</li>
                  <li>Imposta i permessi della collezione su "Public" (o configura l'autenticazione)</li>
                  <li>Verifica che VITE_POCKETBASE_URL nel file .env sia corretto e riavvia il dev server</li>
                </ol>
              </div>
              <button className="btn btn-sm btn-primary mt-2" onClick={refreshExpenses}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Riprova connessione
              </button>
            </div>
            <button className="btn btn-sm btn-ghost" onClick={() => setError(null)}>✕</button>
          </div>
        )}
        {isLoading && !error && (
          <div className="alert alert-info shadow-lg mb-6">
            <span className="loading loading-spinner loading-sm"></span>
            <span>Connessione a PocketBase...</span>
          </div>
        )}
        {/* Dashboard Overview */}
        <Dashboard expenses = {expenses}/>
        
        {/* Quick Add Form - Easy access at the top */}
        <ExpenseForm onExpenseAdded={refreshExpenses}></ExpenseForm>
        
        {/* Filter Controls */}
        <FilterBar category={category} setCategory={setCategory} searchText={searchText} setSearchText={setSearchText}/>
        
        {/* Charts Visualization */}
        {filteredExpenses.length > 0 && (
          <Chart expenses={filteredExpenses}/>
        )}
        
        {/* Expense List or Empty State */}
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
      </div>
    </div>
  )
}

export default App;
