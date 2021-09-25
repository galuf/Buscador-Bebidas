import { createContext, useEffect, useState } from "react";

//crear el context
export const ModalContext = createContext();

const ModalProvider = (props) => {
  //State del provider
  const [idreceta, guardarIdReceta] = useState(null);
  const [informacionreceta, guardarReceta] = useState({});

  useEffect(() => {
    const obtenerReceta = async () => {
      if (!idreceta) return;

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
      const resultado = await fetch(url);
      const data = await resultado.json();

      //console.log(data.drinks[0]);
      guardarReceta(data.drinks[0]);
    };
    obtenerReceta();
  }, [idreceta]);

  return (
    <ModalContext.Provider
      value={{ informacionreceta, guardarIdReceta, guardarReceta }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
