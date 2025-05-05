import './Pay.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Paypage = () => {
  const { id_room } = useParams();
  // const id_room = 3;
  const [room, setRoom] = useState({ room_price: 0, room_description: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/pay/${id_room}`)
      .then((res) => {
        console.log('Respuesta del servidor:', res);
        if (!res.ok || res.headers.get('content-type')?.includes('text/html')) {
          throw new Error('Respuesta no válida o no es JSON');
        }
        return res.json();
      })
      .then((data) => {
        setRoom(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar datos de habitación:', err);
        setIsLoading(false);
      });
  }, [id_room]);

  const handleConfirmPayment = () => {
    fetch(`http://localhost:3000/api/pay/confirm/${id_room}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: '¡Pago confirmado!',
          text: 'La habitación ha sido marcada como ocupada.',
          icon: 'success',
        });
      })
      .catch((err) => {
        console.error('Error al confirmar pago:', err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo confirmar el pago',
          icon: 'error',
        });
      });
  };

  if (isLoading) {
    return <div className="container">Cargando datos de habitación...</div>;
  }

  const serviceFee = room.room_price * 0.03;
  const total = room.room_price + serviceFee;

  return (
    <div className="container">
      <div className="form-section">
        <h2>Proceder al Pago</h2>

        <div className="input-group">
          <label>Número de la tarjeta</label>
          <input type="text" />
        </div>

        <div className="input-group">
          <label>Nombre en la tarjeta</label>
          <input type="text" />
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Fecha de vencimiento</label>
            <input type="text" />
          </div>
          <div className="input-group">
            <label>CCV</label>
            <input type="text" />
          </div>
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
        <p>Descripción: <strong>{room.room_description}</strong></p>
        <span>Renta: <strong>${room.room_price.toFixed(2)}</strong></span>
        <p>Cargos por servicio (3%): <strong>${serviceFee.toFixed(2)}</strong></p>
        <p className="total">Total: <strong>${total.toFixed(2)}</strong></p>

        <button className="confirm-button" onClick={handleConfirmPayment}>
          Confirmar Pago
        </button>
      </div>
    </div>
  );
};

export default Paypage;
