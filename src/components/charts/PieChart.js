import Typography from "@mui/material/Typography";
import {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import AppContext from "../providers/AppContext";
import {fetchOsinLiarData} from "../../utils/data";
import Mustache from 'mustache';
import VegaChart from "./VegaChart";


const PieChart = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {appConfiguration, updateAppConfiguration} = useContext(AppContext);
  const [selected, setSelected] = useState({title:''})
  const [records, setRecords] = useState([])

  const location = useLocation();

  useEffect(() =>
  {
      async function fetchData() {
        setIsLoading(true)
        if(appConfiguration.Algorithm && location.pathname === '/pie-charts' && appConfiguration.SelectedCase?.Name !== null){
            console.log(`Updating pie chart`)
            let tmp = {...appConfiguration.Algorithm}

            let dataUrl = Mustache.render(tmp.dataUrl, {
                WebHost: appConfiguration.WebHost,
                CaseManagementUuid: appConfiguration.SelectedCase.Uuid,
                SqlQuery: encodeURIComponent(appConfiguration.Algorithm.sql)
            })
            tmp.dataUrl = dataUrl
            const data = await fetchOsinLiarData(tmp.dataUrl, appConfiguration)
            setRecords(data.Records)
            console.log(tmp.specification)
            setSelected(tmp)
            setIsLoading(false)
        }
        else
        {

        }

      }
      fetchData();
  }, [appConfiguration, location]);


  if(!appConfiguration.Algorithm){
      return (
          <Typography variant="h3">
            Select an algorithm
          </Typography>
      )
  }
  return (
      <>
          <span>You selected {selected.title ?? ''}</span>
           <VegaChart spec={selected.specification} />
      </>
  )


}

export default PieChart