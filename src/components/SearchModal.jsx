import { Modal, Form, Button } from 'react-bootstrap';

const SearchModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Search Books</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            type="search"
            placeholder="Search by title or keyword..."
            autoFocus
          />
          <Button variant="primary" className="mt-3 w-100">
            Search
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SearchModal;