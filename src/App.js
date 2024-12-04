import React, { useState, useEffect } from 'react';
import api from './services/api';
import Table from './components/Table';
import ModalForm from './components/ModalForm';

const App = () => {
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchUsers = async () => {
    const response = await api.get('/users');
    setUsers(response.data);
  };

  const handleSave = async (user) => {
    if (user.id) {
      await api.put(`/users/${user.id}`, user);
    } else {
      await api.post('/users', user);
    }
    fetchUsers();
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
    setModalVisible(true); // Abre o modal
  };

  const handleAdd = () => {
    setUserToEdit(null); // Limpa o formulário
    setModalVisible(true); // Abre o modal
  };

  const handleDelete = async (id) => {
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h1>CRUD com Modal</h1>
      <button className="btn btn-success mb-3" onClick={handleAdd}>
        Adicionar Usuário
      </button>
      <Table users={users} onEdit={handleEdit} onDelete={handleDelete} />
      <ModalForm
        show={modalVisible}
        onHide={() => setModalVisible(false)}
        onSave={handleSave}
        userToEdit={userToEdit}
      />
    </div>
  );
};

export default App;
