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
import {setApplicationToken, getApplicationToken, getConfiguration} from "./utils/applicationToken";
initFontAwesome();

// set the application token
setApplicationToken('OSINT_LIAR_9ugIHh9VoS_rff4w+CuP~bahAgy+9ie=15j-HCo^IKHiESc*BEYiC^~u!_94-cmU')

const App = () => {
  const [selectedCase, setSelectedCase] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState(getApplicationToken())
  const [configuration, setConfiguration] = useState(getConfiguration())

  return (
    <ThemeProvider theme={theme}>
        <Box>
            <Navigation
                configuration={configuration}
                token={token}
                setToken={setToken}
                selectedCase={selectedCase}
                setSelectedCase={setSelectedCase}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
            <Router>
            <Grid container spacing={1}>
                <Grid item xs={1}>
                    <ListTools />
                </Grid>
                <Grid item xs={11}>
                    <Paper elevation={3} sx={{ margin: 1, padding: 1 }}>
                        <AlgorithmPicker />
                    </Paper>
                    <Paper elevation={3} sx={{ margin: 1, padding: 1 }}>
                      <Box sx={{ minHeight: '60vh' }}> {/* Adjust styling as needed */}
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/about" element={<About />} />
                          <Route path={"/sql-editor"} element={<SqlEditor />} />
                          <Route path={"/pie-charts"} element={<PieChart />} />
                          <Route path={"/bar-charts"} element={<SqlEditor />} />
                        </Routes>
                      </Box>
                    </Paper>
                </Grid>
            </Grid>
            </Router>
        </Box>
    </ThemeProvider>
  );
};

export default App;