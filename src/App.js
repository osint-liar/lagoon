import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";

import Home from "./components/views/Home";
import About from "./components/views/About";
import Navigation from "./components/navigations/Navigation";
import { ThemeProvider } from '@mui/material/styles';
import theme from './utils/theme'

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import SqlEditor from "./components/editors/SqlEditor";
import {Box} from "@mui/system";
import AlgorithmPicker from "./components/navigations/AlgorithmPicker";
import Paper from "@mui/material/Paper";
import PieChart from "./components/charts/PieChart";
import ListTools from "./components/navigations/ListTools";
import Grid from "@mui/material/Grid";
import {setApplicationToken, getApplicationKeyToken, getDefaultConfiguration} from "./utils/app_config";
import AppProvider from "./components/providers/AppProvider";
import Mustache from "mustache";
initFontAwesome();


// standardize how mustache handles text across the app.
Mustache.escape = function (text) { return text; }


const App = () => {
  const [selectedCase, setSelectedCase] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState(getApplicationKeyToken())
  const [configuration, setConfiguration] = useState(getDefaultConfiguration())
  const [algorithm, setAlgorithm] = useState({})


  return (
    <ThemeProvider theme={theme}>
        <AppProvider>
            <Box>
                <Navigation
                    selectedCase={selectedCase}
                    setSelectedCase={setSelectedCase}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
                <Router>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <Paper elevation={3} sx={{ margin: 0.5, padding: 0 }}>
                            <ListTools />
                        </Paper>
                    </Grid>
                    <Grid item xs={10}>
                        <Paper elevation={3} sx={{ margin: 1, padding: 0 }}>
                            <AlgorithmPicker />
                        </Paper>
                        <Paper elevation={3} sx={{ margin: 1, padding: 0 }}>
                          <Box sx={{ minHeight: '60vh' }}> {/* Adjust styling as needed */}
                            <Routes>
                              <Route path="/" element={<Home />} />
                              <Route path="/about" element={<About />} />
                              <Route path={"/sql-editor"} element={<SqlEditor />} />
                              <Route path={"/pie-charts"} element={<PieChart algorithm={algorithm}/>} />
                              <Route path={"/bar-charts"} element={<SqlEditor />} />
                            </Routes>
                          </Box>
                        </Paper>
                    </Grid>
                </Grid>
                </Router>
            </Box>
        </AppProvider>
    </ThemeProvider>
  );
};

export default App;