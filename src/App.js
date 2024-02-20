import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";

import Home from "./components/views/Home";
import About from "./components/views/About";
import Navigation from "./components/navigations/Navigation";
import { ThemeProvider } from '@mui/material/styles';
import theme from './utils/theme'
import MainLayout from './components/layouts/MainLayout'; // Import your two-column layout component

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import SqlEditor from "./components/editors/SqlEditor";
import {Box} from "@mui/system";
import AlgorithmPicker from "./components/navigations/AlgorithmPicker";
initFontAwesome();

const configuration = {
    WebHost : "http://127.0.0.1:9906/"
}

const App = () => {
  const [selectedCase, setSelectedCase] = useState({})
  const [token, setToken] = useState('OSINT_LIAR_9ugIHh9VoS_rff4w+CuP~bahAgy+9ie=15j-HCo^IKHiESc*BEYiC^~u!_94-cmU')
  const [isLoading, setIsLoading] = useState(false)

  return (
    <ThemeProvider theme={theme}>
        <Box>
            <Router>
                <Navigation
                    configuration={configuration}
                    token={token}
                    setToken={setToken}
                    selectedCase={selectedCase}
                    setSelectedCase={setSelectedCase}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
                <AlgorithmPicker />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path={"/sql-editor"} element={<SqlEditor />} />
                  <Route path={"/pie-charts"} element={<SqlEditor />} />
                  <Route path={"/bar-charts"} element={<SqlEditor />} />
                </Routes>
            </Router>
        </Box>
    </ThemeProvider>
  );
};

export default App;