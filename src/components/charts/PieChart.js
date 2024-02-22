import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {fetchOsinLiarData} from "../../utils/data";

const PieChart = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() =>
  {
      async function fetchData() {
        setIsLoading(true)
        setIsLoading(false)
      }
      fetchData();
  }, []);
    return (
        <Typography variant="h1" component="h2">
          Pie Chart
        </Typography>
    )
}

export default PieChart