import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import SidebarComponent from "../../../Components/Sidebar";

export default function Inicio() {

    const [chartData, setChartData] = useState({});
    const [chartData2, setChartData2] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [chartOptions2, setChartOptions2] = useState({});

    useEffect(() => {

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const data = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
                {
                    label: 'Sales',
                    data: [540, 325, 702, 620],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                      ],
                      borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                      ],
                      borderWidth: 1
                }
            ]
        };

        const data_2 = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        const options2 = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        }

        setChartData(data);
        setChartData2(data_2)
        setChartOptions(options);
        setChartOptions2(options2)
    }, []);

    return (

        <>  


            <div className="container">
                
                <SidebarComponent />

                <div className="title-dashboard-module">
                    <h1>Dashboard</h1>
                </div>

                <div className="charts-content flex align-items-center">
                    <div className="card" style={{width:"50%"}}>
                        <Chart type="bar" data={chartData} options={chartOptions} />
                    </div>
                    <div className="card" style={{width:"50%"}}>
                        <Chart type="bar" data={chartData2} options={chartOptions2} />
                    </div>
                </div>
            
            </div>

        </>

    );
}