import React, { Fragment, useEffect, useState } from 'react'
import Axios from 'axios'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import Card from './cards/cards'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './main.css'

const Dashboard = () => {
  const userNow = localStorage.getItem('user');
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);

  console.log(listCard);

  function randomColor() {
    const newColor = "#"+Math.floor(Math.random()*16777215).toString(16);
    return newColor;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:4000/register", {
      username: userNow,
      backgroundColor: randomColor(),
      title: values.title,
      start: values.start,
      end: values.end,
    }).then(() => {
      Axios.post("http://localhost:4000/search", {
        username: userNow,
        title: values.title,
      }).then((response) => {
        setListCard([
          ...listCard,
          {
            id: response.data[0].id,
            username: response.data[0].username,
            backgroundColor: response.data[0].backgroundColor,
            title: response.data[0].title,
            start: response.data[0].start,
            end: response.data[0].end,
          },
        ]);
      });
    });
  };

  //carrega os eventos
  useEffect(() => {
    Axios.get(`http://localhost:4000/getCards/${userNow}`).then((response) => {
      setListCard(response.data);
    });
  }, [userNow]);

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
      <form className="newEvent">

        <input
          type="text"
          className="form-control register-input"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          name="title"
          placeholder="Evento"
          onChange={handleaddValues}
          required
        />
        <input
          type="datetime-local"
          className="form-control register-input"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          placeholder="início"
          name="start"
          onChange={handleaddValues}
          required
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

        <button type="submit" onClick={handleRegister} className="btn btn-primary register-button">
          Cadastrar
        </button>

        </form>
      </div>

            <FullCalendar
                    plugins={[ dayGridPlugin, bootstrap5Plugin, timeGridPlugin, listPlugin ]}
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
                   
                    events= {{
                      url:`http://localhost:4000/getCards/${userNow}`,
                    }}
                  />
      <span>Editar Eventos:</span>
      {listCard.map((val) => (
        <Card
          listCard={listCard}
          setListCard={setListCard}
          key={val.id}
          id={val.id}
          userDefault={val.username}
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
