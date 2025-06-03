import React, { useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const VentasPorMes = ({ meses, totales_por_mes }) => {
  const chartRef = useRef(null);

  // Define chart data
  const data = {
    labels: meses,
   datasets: [
      {
        label: "Ventas de Empleado (C$)",
        data: totales_por_mes,
        backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],

        borderWidth: 1,
      },
    ],
  };

  // Define chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ventas Mensuales',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Ventas',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Meses',
        },
      },
    },
  };

  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFillColor(0, 51, 102);
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(28);
      doc.text('Reporte de Ventas Mensuales', 105, 25, null, null, 'center');

      // Add Chart Image
      if (chartRef.current) {
        const canvas = chartRef.current.canvas;
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, 50, 190, 100);
      } else {
        console.log('No chart reference available.');
      }

      // Add Table
      const tableData = meses.map((mes, index) => [
        mes || 'N/A',
        totales_por_mes[index] || '0',
      ]);
      autoTable(doc, {
        head: [['Mes', 'Total Ventas']],
        body: tableData,
        startY: 160,
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 2 },
        headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] },
        margin: { top: 50 },
      });

      const fecha = new Date().toISOString().slice(0, 10);
      doc.save(`VentasPorMes_${fecha}.pdf`);
      console.log('PDF generado y descargado.');
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      alert('Error al generar el PDF: ' + error.message);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Line ref={chartRef} data={data} options={options} />
        <Button variant="primary" onClick={generatePDF} className="mt-3">
          Generar Reporte PDF
        </Button>
      </Card.Body>
    </Card>
  );
};

export default VentasPorMes;