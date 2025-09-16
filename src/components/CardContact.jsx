import React from "react";
import { Link } from "react-router-dom";

const CardContact = ({ contact, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(contact);
  };

  const handleDelete = () => {
    onDelete(contact.id);
  };

  return (
    <div className="card mb-3 shadow-sm card-transparent">
      <div className="row g-0">
        <div className="col-md-2 d-flex align-items-center justify-content-center">
          <div className="avatar-placeholder bg-secondary text-white d-flex align-items-center justify-content-center" 
               style={{ width: '100px', height: '100px', borderRadius: '50%', fontSize: '30px' }}>
            {contact.name ? contact.name.charAt(0).toUpperCase() : 'C'}
          </div>
        </div>
        
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title mb-2">
              <i className="fas fa-user me-2"></i>
              {contact.name}
            </h5>
            
            <div className="contact-info">
              <p className="card-text mb-1">
                <i className="fas fa-phone me-2"></i>
                <strong>Teléfono:</strong> {contact.phone || 'No disponible'}
              </p>
              
              <p className="card-text mb-1">
                <i className="fas fa-envelope me-2"></i>
                <strong>Email:</strong> {contact.email || 'No disponible'}
              </p>
              
              <p className="card-text mb-2">
                <i className="fas fa-map-marker-alt me-2"></i>
                <strong>Dirección:</strong> {contact.address || 'No disponible'}
              </p>
            </div>
            
            <p className="card-text">
              <small className="text-muted">
                <i className="fas fa-calendar me-1"></i>
                ID: {contact.id}
              </small>
            </p>
          </div>
        </div>
        
        <div className="col-md-2 d-flex flex-column justify-content-center align-items-center p-3">
          <Link 
            to="/addcontact" 
            className="btn btn-edit btn-sm mb-2 w-100"
            onClick={handleEdit}
          >
            <i className="fas fa-edit me-1"></i>
          </Link>
          
          <button 
            className="btn btn-edit btn-sm w-100"
            onClick={handleDelete}
          >
            <i className="fas fa-trash me-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardContact;