import React from "react";
import { useNavigate } from "react-router-dom";

// Components
import Header from "../../../core/ui/layout/Header";
import BaseCard from "../components/baseCard";
import Button from "../../../core/ui/Components/Button";

const HomePage = () => {

  const navigate = useNavigate();

  return (
    <div className="">
      <section className="bg-main-gradient-20">
        <Header>
          <a className="font-light text-gray-500" href="#">Especialidades</a>
        </Header>

        <div className="max-w-11/12 md:max-w-6xl py-16 mx-auto">

          <div className="grid md:grid-cols-5 place-items-center mb-12">
            <div className="col-span-3 m-10 text-gray-600">
              <h2 className="text-3xl md:text-5xl font-bold pb-8 md:pb-10">¿Qué especialista buscas hoy?</h2>
              <p className="text-lg">Reserva tu cita médica en segundos con nuestra plataforma inteligente. Telemedicina, especialistas certificados y atencion 24/7.</p>
            </div>
            <div className="hidden md:block col-span-2">
              <img src="/src/assets/doctor-home.png" alt="Imagen de doctor animada"/>
            </div>
          </div>

          <div className="grid grid-cols-2 md:flex md:flex-row text-green justify-evenly gap-5 md:gap-10 md:px-20">
            <BaseCard title="24/7" subtitle=" Disponible"/>
            <BaseCard color="green" title="+500" subtitle="Especialistas"/>
            <BaseCard color="purple" title="100%" subtitle="Seguro"/>
            <BaseCard color="teal" title="5 min" subtitle="Reserva rápida"/>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;