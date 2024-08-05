import {Autocomplete, TextField} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import pieCharts from "../../configs/data-visualizations/charts/pie-charts/pie.json";
import sqlEditorData from "../../configs/data-visualizations/sql-editor.json"
import {fetchOsintLiarData} from "../../utils/data";
import Mustache from 'mustache';

/**
 * This function controls what available options for viewing the data are available.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function DataPanoramaPicker(props){
    const {setSelectedAlgorithm, selectedCase} = props
    const location = useLocation();
    const options = [...pieCharts, ...sqlEditorData]
    const [value, setValue] = useState(null)
    useEffect(() => {
        async function fetchData(){
            const pathName = location.pathname
            console.log('Location changed!', pathName);
        }
        fetchData()

    }, [location, selectedCase]);

    const updateAlgorithm = async (selectedValue) => {
        setValue(selectedValue);
        let algorithm = {...options.find(o => o.id === selectedValue.id)}

        let dataUrl = Mustache.render(algorithm.dataUrl, {
            WebHost: 'http://127.0.0.1:9906/',
            CaseManagementUuid: selectedCase.Uuid,
            SqlQuery: encodeURIComponent(algorithm.sql)
        });

        // only fetch the data for non-sql editor components
        if(location.pathname !== '/sql-editor'){
            const data = await fetchOsintLiarData(dataUrl, {})
            algorithm.specification.data.values = data.Records
        }
        setSelectedAlgorithm(algorithm);
    }

    return (
        <Autocomplete
          disablePortal
          value={value}
          onChange={(event, newValue) => {
              updateAlgorithm(newValue)
          }}
          id="combo-box-demo"
          options={options.filter(o => o.route === location.pathname).map(o => { return { label:o.title, id:o.id } } )}
          renderInput={(params) => <TextField {...params} label="Select A Data Panoramic" />}
        />
    )
}