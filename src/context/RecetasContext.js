import { createContext, useState, useEffect } from "react";

export const RecetasContext = createContext();

const RecetasProvider = (props) => {
  const [busqueda, buscarRecetas] = useState({
    nombre: "",
    categoria: "",
  });
  const [recetas, guardarRecetas] = useState([]);
  const [consultar, guardarConsultar] = useState(false);

  const { nombre, categoria } = busqueda;

  useEffect(() => {
    if (consultar) {
      const obtenerRecetas = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
        const resultado1 = await fetch(url);
        const resultado = await resultado1.json();
        //console.log(resultado.drinks);
        guardarRecetas(resultado.drinks);
      };

      obtenerRecetas();
    }
  }, [busqueda]);

  return (
    <RecetasContext.Provider
      value={{ recetas, buscarRecetas, guardarConsultar }}
    >
      {props.children}
    </RecetasContext.Provider>
  );
};

export default RecetasProvider;
