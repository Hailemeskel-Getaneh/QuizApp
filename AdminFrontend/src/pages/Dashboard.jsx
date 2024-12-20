import React, { useState, useEffect } from "react";
import '../styles/Dashborad.css'

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    quizzes: 0,
    attempts: 0,
    passRate: 0,
  });

  // Fetching stats data from backend or any data source
  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/dashboard-stats');
      if (!response.ok) throw new Error('Failed to fetch dashboard stats');
      const data = await response.json();
      setStats({
        users: data.users,
        quizzes: data.quizzes,
        attempts: data.attempts,
        passRate: data.passRate,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Users</h3>
          <p>{stats.users}</p>
        </div>
        <div className="stat-card">
          <h3>Quizzes</h3>
          <p>{stats.quizzes}</p>
        </div>
        <div className="stat-card">
          <h3>Attempts</h3>
          <p>{stats.attempts}</p>
        </div>
        <div className="stat-card">
          <h3>Pass Rate</h3>
          <p>{stats.passRate}%</p>
        </div>
      </div>
      <div className="chart-section">
        <div className="chart">
          <h3>User Growth</h3>
          <p>Placeholder for chart</p>
        </div>
        <div className="chart">
          <h3>Quiz Performance</h3>
          <p>Placeholder for chart</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
