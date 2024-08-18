import Typography from "@mui/material/Typography";
import {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import VegaChart from "./VegaChart";


const VegaTimeline = (props) => {
  const { selectedCase, selectedAlgorithm } = props;
  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState({title:''})

  const location = useLocation();


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
           <VegaChart spec={selectedAlgorithm.specification} />
      </>
  )


}

export default VegaTimeline