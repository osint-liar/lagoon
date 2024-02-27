import React, {useState, useEffect, useRef} from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Divider} from '@mui/material';
import {Box} from "@mui/system";
import {fetchOsinLiarData} from "../../utils/data";
import {getApplicationKeyToken, getConfiguration, getDefaultConfiguration} from "../../utils/app_config";


const SqlEditor = (props) => {
  const [sql, setSql] = useState('SELECT * FROM ApiCoreData LIMIT 1');
  const [records, setRecords] = useState([])


  function handleEditorDidMount(editor, monaco) {
    console.log('onMount: the editor instance:', editor);
    console.log('onMount: the monaco instance:', monaco);
  }


  function handleEditorWillMount(monaco) {
    //console.log('beforeMount: the monaco instance:', monaco);
  }

  function handleEditorValidation(markers) {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }

  function handleEditorChange(value, event) {
    setSql(value)
  }

  async function runSqlQuery()
  {
    const data = await fetchOsinLiarData(`{{WebHost}}v1/analysis-tool/raw-sql?SqlQuery=${encodeURIComponent(sql)}`, getDefaultConfiguration())
    setRecords(data.Records)
  }

  useEffect(() => {
    // This is where you could add editor event listeners if needed
    // Cleanup function is not needed in this case but could be useful if you add event listeners
    return () => {
      // Here you would remove any event listeners added in useEffect
    };
  }, []); // The empty array ensures this effect runs only once after the initial render


  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m:0.5}}>
        <Box>
          <Button variant="contained" color="primary" onClick={async() => runSqlQuery()} >Run Sql Query</Button>
        </Box>
        <Box>
          <Button
              variant="contained"
              color="primary"
              onClick={() => downloadCsv(records, 'osint_liar_lagoon.csv')}
          >
            Download CSV
          </Button>
        </Box>
      </Box>
      <Divider />
      <Editor
        height="30vh"
        onChange={(evt) => setSql(evt)}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        onValidate={handleEditorValidation}
        defaultValue={sql}
        defaultLanguage={'sql'}
      />
      <DataTable data={records} />
    </>
  );
};

export default SqlEditor;

const DataTable = ({ data }) => {
  if(!data){
    data = []
  }
  const columnHeaders = data.length > 0 ? Object.keys(data[0]) : [];
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columnHeaders.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columnHeaders.map((column) => (
                <TableCell key={column}>{row[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

function downloadCsv(jsonData, fileName) {
  if(!jsonData || jsonData.length === 0){
    return;
  }
  // Function to convert JSON to CSV
  function convertToCSV(objArray) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let csvStr = '';

    // Get headers
    const headers = Object.keys(array[0]);
    csvStr += headers.join(',') + '\r\n';

    // Get rows
    for (const row of array) {
      let csvRow = [];
      for (const header of headers) {
        csvRow.push(row[header]);
      }
      csvStr += csvRow.join(',') + '\r\n';
    }

    return csvStr;
  }

  // Convert JSON to CSV
  const csvData = convertToCSV(jsonData);

  // Create a Blob with the CSV data
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

  // Create a link and set the URL as the Blob object
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.style.display = 'none';

  // Set the download attribute of the link
  link.download = `${fileName}.csv`;

  // Append the link to the DOM
  document.body.appendChild(link);

  // Programmatically click the link to trigger the download
  link.click();

  // Remove the link after download
  document.body.removeChild(link);
}

