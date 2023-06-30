import React, {useState, Fragment, useEffect} from 'react';
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "../components/Loading";
import {Box, FormControl, TextareaAutosize, Typography} from "@mui/material";
import MUIDataTable from "mui-datatables";
import {Button, FormGroup} from "reactstrap";
import {getConfig} from "../config";


export const SqlEditorToolComponent = () =>
{
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState('');
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])
  const { user } = useAuth0();
  const { apiOrigin = "http://127.0.0.1:9906/v1", audience } = getConfig();

  const {
    getAccessTokenSilently,
    loginWithPopup,
    getAccessTokenWithPopup,
  } = useAuth0();

  const runQuery = async(sqlQuery) => {
      setIsLoading(true)
      try {
          // handle cors error
          const token = await getAccessTokenSilently();
          const response = await fetch(`${apiOrigin}/analysis-tool/raw-sql?SqlQuery=${sqlQuery}`, {
              mode: 'cors',
              headers: {
                Authorization: `Bearer ${token}`,
              },
          });
          if (response.ok) {
              const data = await response.json();

              setRows(data.Records)
              if(rows.length > 0){
                  setColumns(Object.keys(rows[0]))
              }
              else{
                  setColumns([])
              }
          }
      }
      catch(err)
      {
          console.error('Error', err)
          setRows([])
      }
      finally {
        setIsLoading(false)
      }
  }

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {!isLoading &&
        <Fragment>
            <Typography variant="h6">Content Information</Typography>
            <FormGroup>
            <FormControl>
              <Button onClick={() => runQuery(query)} color="primary" variant={'contained'}>Run the Query</Button>
            </FormControl>
            <FormControl>
              <TextareaAutosize
                minRows={10}
                maxRows={10}
                style={{ width: 300 }}
                placeholder="Enter an SQL query..."
                name="SQL"
                id="SQL"
                defaultValue={query}
                onChange={(e) => { setQuery(e.target.value)}}
              />
            </FormControl>
            <FormControl>
              <MUIDataTable
                title={'Sql Query Results'}
                data={rows}
                columns={columns}
                options={{}}
              />
            </FormControl>
            </FormGroup>
        </Fragment>
      }
    </Box>
  );
}

export default withAuthenticationRequired(SqlEditorToolComponent, {
  onRedirecting: () => <Loading />,
});