import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Cookies from "js-cookie";

const Dashboard = () => {

    const [doctorDepartment, setDoctorDepartment] = useState([]);
    const [dailyAppointment, setDailyAppointment] = useState([]);
    const [financeData, setFinanceData] = useState([]);
    const [patientStatus, setPatientStatus] = useState([]);


    const [loading, setLoading] = useState(true)

    const token = Cookies.get("token");
    const Base_url = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
      
      
        const fetchData = async () => {
          try {
            const [doctorRes, appointmentRes, incomeRes, expenseRes, patientRes] = await Promise.all([
              fetch(`${Base_url}/alldoctor`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.text()).then(JSON.parse),
              fetch(`${Base_url}/appointment`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.text()).then(JSON.parse),
              fetch(`${Base_url}/income`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.text()).then(JSON.parse),
              fetch(`${Base_url}/expense`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.text()).then(JSON.parse),
               fetch(`${Base_url}/allpatients`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.text()).then(JSON.parse)
            ]);
      
            if (doctorRes.status === "success") {
              const doctorData = doctorRes.data.reduce((acc, item) => {
                const department = item.companyDetails.department;
                acc[department] = (acc[department] || 0) + 1; 
                return acc;
              }, {});
            
              const formattedData = Object.entries(doctorData).map(([name, value]) => ({
                name,   
                value,  
              }));
            
            
              setDoctorDepartment(formattedData);
            }
      
 
            if (appointmentRes.status === "success") {
              const dailyAppointment = appointmentRes.data.reduce((acc, item) => {
                const date = new Date(item.createdAt).toLocaleDateString();
                acc[date] = (acc[date] || 0) + 1;
                return acc;
              }, {});
              setDailyAppointment(Object.entries(dailyAppointment).map(([date, value]) => ({ date, leads: value })));
            }
      

            if (incomeRes.status === "success" && expenseRes.status === "success") {
              const combinedData = [
                ...incomeRes.data.map(item => ({
                  ...item,
                  TransactionType: "income",
                  TransactionDate: item.dateReceived 
                })),
                ...expenseRes.data.map(item => ({
                  ...item,
                  TransactionType: "expense",
                  TransactionDate: item.datePaid 
                }))
              ];
            
              const monthlyMap = {};
            
              combinedData.forEach(item => {
                const date = new Date(item.TransactionDate);
                const month = date.toLocaleString("default", { month: "short" });
                const year = date.getFullYear(); 
                const key = `${month}-${year}`;
            
                if (!monthlyMap[key]) {
                  monthlyMap[key] = { month: key, income: 0, expense: 0 };
                }
            
                const type = item.TransactionType.toLowerCase();
                if (type === "income") monthlyMap[key].income += item.amount;
                else if (type === "expense") monthlyMap[key].expense += item.amount;
              });
            
              setFinanceData(Object.values(monthlyMap));
            }
            
      
    
            if (patientRes.status === "success") {
              const patientData = patientRes.data.reduce((acc, item) => {
                acc[item.status] = (acc[item.status] || 0) + 1;
                return acc;
              }, {});
              setPatientStatus(Object.entries(patientData).map(([name, value]) => ({ name, value })));
            }

            setLoading(false)
      
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
       if(loading) {
        fetchData();
       }
       
      }, [loading]);
      

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    return (
        <Box sx={{
              flexGrow: 1,
              overflowY: "auto",
              height: "100vh",
              paddingBottom: 4,
              marginBottom: "20px"
            }}>

        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={3}>
            
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Doctors per Department
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                        <Pie
                        data={doctorDepartment}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        >
                        {doctorDepartment.map((entry, index) => (
                            <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                        </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                     Daily Appointment
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dailyAppointment}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Appointment" stroke="#8884d8" />
                    </LineChart>
                    </ResponsiveContainer>
                </Paper>
                </Grid>

                <Grid item xs={12} md={6} >
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Monthly Finance Summary
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={financeData}
                        margin={{ top: 20, right: 50, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" orientation="left" stroke="#82ca9d" />
                        <YAxis yAxisId="right" orientation="right" stroke="#f87171" />
                        <Tooltip />
                        <Legend />
                        <Bar
                          yAxisId="left"
                          dataKey="income"
                          fill="#82ca9d"
                          name="Income"
                          barSize={20}
                        />
                        <Bar
                          yAxisId="right"
                          dataKey="expense"
                          fill="#f87171"
                          name="Expense"
                          barSize={20}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>

            
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Patient Status
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                        <Pie
                        data={patientStatus}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        >
                        {patientStatus.map((entry, index) => (
                            <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                        </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
                    </Paper>
                </Grid> 

            </Grid>
        </Box>
        </Box>
    );
};

export default Dashboard;