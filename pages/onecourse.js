import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const list= ({ rows }) => {
  const classes = useStyles();
  return (
  <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Topic</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.assesments.map((row) => (
            <TableRow key={row.title}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default list;

export const getStaticProps = async () => {
  const res = await fetch(`http://localhost:3000/api/courses`);
  const rows = await res.json();
  return {
    props: { rows }
  };
};
