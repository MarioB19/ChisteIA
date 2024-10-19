import nodemailer from 'nodemailer';

export async function POST(request) {

  const { destinatario, asunto, mensaje } = await request.json();


  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,  
      pass: process.env.EMAIL_PASS   
    },
  });

  try {
    // Envía el correo
    await transporter.sendMail({
      from: `"ChisteIA" <${process.env.EMAIL_USER}>`,  
      to: destinatario,  
      subject: asunto,  
      text: mensaje, 
      html: `<p>${mensaje}</p>` + `<img src="https://chisteia.vercel.app/logo_github.jpg" alt="ChisteIA Logo" style="width:200px;"/>`
      ,  
    });

    // Respuesta exitosa
    return new Response(JSON.stringify({ message: 'Correo enviado con éxito' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al enviar el correo:', error);

    // Respuesta en caso de error
    return new Response(JSON.stringify({ message: 'Error al enviar el correo' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
