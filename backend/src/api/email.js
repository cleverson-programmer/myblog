const { validateToken } = require('../controller/authController')
const nodemailer = require("nodemailer");

module.exports = (app, repository) =>{

    // Configuração do transporte do Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    app.post('/register/email', validateToken, async (req, res, next) => {
        console.log("Request Body:", req.body); // Log para verificar os dados recebidos
    
        const { email } = req.body;
    
        try {
            const result = await repository.insertEmail({
                email
            });

            // Configura o conteúdo do email de boas-vindas
            const mailOptions = {
              from: process.env.NODEMAILER_USER,
              to: email,
              subject: "Bem-vindo a DEVlearn!",
              html: `
                  <h1>Bem-vindo(a)!</h1>
                  <p>Obrigado por se cadastrar para receber atualizações do nosso site. Estamos empolgados em tê-lo(a) conosco!</p>
                  <p>Você receberá notificações sobre novos artigos e conteúdos em breve.</p>
                  <p>Atenciosamente,</p>
                  <p>DEVlearn</p>
              `
            };

            // Envia o email
            await transporter.sendMail(mailOptions);
    
            res.status(201).json(result);
          }
          catch (error) {
            console.error("Error inserting email:", error);
            res.status(500).json({ error: "Failed to insert email" });
        }
    });

    app.post('/email/send', validateToken, async (req, res, next) => {
        console.log("Request Body:", req.body); // Log para verificar os dados recebidos
    
        const { content, subject } = req.body;
    
        if (!content || !subject) {
            return res.status(400).json({ error: "Conteúdo e assunto do email são obrigatórios." });
        }

        try {
            const emails = await repository.getEmailsFromDatabase();
        
            if (emails.length === 0) {
              return res.status(404).json({ error: "Nenhum email registrado." });
            }
        
            
            // Enviar emails
            const emailPromises = emails.map((user) => {
              return transporter.sendMail({
                from: process.env.NODEMAILER_USER,
                to: user.email,
                subject: subject,
                html: content,
              });
            });
        
            await Promise.all(emailPromises);
        
            res.status(200).json({ message: "Emails enviados com sucesso!" });
          } catch (error) {
            console.error("Erro ao enviar emails:", error);
            res.status(500).json({ error: "Erro ao enviar emails." });
        }
    });
}