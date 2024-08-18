import {Autocomplete, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import pieCharts from "../../configs/data-visualizations/pie.json";
import sqlEditorData from "../../configs/data-visualizations/sql-editor.json";
import timelineData from "../../configs/data-visualizations/timelines.json";
import geoLocationData from "../../configs/data-visualizations/geo-locations.json";
import vegaTimelineData from "../../configs/data-visualizations/vega-timelines.json"
import barChartData from "../../configs/data-visualizations/bar-charts.json"
import {fetchOsintLiarData} from "../../utils/data";
import Mustache from 'mustache';

/**
 * This function controls what available options for viewing the data are available.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function DataPanoramaPicker(props){
    const {setSelectedAlgorithm, selectedCase, setCenter} = props
    const location = useLocation();
    // merge data sets together
    const options = [...pieCharts, ...sqlEditorData, ...timelineData, ...geoLocationData, ...vegaTimelineData, ...barChartData]
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
            console.log(`Records returned`, data.Records);
            algorithm.specification.data.values = data.Records
            if(data.Records.length > 0 && location.pathname === '/geo-locations'){
                setCenter([data.Records[0].ContentLatitude, data.Records[0].ContentLongitude]);
            }
        }
        else if(location.pathname === '/vega-timelines'){
            const data = await fetchOsintLiarData(dataUrl, {})
            console.log(`Records returned`, data.Records);
            algorithm.specification.data.values.people = data.Records

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