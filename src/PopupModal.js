/** @format */

import React from "react";
import { TextField, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export function PopupModal({
  showModal,
  setShowModal,
  setValue,
  value,
  t,
  updateTodo,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={showModal}
      onClose={() => {
        setShowModal(false);
        setValue("");
      }}
    >
      <Box sx={style}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <h1>Update the Todo</h1>
          <TextField
            label="✔️ Update Todo"
            required
            onChange={(event) => setValue(event.target.value)}
            value={value}
            placeholder={t.todo}
          />
          <br /> <br />
          <Button
            variant="outlined"
            disabled={!value}
            type="submit"
            onClick={() => {
              updateTodo(t.id);
            }}
          >
            Update Todo
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
