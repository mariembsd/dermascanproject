import React from 'react';
import Sidebar from '../components/DermatologistDashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const DermatologistDashboardPage = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default DermatologistDashboardPage;
