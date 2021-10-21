import React from 'react';
import Head from 'next/head';
import Root from '../components/common/Root';
import Footer from '../components/common/Footer';

const About = () => (
  <Root>
    <Head>
      <title>Acerca de | Tronicshops</title>
    </Head>
    <div className="about-container">
      {/* Row */}
      <div className="row mt-5 pt-5 about-hero">
        <div className="col-12 col-md-10 col-lg-6 offset-md-1 offset-lg-0 row-content">
            <div className="h-100 d-flex flex-column py-5 px-4 px-sm-5 justify-content-center">
              <h2 className="font-size-header mb-4">
                Tronicshops
              </h2>
              <h4 className="font-size-subheader mb-4">
                Esta es una tienda virtual de demostracion para el proyecto final de la materia tendencias actuales de programacion de la carrera desarrollo de software del instituto del Azuay
                Esta construida en su mayoria usando Javascript y como gestion de apis Commerce.js SDK. Commerce.js donde se almacena en una base de datos no relacional como mongodb, esta es una libreria javascript orientada al comercio electronico Todo en este proyecto, desde la tienda, el carrito, el pago, la factura, fue desarrollado de 0 siguiendo las buenas practicas de programacion y diseño de interfaces. 
                Todos los derechos reservados.
              </h4>
              
            </div>
          </div>

        <div className="col-12 col-lg-6">
          <div className="about-image h-100">
            <div className="d-flex align-items-center justify-content-center h-100">
              <img src="/cjs-illustration.svg" alt="Commerce.js illustration"/>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="row">
        <div className="col-12 col-lg-6">
          <div className="about-image h-100">
            <div className="d-flex align-items-center justify-content-center h-100">
              <img src="/netlify-illustration.svg" alt="Netlify illustration"/>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-10 col-lg-6 offset-md-1 offset-lg-0 row-content">
          <div className="h-100 d-flex flex-column justify-content-center py-5 px-4 px-sm-5">
            <h3 className="font-size-header mb-4">
              Como hosting y usamos netlify
            </h3>
            <h4 className="font-size-subheader mb-4">
              Netlify es una solucion efectiva y gratuita si necesitamos poner a produccion proyectos antes de comprar un dominio
            </h4>
            <div className="mt-3">
              <a
                className="px-4 py-3 flex-grow-1 font-color-white about-net"
                href="https://netlify.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir Netlify
              </a>
            </div>
          </div>
        </div>
</div>
      
     
    </div>
    <Footer />
  </Root>
);

export default About;
