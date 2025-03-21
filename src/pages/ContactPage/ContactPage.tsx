import { useState } from "react";
import styles from "./ContactPage.module.scss";
import SEO from "../../components/SEO/SEO";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
  };

  return (
    <div className={styles.contactContainer}>
      <SEO
        title="Contato | Loja Online"
        description="Entre em contato conosco!"
      />
      <h1>Entre em Contato</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Seu Nome"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Seu Email"
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Sua Mensagem"
          onChange={handleChange}
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ContactPage;
