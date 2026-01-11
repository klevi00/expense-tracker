import { useState } from 'react';
import Calcolatrice from './calculator/Calcolatrice'
function Header({title}){
    const [isModalOpen, setIsModalOpen] = useState(false);

    return(
        <>
            <header className="navbar bg-base-100 border-b border-base-300 shadow-md sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
                <div className="navbar-start px-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-primary-content">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-base-content">Expense Tracker</h1>
                            <p className="text-xs text-base-content/70 font-normal">Manage your finances</p>
                        </div>
                    </div>
                </div>
                <div className="navbar-end px-4">
                    <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <img fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"src="https://img.icons8.com/external-vectorslab-glyph-vectorslab/53/external-Calculator-business-marketing-vectorslab-glyph-vectorslab.png" alt="external-Calculator-business-marketing-vectorslab-glyph-vectorslab"/>
                        
                    </button>
                </div>
            </header>

            
            <dialog className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
                <div className="modal-box">
                    <form method="dialog">
                        <button 
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✕
                        </button>
                    </form>
                    <div className="card bg-base-80 shadow-none border-0">
                        <div className="card-body p-0">
                            <Calcolatrice/>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default Header;