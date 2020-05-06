import React, { Component } from "react";
import PropTypes from 'prop-types';
import Radiobox from "../../common/atoms/Radiobox";

export default class PaymentDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      gateways,
      handleGatewayChange,
      selectedGateway,
      cardNumber,
      expMonth,
      expYear,
      cvc,
      billingPostalZipcode,
    } = this.props;
    return (
      <>
        <p className="font-size-subheader font-weight-semibold mb-3">
          Payment Detail
        </p>
        <div className="border border-color-gray400 mb-5">
          {(gateways && gateways.available['test_gateway']) ?
            (<div className="borderbottom border-color-gray500">
              <label
                onClick={() => handleGatewayChange('test_gateway')}
                className={`p-3 d-flex align-items-center cursor-pointer`}
              >
                <Radiobox
                  checked={selectedGateway === "test_gateway"}
                  className="mr-3"
                />
                <p className="font-weight-medium">Credit/ Debit card</p>
              </label>

              <div className="pl-5 pr-3 pb-3 ml-2">
                <div className="row">
                  <div className="col-sm-6">
                    <label className="w-100 mb-3 mb-sm-0">
                      <p className="mb-1 font-size-caption font-color-light">
                        Card Number
                      </p>
                      <input
                        name="cardNumber"
                        pattern="[0-9.]+"
                        value={cardNumber}
                        maxlength="16"
                        className="rounded-0 w-100"
                      />
                    </label>
                  </div>
                  <div className="col-sm-2">
                    <label className="w-100 mb-3 mb-sm-0">
                      <p className="mb-1 font-size-caption font-color-light">
                        Exp. Month
                      </p>
                      <input
                        name="expMonth"
                        type="number"
                        value={expMonth}
                        className="rounded-0 w-100"
                        placeholder="MM"
                      />
                    </label>
                  </div>
                  <div className="col-sm-2">
                    <label className="w-100 mb-3 mb-sm-0">
                      <p className="mb-1 font-size-caption font-color-light">
                        Exp. Year
                      </p>
                      <input
                        type="number"
                        name="expYear"
                        value={expYear}
                        className="rounded-0 w-100"
                        placeholder="YY"
                      />
                    </label>
                  </div>
                  <div className="col-sm-2">
                    <label className="w-100 mb-3 mb-sm-0">
                      <p className="mb-1 font-size-caption font-color-light">
                        CVC (CVV)
                      </p>
                      <input
                        name="cvc"
                        value={cvc}
                        maxlength="3"
                        type="number"
                        className="rounded-0 w-100"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>)
            : ''
          }
          {(gateways && gateways.available['paypal']) ?
            (<div>
              <label
                onClick={() => handleGatewayChange('paypal')}
                className={`p-3 d-flex align-items-center cursor-pointer`}
              >
                <Radiobox
                  checked={selectedGateway === "paypal"}
                  className="mr-3"
                />
                <p className="font-weight-medium">Paypal</p>
              </label>
            </div>)
            : ''
          }
        </div>
      </>
    );
  }
}

PaymentDetails.propTypes = {
  gateways: PropTypes.object,
  handleGatewayChange: PropTypes.func,
  selectedGateway: PropTypes.string,
}
