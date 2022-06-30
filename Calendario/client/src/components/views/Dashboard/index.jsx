import React, { Fragment, useEffect, useState } from "react"
import Axios from "axios"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import Card from "./cards/cards"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './main.css'

const Dashboard = () => {

  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  console.log(listCard);

  const handleRegister = () => {
    Axios.post("http://localhost:4000/register", {
      title: values.title,
      start: values.start,
      end: values.end,
    }).then(() => {
      Axios.post("http://localhost:4000/search", {
        backgroundColor: values.backgroundColor,
        title: values.title,
        start: values.start,
        end: values.end,
      }).then((response) => {
        setListCard([
          ...listCard,
          {
            id: response.data[0].id,
            backgroundColor: values.backgroundColor,
            title: values.title,
            start: values.start,
            end: values.end,
          },
        ]);
      });
    });
  };

  //carrega os eventos do DB
  useEffect(() => {
    Axios.get("http://localhost:4000/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  //captura os valores digitados para inserir no DB
  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  return (
    <Fragment>

    <div className="container p-5">

      <div className="input-group">
        <input
          type="text"
          className="form-control register-input"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          name="title"
          placeholder="Evento"
          onChange={handleaddValues}
        />
        <input
          type="datetime-local"
          className="form-control register-input"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          placeholder="início"
          name="start"
          onChange={handleaddValues}
        />
        <input
          type="datetime-local"
          className="form-control register-input"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          placeholder="fim"
          name="end"
          onChange={handleaddValues}
        />

        <button onClick={handleRegister} className="btn btn-primary register-button">
          Cadastrar
        </button>
      </div>

            <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin, bootstrap5Plugin, timeGridPlugin, listPlugin ]}
                    themeSystem='bootstrap5'
                    initialView='dayGridMonth'
                    locale='pt-br'
                    dayMaxEvents={true}
                    
                    headerToolbar={{
                      start: 'prev,next today',
                      center: 'title',
                      end: 'dayGridMonth,timeGrid,list',
                    }}

                    eventClick={function(date) {
                      console.log(date);
                    }}
                   
                    events='http://localhost:4000/getCards'

                  />
      <span>Editar Eventos:</span>
      {listCard.map((val) => (
        <Card
          listCard={listCard}
          setListCard={setListCard}
          key={val.id}
          id={val.id}
          bgColor={val.backgroundColor}
          name={val.title}
          start={val.start}
          end={val.end}
        />
      ))}
      
      </div>
    </Fragment>
  );
}

export default Dashboard
