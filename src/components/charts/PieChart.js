import Typography from "@mui/material/Typography";
import {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import VegaChart from "./VegaChart";


const PieChart = (props) => {
  const { selectedCase, selectedAlgorithm } = props;
  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState({title:''})

  const location = useLocation();

  useEffect(() =>
  {
      async function fetchData() {
        setIsLoading(true)
        if(location.pathname === '/pie-charts'){
            /*
            let tmp = {...appConfiguration.Algorithm}

            let dataUrl = Mustache.render(tmp.dataUrl, {
                WebHost: appConfiguration.WebHost,
                CaseManagementUuid: appConfiguration.SelectedCase.Uuid,
                SqlQuery: encodeURIComponent(appConfiguration.Algorithm.sql)
            })
            tmp.dataUrl = dataUrl
            const data = await fetchOsintLiarData(tmp.dataUrl, appConfiguration)
            console.log(tmp.specification)
            tmp.specification.data.values = data.Records
            setSelected(tmp)

             */
        }setIsLoading(false)
      }
      fetchData();
  }, [location, selectedCase, selectedAlgorithm]);


  if(!selectedAlgorithm){
      return (
          <Typography variant="h3">
            Select an algorithm
          </Typography>
      )
  }
  if(isLoading){
      return <div></div>
  }

  return (
      <>
          <span>You selected {selectedCase.title ?? ''}</span>
           <VegaChart spec={selectedAlgorithm.specification} />
      </>
  )


}

export default PieChart