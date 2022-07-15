/** @format */

import React from "react";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export function Output({ todos, setShowModal, setT, setValue, deleteTodo }) {
  return (
    <div>
      {todos.length > 0 && (
        <Grid container>
          <Grid item lg md xs></Grid>
          <Grid item lg={4} md={6} xs={8}>
            <TableContainer
              component={Paper}
              sx={{
                maxWidth: 650,
                maxHeight: 500,
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Todo</TableCell>
                    <TableCell align="center">Edit</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todos.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ minWidth: "32ch" }}
                      >
                        {row.todo}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                            setShowModal(true);
                            setT(row);
                            setValue(row.todo);
                          }}
                        >
                          <EditIcon
                            color="secondary"
                            fontSize="small"
                            style={{ margin: "1rem" }}
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => deleteTodo(row.id)}>
                          <DeleteIcon
                            color="error"
                            fontSize="small"
                            style={{ margin: "1rem" }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item lg md xs></Grid>
        </Grid>
      )}
    </div>
  );
}
