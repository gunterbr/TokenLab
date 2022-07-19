import React from "react";
import "./card.css";
import FormDialog from "../dialog/dialogForm";

export default function Card(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        title={props.name}
        username={props.userDefault}
        backgroundColor={props.bgColor}
        end={props.end}
        start={props.start}
        listCard={props.listCard}
        setListCard={props.setListCard}
        id={props.id}
      />
      <span className="card-container" style={{backgroundColor: props.bgColor}} onClick={() => setOpen(true)}>
        {props.name}
      </span>
    </>
  );
}
