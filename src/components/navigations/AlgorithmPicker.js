import {Autocomplete, TextField} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import charts from '../../configs/charts/index.json';
import AppContext from "../providers/AppContext";

export default function AlgorithmPicker(props){

    const location = useLocation();
    const [options, setOptions] = useState([])
    const [value, setValue] = useState(null)
    const {appConfiguration, updateAppConfiguration} = useContext(AppContext);

    useEffect(() => {
        console.log('Location changed!', location.pathname);
        setValue(null)
        // transform
        setOptions(charts)
        // unset the existing algorithm

    }, [location]);

    const updateAlgorithm = (selectedValue) => {
        setValue(selectedValue);
        let appConfig = {...appConfiguration}
        const algorithm = options.find(o => o.id === selectedValue.id)
        appConfig.Algorithm = algorithm
        updateAppConfiguration(appConfig)
    }


    return (
        <Autocomplete
          disablePortal
          value={value}
          onChange={(event, newValue) => {
              updateAlgorithm(newValue)
          }}
          id="combo-box-demo"
          options={options.map(o => { return { label:o.title, id:o.id } } )}
          renderInput={(params) => <TextField {...params} label="Select an Algorithm" />}
        />
    )

}