import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.title,
    bgColor: props.backgroundColor,
    start: props.start,
    end: props.end,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEdit = () => {
    Axios.put("http://localhost:4000/edit", {
      id: editValues.id,
      backgroundColor: editValues.bgColor,
      title: editValues.name,
      start: editValues.start,
      end: editValues.end,
    }).then(() => {
      props.setListCard(
        props.listCard.map((value) => {
          return value.id === editValues.id
            ? {
                id: editValues.id,
                backgroundColor: editValues.bgColor,
                title: editValues.name,
                start: editValues.start,
                end: editValues.end,
              }
            : value;
        })
      );
    });
    handleClose();
  };

  const handleDelete = () => {
    Axios.delete(`http://localhost:4000/delete/${editValues.id}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.id !== editValues.id;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="id"
            defaultValue={props.id}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Título"
            defaultValue={props.title}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="start"
            label="início"
            defaultValue={props.start}
            type="datetime-local"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="end"
            label="fim"
            defaultValue={props.end}
            type="datetime-local"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDelete()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEdit()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
