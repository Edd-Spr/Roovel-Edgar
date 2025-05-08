import './Pay.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Paypage = () => {
  const { room_id} = useParams();
  const [room, setRoom] = useState({ room_price: 0, room_description: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/pay/${room_id}`);
        
        if (!res.ok) throw new Error('Habitación no encontrada');
        
        const data = await res.json();
        console.log('Datos obtenidos:', data);
        
        setRoom(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener habitación:', error);
        Swal.fire('Error', 'No se pudo cargar la habitación.', 'error');
      }
    };
  
    fetchRoom();
  }, [room_id]);
  

  const handleConfirmPayment = () => {
    fetch(`http://localhost:3000/api/pay/confirm/${room_id}`, {
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
