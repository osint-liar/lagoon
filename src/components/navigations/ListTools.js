import {Box, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {List} from "reactstrap";
import {Link} from "react-router-dom";
import PieChartIcon from "@mui/icons-material/PieChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import MapIcon from "@mui/icons-material/Map";
import StorageIcon from "@mui/icons-material/Storage";
import React from "react";

/**
 * Left side menu
 * @returns {JSX.Element}
 * @constructor
 */
export default function ListTools(){
    return (
        <Box>
          <List component={'nav'}>
              <ListItem key={'Pie Charts'} component={Link} to={'/pie-charts'}>
                <ListItemIcon>
                  <PieChartIcon/>
                </ListItemIcon>
                <ListItemText primary={'Pie Charts'} />
              </ListItem>
              <ListItem key={'Bar Graphs'} component={Link} to={'/bar-charts'}>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary={'Bar Graphs'} />
              </ListItem>
              <ListItem key={'Maps'} component={Link} to={'/geo-locations'}>
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
              <ListItem key={'Calendar Timelines'} component={Link} to={'/calendar-timelines'}>
                <ListItemIcon>
                  <MapIcon />
                </ListItemIcon>
                <ListItemText primary={'Calendar Timelines'} />
              </ListItem>
              <ListItem key={'Timelines'} component={Link} to={'/vega-timelines'}>
                <ListItemIcon>
                  <MapIcon />
                </ListItemIcon>
                <ListItemText primary={'Timelines'} />
              </ListItem>

          </List>
        </Box>
    )
}