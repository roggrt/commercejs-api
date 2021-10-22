import React, { Component } from 'react';
import ReviewList from './ReviewList';
import Modal from '../common/atoms/Modal';

const reviews = [
  {
    stars: '5',
    title: 'Perfecto',
    description: 'Desde que compre este producto mi vida ha mejorado notablemente!',
    reviewBy: 'Raul Trelles.',
    date: 'Diciembre, 2022'
  },
  {
    stars: '3.5',
    title: 'Es comodo!',
    description:
      'Le puse esa calificacion porque pense que me lo darian gratis.',
    reviewBy: 'Rodrigo Rodriguez',
    date: 'Enero, 2020'
  },
  {
    stars: '4',
    title: 'En la foto se veia pequeño',
    description:
      'No es la primera vez que compro. Buen precio por un producto basico.',
    reviewBy: 'El Vecino.',
    date: 'Diciembre, 2020'
  },
  {
    stars: '5',
    title: 'Me encanto!',
    description:
      'Hace tiempo habia terminado con mi novia asi que decidi comprarle este regalo para volver con ella y le encanto, quedo eternamente agradecido con ustedes, creo que me casare con ella.',
    reviewBy: 'Paul Paulino.',
    date: 'Agosto, 2020'
  }
];

export default class ClientReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  /**
   * Close the review modal
   */
  handleClose() {
    this.setState({ open: false });
  }

  /**
   * Show the review modal
   */
  handleOpen() {
    this.setState({ open: true });
  }

  render() {
    const { open } = this.state;

    return (
      <div id="reviews" className="custom-container pb-5">
        <Modal
          isOpen={open}
          onClose={this.handleClose}
          maxW="1000px"
        >
          <div className="d-flex justify-content-between align-items-center pb-3">
            <p className="font-size-subheader font-weight-medium">
              Todas las reseñas
            </p>
            <img
              tabIndex="0"
              src="/icon/cross.svg"
              className="w-24 cursor-pointer"
              onClick={this.handleClose}
              alt="Cross icon"
            />
          </div>
          <ReviewList reviews={reviews} />
        </Modal>
        <div className="row">
          <div className="col-12 col-lg-10 offset-lg-1">
            <div className="d-flex justify-content-between flex-column flex-sm-row align-items-sm-center mb-3">
              <p className="font-size-title font-weight-medium mb-2 mb-sm-0">
                4.3 stars de 10 reseñas
              </p>
            </div>
            <ReviewList reviews={reviews}>
              <button
                type="button"
                onClick={this.handleOpen}
                className="text-center bg-transparent w-100 h-72 px-3 text-decoration-underline"
              >
                Ver todas las reseñas
              </button>
            </ReviewList>
          </div>
        </div>
      </div>
    );
  }
}
