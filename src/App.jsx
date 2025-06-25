import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [idEditando, setIdEditando] = useState(null);

  const usuariosRef = collection(db, "usuarios");

  const obtenerUsuarios = async () => {
    const data = await getDocs(usuariosRef);
    setUsuarios(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const guardarUsuario = async (e) => {
    e.preventDefault();
    if (idEditando) {
      const usuarioRef = doc(db, "usuarios", idEditando);
      await updateDoc(usuarioRef, { nombre, edad: Number(edad) });
      setIdEditando(null);
    } else {
      await addDoc(usuariosRef, { nombre, edad: Number(edad) });
    }
    setNombre("");
    setEdad("");
    obtenerUsuarios();
  };

  const eliminarUsuario = async (id) => {
    const usuarioRef = doc(db, "usuarios", id);
    await deleteDoc(usuarioRef);
    obtenerUsuarios();
  };

  const editarUsuario = (usuario) => {
    setNombre(usuario.nombre);
    setEdad(usuario.edad);
    setIdEditando(usuario.id);
  };

  const dataGrafica = {
    labels: usuarios.map((u) => u.nombre),
    datasets: [
      {
        label: "Edad",
        data: usuarios.map((u) => u.edad),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>CRUD de Usuarios con Firebase</h1>
      <form onSubmit={guardarUsuario} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          required
        />
        <button type="submit">{idEditando ? "Actualizar" : "Agregar"}</button>
      </form>

      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nombre} - {usuario.edad} años
            <button onClick={() => editarUsuario(usuario)}>Editar</button>
            <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h2>Gráfico de Edades</h2>
      <Bar data={dataGrafica} />
    </div>
  );
}

export default App;
