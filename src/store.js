export const initialStore = () => {
  return {
    contacts: [],
    loading: false,
    error: null,
    editingContact: null,
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type) {
    case 'SET_LOADING':
      return {
        ...store,
        loading: action.payload
      };

    case 'SET_ERROR':
      return {
        ...store,
        error: action.payload,
        loading: false
      };

    case 'GET_CONTACTS':
      return {
        ...store,
        contacts: action.payload,
        loading: false,
        error: null
      };

    case 'ADD_CONTACT':
      return {
        ...store,
        contacts: [...store.contacts, action.payload],
        loading: false,
        error: null
      };

    case 'UPDATE_CONTACT':
      return {
        ...store,
        contacts: store.contacts.map(contact => 
          contact.id === action.payload.id ? action.payload : contact
        ),
        editingContact: null,
        loading: false,
        error: null
      };

    case 'DELETE_CONTACT':
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload),
        loading: false,
        error: null
      };

    case 'SET_EDITING_CONTACT':
      return {
        ...store,
        editingContact: action.payload
      };

    case 'CLEAR_EDITING_CONTACT':
      return {
        ...store,
        editingContact: null
      };

    default:
      return store;
  }
}