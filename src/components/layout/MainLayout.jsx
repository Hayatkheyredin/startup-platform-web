/**
 * MainLayout - Wrapper for Investor and Admin dashboards.
 * Renders Navbar + Sidebar + Outlet for nested routes.
 */
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Container, Row, Col } from 'react-bootstrap'

function MainLayout({ role = 'investor' }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar role={role} />
      <Row className="flex-grow-1 g-0">
        <Col md={3} lg={2} className="d-none d-md-block">
          <Sidebar role={role} />
        </Col>
        <Col md={9} lg={10}>
          <main className="p-4">
            <Outlet />
          </main>
        </Col>
      </Row>
    </div>
  )
}

export default MainLayout
