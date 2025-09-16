import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { contactActions } from "../contactActions.js";
import CardContact from "../components/CardContact"

const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const actions = contactActions(dispatch);

  useEffect(() => {
    actions.getContacts();
  }, []);

  if (store.loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (store.error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          Error: {store.error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-6">
        <h1>Mis Contactos</h1>
        <Link to="/addcontact" className="btn btn-success">
          <i className="fas fa-plus me-2"></i>
          Agregar Contacto
        </Link>
      </div>

      {store.contacts.length === 0 ? (
        <div className="text-center mt-5">
          <h3 className="text-muted">No tenés contactos aún</h3>
        </div>
      ) : (
        <div className="row">
          {store.contacts.map(contact => (
            <div key={contact.id} className="col-12 mb-3">
              <CardContact 
                contact={contact} 
                onEdit={() => actions.setEditingContact(contact)}
                onDelete={(id) => {
                  if (window.confirm('¿Estás seguro de que quieres eliminar este contacto?')) {
                    actions.deleteContact(id);
                  }
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;