import type { Person } from "./typeAlias";


const API_URL = "http://localhost:3333"
/*📌 Milestone 3
Crea una funzione getActress che, dato un id, effettua una chiamata a:

GET /actresses/:id
La funzione deve restituire l’oggetto Actress, se esiste, oppure null se non trovato.

Utilizza un type guard chiamato isActress per assicurarti che la struttura del dato ricevuto sia corretta.

*/

function isActress(dati: unknown): dati is Actress {


  if (
    dati &&
    typeof dati === "object" &&
    "id" in dati &&
    typeof dati.id === "number" &&
    "name" in dati &&
    typeof dati.name === "string" &&
    "birth_year" in dati &&
    typeof dati.birth_year === "number" &&
    (!("death_year" in dati) ||
      typeof dati.death_year === "number") &&
    "biography" in dati &&
    typeof dati.biography === "string" &&
    "image" in dati &&
    typeof dati.image === "string" &&
    "most_famous_movies" in dati &&
    Array.isArray(dati.most_famous_movies) &&
    dati.most_famous_movies.length === 3 &&
    "awards" in dati &&
    typeof dati.awards === "string" &&
    "nationality" in dati &&
    typeof dati.nationality === "string"
  ) {
    return true;

  }

  return false;
}


async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`${API_URL}/actresses/${id}`);
    if (!response.ok) {
      throw new Error(`Errore HTTP ${response.status} : ${response.statusText}`)
    }
    const dati: unknown = await response.json()
    if (isActress(dati)) {
      return dati as Actress;
    }
    throw new Error('Formato dei dati non valido')
  } catch (errore) {
    console.error(errore);
    return null
  }
}



/*📌 Milestone 4
Crea una funzione getAllActresses che chiama:

GET /actresses
La funzione deve restituire un array di oggetti Actress.

Può essere anche un array vuoto.

*/






/* Milestone 5
Crea una funzione getActresses che riceve un array di numeri (gli id delle attrici).

Per ogni id nell’array, usa la funzione getActress che hai creato nella Milestone 3 per recuperare l’attrice corrispondente.

L'obiettivo è ottenere una lista di risultati in parallelo, quindi dovrai usare Promise.all.

La funzione deve restituire un array contenente elementi di tipo Actress oppure null (se l’attrice non è stata trovata).

*/
