import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";

const columns = [
  { field: "id", hide: true},
  { field: "course_id", headerName: "Course Short Code", width: 300},
  {
    field: "title",
    headerName: "Course Title",
    sortable: false,
    width: 720,
  },
];
var lst = [];

function submitHandler(){
	console.log(lst);
	localStorage.setItem('courses',lst);
}

export default function DataTable({ rows }) {
  return (
    <div>
      <Typography variant="h4" align='center'>
        Select your advised courses for this semester
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows.courses}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onSelectionModelChange={(e) => lst=e.selectionModel}
        />
		


		<Grid container  align = "center" justify = "space-around" spacing ='5' p={10} >
            <Grid item p={10} >

            <Button align = "center" justify = "center" p={10} onClick={submitHandler}>Submit</Button>

            </Grid>
        </Grid>



      </div>
    </div>
  );
}

export const getStaticProps = async () => {
//   const res = await fetch(`http://localhost:3001/api/dashboard`);
  const res = await fetch(`http://localhost:3001/api/dashboard/${localStorage.getItem('cookies')}`);
  const cookies = await res.json();
  const rows = await res.json();
  return {
    props: { rows },
  };
};
