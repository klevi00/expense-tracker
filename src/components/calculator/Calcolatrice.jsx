import Bottone from './Bottone'
import Display from './Display';
import { useState  } from 'react';
function Calcolatrice() {
  const [risultato, setRisultato] = useState("");

  function gestisciValore(valore) {
    switch (valore) {
      case "=":
        if (!risultato) return;
        try {
          setRisultato(String(eval(risultato)));
        } catch {
          setRisultato("Errore");
        }
        break;
      case "C":
        setRisultato("");
        break;
      case "DEL":
        setRisultato(risultato.slice(0, -1));
        break;
      default:
        if (valore === "0") {
          const ultimo_carattere = risultato.slice(-1);
          if (risultato === "" || ["+", "-", "/", "*"].includes(ultimo_carattere)) {
            setRisultato(risultato + valore);
          } else {
            const ultimo_numero = risultato.split(/[\+\-\*\/]/).pop();
            if (ultimo_numero !== "0" && !/^0+$/.test(ultimo_numero)) {
              setRisultato(risultato + valore);
            }
          }
        } else {
          const ultimo_numero = risultato.split(/[\+\-\*\/]/).pop();
          if (/^0+$/.test(ultimo_numero)) {
            setRisultato(risultato.slice(0, -ultimo_numero.length) + valore);
          } else {
            setRisultato(risultato + valore);
          }
        }
        break;
    }
  }

  const bottoni = [
    "C", "DEL", "/", "*",
    "7", "8", "9", "-",
    "4", "5", "6", "+",
    "1", "2", "3", "=",
    "0"
  ];

  return (
    <div className="max-w-80 mx-auto p-6  bg-base-100 rounded-xl shadow-2xl">
      <h1 className=" font-bold text-center mb-6 text-primary">Calcolatrice</h1>
      
      <Display valore={risultato} />
      
      <div className="grid grid-cols-4 gap-2">
        {bottoni.map((b, index) => (
          <Bottone key={`${b}-${index}`} valore={b} onClick={gestisciValore} />
        ))}
      </div>
    </div>
  );
}

export default Calcolatrice