import './Pay.css';
import React from 'react';

const Paypage = () => {
  return (
    <div className="container">
      <div className="form-section">
        <h2>Proceder al Pago</h2>

        <div className="input-group">
          <label>Numero de la tarejta</label>
          <input type="text" />
        </div>

        <div className="input-group">
          <label> Nombre en la tarjeta</label>
          <input type="text" />
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Fecha de vencimiento</label>
            <input type="text"/>
          </div>
          <div className="input-group">
            <label>CCV</label>
            <input type="text"/>
          </div>
        </div>

        <div className="checkbox-group">
          <input type="checkbox" id="save-card" />
          <span htmlFor="save-card">Guardar metodo de pago</span>
        </div>
        <h3>Roovel acepta la mayoría de las tarjetas de crédito y débito:</h3>
        <div className="payment-methods">
          <div className="payment-icon visa"></div>
          <div className="payment-icon mastercard"></div>
          <div className="payment-icon paypal"></div>
        </div>
      </div>

      

      <div className="summary-section">
        <h2>Total a pagar</h2>
        <span>Renta: <strong>$100.00</strong></span>
        <p>Cargos por servicio (3%): <strong>$21.00</strong></p>
        <p className="total">Total: <strong>$121.00</strong></p>

        <button className="confirm-button">Confirmar Pago</button>
      </div>
    </div>
  );
};

export default Paypage;
