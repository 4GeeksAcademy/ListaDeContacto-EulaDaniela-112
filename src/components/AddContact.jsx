import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { contactActions } from "../contactActions.js";

const AddContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const actions = contactActions(dispatch);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: "",
        email: "", 
        phone: "",
        address: ""
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Verificar si estamos editando (hay un contacto en editingContact)
    const isEditing = store.editingContact !== null;
    
    // Llenar formulario si estamos editando
    useEffect(() => {
        if (isEditing) {
            setFormData({
                name: store.editingContact.name || "",
                email: store.editingContact.email || "",
                phone: store.editingContact.phone || "",
                address: store.editingContact.address || ""
            });
        }
    }, [store.editingContact, isEditing]);
    
    // Manejar cambios en inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Limpiar error del campo que se está editando
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = "El nombre es obligatorio";
        }
        
        if (!formData.email.trim()) {
            newErrors.email = "El email es obligatorio";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "El email no es válido";
        }
        
        if (!formData.phone.trim()) {
            newErrors.phone = "El teléfono es obligatorio";
        }
        
        if (!formData.address.trim()) {
            newErrors.address = "La dirección es obligatoria";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            if (isEditing) {
  
                await actions.updateContact(store.editingContact.id, formData);
                console.log('Contacto actualizado exitosamente');
            } else {

                await actions.createContact(formData);
                console.log('Contacto creado exitosamente');
            }
            
            setFormData({ name: "", email: "", phone: "", address: "" });
            actions.clearEditingContact();
            navigate('/');
            
        } catch (error) {
            console.error('Error al guardar contacto:', error);
            setErrors({ submit: 'Error al guardar el contacto. Inténtalo de nuevo.' });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // Cancelar edición
    const handleCancel = () => {
        actions.clearEditingContact();
        setFormData({ name: "", email: "", phone: "", address: "" });
        setErrors({});
        navigate('/');
    };
    
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow card-transparent">
                        <div className="card-header card-transparent text-dark">
                            <h3 className="card-title mb-0">
                                <i className={`fas ${isEditing ? 'fa-edit' : 'fa-plus'} me-2`}></i>
                                {isEditing ? 'Editar Contacto' : 'Agregar Nuevo Contacto'}
                            </h3>
                        </div>
                        
                        <div className="card-body">
                            {errors.submit && (
                                <div className="alert alert-danger" role="alert">
                                    {errors.submit}
                                </div>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        <i className="fas fa-user me-2"></i>Nombre completo *
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Ej: Pepa Perez"
                                    />
                                    {errors.name && (
                                        <div className="invalid-feedback">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        <i className="fas fa-envelope me-2"></i>Email *
                                    </label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Ej: Pepita@email.com"
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">
                                        <i className="fas fa-phone me-2"></i>Teléfono *
                                    </label>
                                    <input
                                        type="tel"
                                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Ej: +3466655544"
                                    />
                                    {errors.phone && (
                                        <div className="invalid-feedback">
                                            {errors.phone}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">
                                        <i className="fas fa-map-marker-alt me-2"></i>Dirección *
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Ej: Calle 123, Ciudad"
                                    />
                                    {errors.address && (
                                        <div className="invalid-feedback">
                                            {errors.address}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="d-flex justify-content-between">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={handleCancel}
                                        disabled={isSubmitting}
                                    >
                                        <i className="fas fa-times me-2"></i>
                                        Cancelar
                                    </button>
                                    
                                    <button
                                        type="submit"
                                        className={`btn ${isEditing ? 'btn-edit' : 'btn-success'}`}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Guardando...
                                            </>
                                        ) : (
                                            <>
                                                <i className={`fas ${isEditing ? 'fa-save' : 'fa-plus'} me-2`}></i>
                                                {isEditing ? 'Actualizar Contacto' : 'Crear Contacto'}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddContact;