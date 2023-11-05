import React, { createContext, useState, useContext } from 'react';

const RegistroContext = createContext();

export const RegistroProvider = ({ children }) => {
  const [registroData, setRegistroData] = useState(null);

  const setRegistro = (data) => {
    setRegistroData(data);
  };
  
  return (
    <RegistroContext.Provider value={{ registroData, setRegistro }}>
      {children}
    </RegistroContext.Provider>
  );
};
export const useRegistro = () => {
  return useContext(RegistroContext);
};