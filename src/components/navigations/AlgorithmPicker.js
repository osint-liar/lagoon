import {Autocomplete, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import charts from '../../configs/charts/index.json';

export default function AlgorithmPicker(props){

const location = useLocation();
const [options, setOptions] = useState(charts)

useEffect(() => {
    console.log('Location changed!', location.pathname);
    async function fetchData()
    {

    }

}, [location]);

    return (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options.map(o => { return {label:o.name, id:o.id} } )}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Select " />
        }
/>
    )

}