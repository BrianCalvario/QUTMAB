import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { userNavigate } from "react-router-dom";


const App = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/user/sing-in", data);

      if (response.data.success) {
        alert("correcto");
      } else {
        alert("incorrecta");
      }
    } catch (error) {
      alert("incorrecta");
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Correo electrónico:</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChange}
            placeholder="Ingresa tu correo"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={onChange}
            placeholder="Ingresa tu contraseña"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default App;
