import React, {useState, StrictMode} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

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
import DataPanoramaPicker from "./components/navigations/DataPanoramaPicker";
import Paper from "@mui/material/Paper";
import PieChart from "./components/charts/PieChart";
import ListTools from "./components/navigations/ListTools";
import Grid from "@mui/material/Grid";
import AppProvider from "./components/providers/AppProvider";
import Mustache from "mustache";
import TimelineRouter from "./components/timelines/TimelineRouter";
import CalHeatmapTimeline from "./components/timelines/CalHeatmapTimeline";
import LeafletMap from "./components/geomaps/LeafletMap";
initFontAwesome();


// standardize how mustache handles text across the app.
Mustache.escape = function (text) { return text; }


const App = () => {
  const [selectedCase, setSelectedCase] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null)

  return (
      <StrictMode>
        <ThemeProvider theme={theme}>
            <Box>
                <Navigation
                    selectedCase={selectedCase}
                    setSelectedCase={setSelectedCase}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
                { !isLoading && selectedCase ?
                    <Router>
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                                <Paper elevation={3} sx={{margin: 0.5, padding: 0}}>
                                    <ListTools/>
                                </Paper>
                            </Grid>
                            <Grid item xs={10}>
                                <Paper elevation={3} sx={{margin: 1, padding: 0}}>
                                    <DataPanoramaPicker
                                        setSelectedAlgorithm={setSelectedAlgorithm}
                                        selectedCase={selectedCase}
                                    />
                                </Paper>
                                <Paper elevation={3} sx={{margin: 1, padding: 0}}>
                                    <Box sx={{minHeight: '60vh'}}> {/* Adjust styling as needed */}
                                        <Routes>
                                            <Route path="/" element={<Home/>}/>
                                            <Route path="/about" element={<About/>}/>
                                            <Route path={"/sql-editor"} element={<SqlEditor/>}/>
                                            <Route path={"/pie-charts"} element={
                                                <PieChart
                                                    selectedCase={selectedCase}
                                                    selectedAlgorithm={selectedAlgorithm}/>}
                                            />
                                            <Route path={"/geomaps"}
                                                   element={<LeafletMap center={[51.505, -0.09]} zoom={13}/>}/>
                                            <Route path={"/timelines"} element={<CalHeatmapTimeline/>}/>
                                            <Route path={"/bar-charts"} element={<SqlEditor/>}/>
                                        </Routes>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Router>
                : <div></div>
                }
            </Box>
        </ThemeProvider>
      </StrictMode>
  );
};

export default App;