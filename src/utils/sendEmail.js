export default async function sendEmail(destinatario, asunto, mensaje) {

    const url = '/api/email';
  
    const payload = {
      destinatario: destinatario,
      asunto: asunto,
      mensaje: mensaje
    };
  
    try {

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Correo enviado con éxito:', data.message);
        return data.message;
      } else {
        console.error('Error al enviar el correo:', data.message);
        return data.message;
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      return 'Error al realizar la solicitud';
    }
  }
  