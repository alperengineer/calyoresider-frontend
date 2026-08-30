import React from 'react';
import { Container, Card } from 'react-bootstrap';

const BursBasvuruPage = () => {
    return (
        <div className="page-container fade-in">
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                <Card className="custom-card shadow-sm border-0 p-4 p-md-5 text-center" style={{ maxWidth: '700px', width: '100%' }}>
                    <Card.Body>
                        <div className="mb-4">
                            <i className="fas fa-graduation-cap fa-4x text-primary"></i>
                        </div>
                        <h2 className="fw-bold mb-4" style={{ color: 'var(--primary-color)' }}>Burs Başvuruları</h2>

                        <div className="p-4 rounded-3" style={{ backgroundColor: '#eff6ff' }}>
                            <p className="fs-5 mb-0" style={{ color: 'var(--text-dark)', lineHeight: '1.8' }}>
                                Değerli öğrencilerimiz her zaman sizlerin yanındayız. Üniversite öğrencilerimiz için burs başvuru takvimi <strong className="text-primary">1 Ekim - 1 Kasım</strong> olarak belirlenmiştir.
                            </p>
                        </div>

                        {/* TODO: İleride Burs Başvuru Formu buraya eklenecek */}
                        {/* <BursBasvuruFormu /> */}

                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default BursBasvuruPage;