import React, {useContext, useEffect, useState} from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CssBaseline,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText, FormControl, InputLabel, Select, MenuItem, IconButton
} from '@mui/material';
import {fetchOsinLiarData} from "../../utils/data";
import ApplicationKeyTokenDialog from "../dialogs/ApplicationKeyTokenDialog";
import {getApplicationKeyToken, getDefaultConfiguration} from "../../utils/app_config";
import AppContext from "../providers/AppContext";


export default function Navigation(props) {

  const [caseManagements, setCaseManagements] = useState([])
  const [selectedCase, setSelectedCase] = useState({Uuid: 'INVALID', Name: null})
  const [isLoading, setIsLoading] = useState(true)
  const {appConfiguration, updateAppConfiguration} = useContext(AppContext);


  useEffect(() =>
  {
      async function fetchData() {
        setIsLoading(true)
        const data = await fetchOsinLiarData('{{WebHost}}v1/case-management', getDefaultConfiguration())

        if('Error' in data){
          const record = selectedCase // uses the default from the state
          setCaseManagements([record])
        }
        else {
          setCaseManagements(data.Records)
        }

        const currentCase = caseManagements[0]
        setSelectedCase(currentCase)
        if(!props.selectedCase){
          props.setSelectedCase = currentCase
        }
        let appConfig = {...appConfiguration}
        appConfig.SelectedCase = selectedCase
        updateAppConfiguration(appConfig)
        setIsLoading(false)
      }
      fetchData();
  }, []);


  const handleChange = (event) => {
    const found = caseManagements.find(c => c.Uuid === event.target.value)
    props.setSelectedCase(found)
    setSelectedCase(found)
    let appConfig = {...appConfiguration}
    appConfig.SelectedCase = {...found}
    updateAppConfiguration(appConfig)
  }

  if(isLoading){
    return <div></div>
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            OSINT LIAR's Lagoon
          </Typography>
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <FormControl variant="standard" sx={{ m: 0.5, ml:5, minWidth: 150, }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCase?.Uuid ?? ''}
              label="Select Case"
              onChange={handleChange}
              sx={{ color: 'white', borderBottom: '1px solid white' }} // Styling the select to match the AppBar color scheme
            >
                  {caseManagements &&
                    caseManagements.map((option) => (
                      <MenuItem key={option.Uuid} value={option.Uuid}>
                        {option.Name}
                      </MenuItem>
                    ))}
            </Select>
          </FormControl>
          <Box sx={{ justifyContent: 'end' }} >
          <ApplicationKeyTokenDialog />
          </Box>
        </Toolbar>
    </AppBar>
    <Toolbar/>
    </Box>
  );
}
