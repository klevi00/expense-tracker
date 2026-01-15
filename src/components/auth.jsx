import { useState } from "react";
import { pb } from "../lib/pocketbase";

function Auth({ onAuthSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const authData = await pb.collection('users').authWithPassword(email, password);
            console.log('Login successful:', authData);
            if (onAuthSuccess) {
                onAuthSuccess();
            }
        } catch (err) {
            console.error('Errore nel login:', err);
            let errorMsg = 'Errore durante il login. Verifica email e password.';
            if (err.status === 400) {
                errorMsg = 'Email o password non validi.';
            } else if (err.status === 404) {
                errorMsg = 'Utente non trovato. Verifica l\'email.';
            } else if (err.message) {
                errorMsg = err.message;
            }
            setError(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (password !== passwordConfirm) {
            setError('Le password non corrispondono');
            setIsLoading(false);
            return;
        }

        if (password.length < 8) {
            setError('La password deve essere di almeno 8 caratteri');
            setIsLoading(false);
            return;
        }

        try {
            // Create user account
            const userData = {
                email,
                password,
                passwordConfirm
            };
            
            // Add name if provided
            if (name && name.trim()) {
                userData.name = name.trim();
            }
            
            await pb.collection('users').create(userData);
            console.log('Registration successful');

            // Automatically login after registration
            const authData = await pb.collection('users').authWithPassword(email, password);
            console.log('Auto-login after registration:', authData);
            
            if (onAuthSuccess) {
                onAuthSuccess();
            }
        } catch (err) {
            console.error('Errore nella registrazione:', err);
            let errorMsg = 'Errore durante la registrazione. Riprova.';
            if (err.status === 400) {
                errorMsg = 'Dati non validi. Verifica email e password.';
            } else if (err.data?.email) {
                errorMsg = `Email: ${err.data.email.message || 'Email già in uso'}`;
            } else if (err.message) {
                errorMsg = err.message;
            }
            setError(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="card bg-base-100 shadow-xl w-full max-w-md">
                <div className="card-body">
                    <h2 className="card-title text-2xl mb-2 justify-center">
                        {isLogin ? 'Accedi' : 'Registrati'}
                    </h2>
                    <p className="text-xs text-center text-base-content/60 mb-4">
                        {isLogin 
                            ? 'Rimarrai connesso su questo dispositivo' 
                            : 'Crea un account per sincronizzare i tuoi dati su tutti i dispositivi'}
                    </p>
                    
                    {error && (
                        <div className="alert alert-error mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    {isLogin ? (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nome@esempio.com"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-primary w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Accesso in corso...
                                    </>
                                ) : (
                                    'Accedi'
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Nome (opzionale)</span>
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Il tuo nome"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nome@esempio.com"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Minimo 8 caratteri"
                                    className="input input-bordered"
                                    required
                                    minLength={8}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Conferma Password</span>
                                </label>
                                <input
                                    type="password"
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    placeholder="Ripeti la password"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-primary w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Registrazione in corso...
                                    </>
                                ) : (
                                    'Registrati'
                                )}
                            </button>
                        </form>
                    )}

                    <div className="divider">oppure</div>
                    
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError("");
                            setEmail("");
                            setPassword("");
                            setPasswordConfirm("");
                            setName("");
                        }}
                        className="btn btn-ghost w-full"
                    >
                        {isLogin ? 'Non hai un account? Registrati' : 'Hai già un account? Accedi'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Auth;
