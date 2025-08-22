import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, ListGroup } from 'react-bootstrap';

const Dashboard = () => {
  const [agents, setAgents] = useState([]);
  const [lists, setLists] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/agents', {
          headers: { 'x-auth-token': token },
        });
        setAgents(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    const fetchLists = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/lists', {
          headers: { 'x-auth-token': token },
        });
        setLists(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchAgents();
    fetchLists();
  }, []);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFileUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/lists/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      });
      // Refresh lists
      const res = await axios.get('http://localhost:5000/api/lists', {
        headers: { 'x-auth-token': token },
      });
      setLists(res.data);
      setFile(null); // Clear file input after upload
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Dashboard</h1>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>Agents</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {agents.map((agent) => (
                  <ListGroup.Item key={agent._id}>{agent.name}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>Upload CSV</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Select CSV File</Form.Label>
                  <Form.Control type="file" onChange={onFileChange} />
                </Form.Group>
                <Button variant="primary" onClick={onFileUpload} disabled={!file}>
                  Upload
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>Distributed Lists</Card.Header>
            <Card.Body>
              {lists.map((list) => (
                <Card key={list._id} className="mb-3">
                  <Card.Header>Agent: {list.agent.name}</Card.Header>
                  <ListGroup variant="flush">
                    {list.items.map((item, index) => (
                      <ListGroup.Item key={index}>
                        {item.firstName} - {item.phone}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
