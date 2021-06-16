import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";

const columns = [
  { field: "id", hide: true },
  { field: "course_id", headerName: "Course Short Code", width: 300 },
  {
    field: "title",
    headerName: "Course Title",
    sortable: false,
    width: 720,
  },
];
var lst = [];

function submitHandler() {
  console.log(lst);
  localStorage.setItem('courses', lst);
}

const DataTable = () => {
  const [rows, setRow] = useState([]);
  useEffect(() => {
    const cookies = localStorage.getItem('cookies');
    async function fetchAPI() {
      await fetch(`http://localhost:3000/api/dashboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cookies })
      }).then((tmpres) => tmpres.json())
        .then((data) => setRow(data));
    }
    fetchAPI();
  }, [])

  return (
    <div>
      <Typography variant="h4" align='center'>
        Select your advised courses for this semester
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onSelectionModelChange={(e) => lst = e.selectionModel}
        />
        <Grid container align="center" justify="space-around" spacing='5' p={10} >
          <Grid item p={10} >
            <Button align="center" justify="center" p={10} onClick={submitHandler}>Submit</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default DataTable;