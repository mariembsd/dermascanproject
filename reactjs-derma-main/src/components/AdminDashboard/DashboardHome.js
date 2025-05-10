import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import "./DashboardHome.css";

const DashboardHome = () => {
  return (
    <div className="dashboard-container">
      <h2 className="my-4">Admin Dashboard</h2>
      <Row>
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <Card.Title>👥 Total Users</Card.Title>
              <Card.Text>1,250</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <Card.Title>📅 Appointments Today</Card.Title>
              <Card.Text>34</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <Card.Title>🩺 Active Consultations</Card.Title>
              <Card.Text>12</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardHome;
