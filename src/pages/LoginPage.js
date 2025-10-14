import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(username, password);
        } catch (err) {
            setError('Kullanıcı adı veya şifre hatalı.');
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
            <Card style={{ width: '25rem' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Admin Girişi</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="username">
                            <Form.Label>Kullanıcı Adı</Form.Label>
                            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </Form.Group>
                        <Form.Group id="password" className="mt-3">
                            <Form.Label>Şifre</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Button className="w-100 mt-4" type="submit">Giriş Yap</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LoginPage;