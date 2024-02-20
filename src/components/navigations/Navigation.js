import React, {useEffect, useState} from "react";
import MailIcon from '@mui/icons-material/Mail';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import StorageIcon from '@mui/icons-material/Storage';
import MapIcon from '@mui/icons-material/Map';
import { Link } from 'react-router-dom';

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
  ListItemText, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import {List} from "reactstrap";
import {fetchOsinLiarData} from "../../utils/data";


const drawerWidth = 240;

export default function Navigation(props) {

  const [caseManagements, setCaseManagements] = useState([])
  const [selectedCase, setSelectedCase] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() =>
  {
      async function fetchData() {
        setIsLoading(true)
        const data = await fetchOsinLiarData('{{WebHost}}v1/case-management', props.configuration, props.token)
        setCaseManagements(data.Records)
        setSelectedCase(data.Records[0])
        if(!props.selectedCase){
          props.setSelectedCase = data.Records[0]
        }
        setIsLoading(false)
      }
      fetchData();
  }, []);

  useEffect(() =>
  {
      async function fetchData() {
        setIsLoading(true)
        const data = await fetchOsinLiarData('{{WebHost}}v1/case-management', props.configuration, props.token)
        setCaseManagements(data.Records)
        setSelectedCase(data.Records[0])
        if(!props.selectedCase){
          props.setSelectedCase = data.Records[0]
        }
        setIsLoading(false)
      }
      fetchData();
  }, []);


  const handleChange = (event) => {
    const found = caseManagements.find(c => c.Uuid === event.target.value)
    props.setSelectedCase(found)
    setSelectedCase(found)
  }

  if(isLoading){
    return <div></div>
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            OSINT LIAR's Lagoon
          </Typography>
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Options</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCase.Uuid}
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
        </Toolbar>

    </AppBar>
      <Drawer
        anchor={'left'}
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        open
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List component={'nav'}>
              <ListItem key={'Pie Charts'} component={Link} to={'/pie-charts'}>
                <ListItemIcon>
                  <PieChartIcon/>
                </ListItemIcon>
                <ListItemText primary={'Pie Charts'} />
              </ListItem>
              <ListItem key={'Bar Graphs'} component={Link} to={'/bar-graphs'}>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary={'Bar Graphs'} />
              </ListItem>
              <ListItem key={'Maps'} component={Link} to={'/maps'}>
                <ListItemIcon>
                  <MapIcon />
                </ListItemIcon>
                <ListItemText primary={'Maps'} />
              </ListItem>
              <ListItem key={'Sql Editor'} component={Link} to={'/sql-editor'}>
                <ListItemIcon>
                  <StorageIcon />
                </ListItemIcon>
                <ListItemText primary={'Sql Editor'} />
              </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
