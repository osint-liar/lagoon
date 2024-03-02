import {Autocomplete, TextField} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import AppContext from "../providers/AppContext";
import * as uuid from "uuid";

export default function DataPanoramaPicker(props){

    const location = useLocation();
    const [options, setOptions] = useState([])
    const [value, setValue] = useState(null)
    const {appConfiguration, updateAppConfiguration} = useContext(AppContext);

    useEffect(() => {
        async function fetchData(){
            const pathName = location.pathname
            console.log('Location changed!', pathName);
            try {
              const response = await fetch('/data/dv-index.json?cache='+ uuid.v4());
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
            const jsonData = await response.json();

            console.log(jsonData);

            setValue(null)
            console.log(`Filtered on ${pathName}`)

            const filtered = jsonData.filter(dv => dv.route === pathName) ?? []
            setOptions(filtered)

            } catch (error){
              setOptions([])
              console.error("Could not fetch JSON data:", error);
            }
        }
        fetchData()

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
          renderInput={(params) => <TextField {...params} label="Select A Data Panoramic" />}
        />
    )

}