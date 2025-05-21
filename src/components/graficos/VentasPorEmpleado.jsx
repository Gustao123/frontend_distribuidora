import { Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const VentasPorEmpleado = ({ meses, totales_por_mes }) => {
  const data = {
    labels: meses,
    datasets: [
      {
        label: "Ventas de Empleado (C$)",
        data: totales_por_mes,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Córdobas (C$)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Meses",
        },
      },
    },
  };

  return (
    <Card style={{ height: "100%" }}>
      <Card.Body>
        <Card.Title>Ventas por Empleados</Card.Title>
        <div style={{ height: "100%", position: "relative" }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default VentasPorEmpleado;