import React, { useState } from 'react';

const Form = ({ onSave, userToEdit }) => {
  const [formData, setFormData] = useState(
    userToEdit || { name: '', email: '', phone: '', cpf: '' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: '', email: '', phone: '', cpf: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Celular</label>
        <input
          type="text"
          className="form-control"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">CPF</label>
        <input
          type="text"
          className="form-control"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-success">
        Salvar
      </button>
    </form>
  );
};

export default Form;
