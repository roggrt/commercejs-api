import React, { Component } from 'react';
import PropTypes from 'prop-types';
import commerce from '../../../lib/commerce';
import Dropdown from '../../common/atoms/Dropdown';

export default class AddressForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subdivisions: {},
    };

    this.getRegions = this.getRegions.bind(this);
  }

  componentDidMount() {
    this.getRegions(this.props.country);
  }

  componentDidUpdate(prevProps, prevState) {
    const hasDeliveryCountryChanged = prevProps.country !== this.props.country;

    // cargar las regiones disponibles
    if (hasDeliveryCountryChanged) {
      this.getRegions(this.props.country);
    }
  }

  /**
   * Filtrar los paises disponibles para la compra
   *
   * @param {string} country
   */
   getRegions(country) {
    commerce.services.localeListSubdivisions(country).then(resp => {
      this.setState({
        subdivisions: resp.subdivisions
      })
    }).catch(error => console.log(error))
  }


  render() {
    const {
      type,
      countries,
      country,
      region,
      name,
      townCity,
      street,
      street2,
      postalZipCode,
    } = this.props;

    return (
      <>
        <div className="row">
          <div className="col-12 mb-3">
            <label className="w-100">
              <p className="mb-1 font-size-caption font-color-light">
                Nombre completo*
              </p>
              <input required name={`${type}[name]`} autoComplete="name" value={name} className="rounded-0 w-100" />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 mb-3">
            <label className="w-100">
              <p className="mb-1 font-size-caption font-color-light">
                Pais*
              </p>
              <Dropdown
                required
                name={`${type}[country]`}
                placeholder="Seleccione un pais"
                value={country}
              >
                {
                  Object.entries(countries).map(([code, name]) => (
                    <option value={code} key={code}>
                      { name }
                    </option>
                  ))
                }
              </Dropdown>
            </label>
          </div>
          <div className="col-12 col-sm-6 mb-3">
            <label className="w-100">
              <p className="mb-1 font-size-caption font-color-light">Ciudad*</p>
              <input required name={`${type}[town_city]`} autoComplete="address-level2" value={townCity} className="rounded-0 w-100" />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 mb-3">
            <label className="w-100">
              <p className="mb-1 font-size-caption font-color-light">
                Direccion principal*
              </p>
              <input
                required
                autoComplete="street-address"
                name={`${type}[street]`}
                value={street}
                className="rounded-0 w-100"
                placeholder="Calles, numero de casa."
              />
            </label>
          </div>
          <div className="col-12 col-sm-6 mb-3">
            <label className="w-100">
              <p className="mb-1 font-size-caption font-color-light">
                Referencia (optional)
              </p>
              <input
                name={`${type}[street_2]`}
                value={street2}
                className="rounded-0 w-100"
                placeholder="referencias, descripcion etc."
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 mb-3">
            <label className="w-100">
              <p className="mb-1 font-size-caption font-color-light">
                Estado/Provincia/Region*
              </p>
              <Dropdown
                required
                name={`${type}[region]`}
                value={region}
                placeholder="Seleccionar una region"
              >
                {
                  Object.entries(this.state.subdivisions).map(([code, name]) => (
                    <option key={code} value={code}>
                    { name }
                    </option>
                  ))
                }
              </Dropdown>
            </label>
          </div>
          <div className="col-12 col-sm-6 mb-3">
            <label className="w-100">
              <p className="mb-1 font-size-caption font-color-light">
                Codigo Postal*
              </p>
              <input
                required
                autoComplete="postal-code"
                name={`${type}[postal_zip_code]`}
                value={postalZipCode}
                className="rounded-0 w-100"
              />
            </label>
          </div>
        </div>
      </>
    );
  }
}

AddressForm.propTypes = {
  type: PropTypes.string,
  countries: PropTypes.any,
  country: PropTypes.string,
  region: PropTypes.string,
  name: PropTypes.string,
  townCity: PropTypes.string,
  street: PropTypes.string,
  street2: PropTypes.string,
  postalZipCode: PropTypes.string,
}
