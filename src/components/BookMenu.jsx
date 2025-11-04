import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BooksMenu = () => {
  const books = [
    {
      id: 'the-accursed-god',
      title: 'The Accursed God',
      description: 'A gripping tale from the Mahabharata era...',
      coverImage: '/path/to/accursed-god-cover.jpg',
      buyLink: 'https://amazon.com/accursed-god'
    },
    {
      id: 'manas',
      title: 'Manas',
      description: 'An exploration of the human mind through mythology...',
      coverImage: '/path/to/manas-cover.jpg',
      buyLink: 'https://amazon.com/manas'
    },
    {
      id: 'the-shadows-of-kali',
      title: 'The Shadows of Kali',
      description: 'Coming soon - A dark journey through...',
      coverImage: '/path/to/shadows-of-kali-cover.jpg',
      buyLink: '#',
      comingSoon: true
    }
  ];

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">My Books</h1>
      <Row className="g-4">
        {books.map(book => (
          <Col key={book.id} md={4}>
            <Card className="h-100 shadow">
              <Card.Img variant="top" src={book.coverImage} alt={book.title} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                {book.comingSoon ? (
                  <Button variant="secondary" disabled className="w-100">
                    Coming Soon
                  </Button>
                ) : (
                  <div className="d-flex gap-2">
                    <Button as={Link} to={`/books/${book.id}`} variant="outline-primary" className="flex-grow-1">
                      Details
                    </Button>
                    <Button href={book.buyLink} variant="danger" className="flex-grow-1">
                      Buy Now
                    </Button>
                  </div>
                )}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BooksMenu;