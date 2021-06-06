import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";

const columns = [
  { field: "id", headerName: "Course Short Code", width: 300 },
  {
    field: "title",
    headerName: "Course Title",
    sortable: false,
    width: 700,
  },
];

export default function DataTable({ rows }) {
  const [test, setTest] = useState([]);

  function currentlySelected(selections) {
    if (test !== selections) {
      // I didn't write it in but you'll need to do object comparison here
      setTest(selections);
    }
    console.log(test);
  }
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
          onChange={currentlySelected}
        />
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`http://localhost:3000/api/dashboard`);
  const rows = await res.json();
  return {
    props: { rows },
  };
};
