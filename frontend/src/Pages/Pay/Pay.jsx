import './Pay.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Paypage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook para redirigir programáticamente
  const queryParams = new URLSearchParams(location.search);
  const room_id = queryParams.get('room_id'); 
  const [room, setRoom] = useState({ room_price: 0, room_description: '' });
  const [isLoading, setIsLoading] = useState(true);

  console.log('ID de la habitación:', room_id);

  useEffect(() => {
    if (!room_id) {
      console.error('room_id es undefined');
      Swal.fire('Error', 'No se proporcionó un ID de habitación.', 'error');
      navigate('/'); // Redirige a la página principal si no hay room_id
      return;
    }

    const fetchRoom = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/pay?id_room=${room_id}`);

        if (!res.ok) throw new Error('Habitación no encontrada');

        const data = await res.json();
        console.log('Datos obtenidos:', data);

        setRoom(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener habitación:', error);
        Swal.fire('Error', 'No se pudo cargar la habitación.', 'error');
        navigate('/'); // Redirige a la página principal si ocurre un error
      }
    };

    fetchRoom();
  }, [room_id, navigate]);

  const handleConfirmPayment = async () => {
    if (!room_id) {
      Swal.fire('Error', 'No se puede confirmar el pago sin un ID de habitación.', 'error');
      navigate('/'); // Redirige a la página principal si no hay room_id
      return;
    }

    try {
      console.log('ID de la habitación:', room_id);

      const res = await fetch(`http://localhost:3000/api/pay/confirm`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_room: room_id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al confirmar el pago');
      }

      const data = await res.json();
      Swal.fire({
        title: '¡Pago confirmado!',
        text: 'La habitación ha sido marcada como ocupada.',
        icon: 'success',
      }).then(() => {
        navigate('/'); // Redirige a la página principal después del pago exitoso
      });
    } catch (err) {
      console.error('Error al confirmar pago:', err);
      Swal.fire({
        title: 'Error',
        text: err.message || 'No se pudo confirmar el pago',
        icon: 'error',
      }).then(() => {
        navigate('/'); // Redirige a la página principal si ocurre un error
      });
    }
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
