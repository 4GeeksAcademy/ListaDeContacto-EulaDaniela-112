const BASE_URL = 'https://playground.4geeks.com/contact';
const AGENDA_NAME = 'DanielaEula'; // Tu nombre de agenda

export const contactActions = (dispatch) => {
  
  // Obtener todos los contactos
  const getContacts = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(`${BASE_URL}/agendas/${AGENDA_NAME}`);
      
      if (!response.ok) {
        throw new Error('Error al obtener contactos');
      }
      
      const data = await response.json();
      dispatch({ type: 'GET_CONTACTS', payload: data.contacts || [] });
    } catch (error) {
      console.error('Error getting contacts:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  //Crear nuevo contacto
  const createContact = async (contactData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(`${BASE_URL}/agendas/${AGENDA_NAME}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        throw new Error('Error al crear contacto');
      }

      const newContact = await response.json();
      dispatch({ type: 'ADD_CONTACT', payload: newContact });
      return newContact;
    } catch (error) {
      console.error('Error creating contact:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  // PUT - Actualizar contacto existente
  const updateContact = async (contactId, contactData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(`${BASE_URL}/agendas/${AGENDA_NAME}/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar contacto');
      }

      const updatedContact = await response.json();
      dispatch({ type: 'UPDATE_CONTACT', payload: updatedContact });
      return updatedContact;
    } catch (error) {
      console.error('Error updating contact:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  // DELETE, Eliminar contacto
  const deleteContact = async (contactId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(`${BASE_URL}/agendas/${AGENDA_NAME}/contacts/${contactId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar contacto');
      }

      dispatch({ type: 'DELETE_CONTACT', payload: contactId });
      return true;
    } catch (error) {
      console.error('Error deleting contact:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  // Funciones auxiliares para edición
  const setEditingContact = (contact) => {
    dispatch({ type: 'SET_EDITING_CONTACT', payload: contact });
  };

  const clearEditingContact = () => {
    dispatch({ type: 'CLEAR_EDITING_CONTACT' });
  };

  return {
    getContacts,
    createContact,
    updateContact,
    deleteContact,
    setEditingContact,
    clearEditingContact
  };
};