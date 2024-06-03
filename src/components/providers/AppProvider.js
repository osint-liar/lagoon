
import React, { useState } from 'react';
import {getDefaultConfiguration} from "../../utils/app_config";
import AppContext from './AppContext'

const AppProvider = ({ children }) => {
  const [appConfiguration, setAppConfiguration] = useState(getDefaultConfiguration());

  const updateAppConfiguration = (newValue) => {
    setAppConfiguration(newValue)
  }

  return (
    <AppContext.Provider value={{ appConfiguration, updateAppConfiguration }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider

