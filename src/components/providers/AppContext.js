// MyContext.js
import React from 'react';
import {getDefaultConfiguration} from "../../utils/app_config";

const AppContext = React.createContext(getDefaultConfiguration());

export default AppContext;