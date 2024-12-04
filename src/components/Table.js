import React from 'react';

const Table = ({ users, onEdit, onDelete }) => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Nome</th>
        <th>Email</th>
        <th>Celular</th>
        <th>CPF</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) => (
        <tr key={user.id}>
          <td>{index + 1}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.cpf}</td>
          <td>
            <button className="btn btn-primary btn-sm" onClick={() => onEdit(user)}>
              Editar
            </button>
            <button className="btn btn-danger btn-sm ms-2" onClick={() => onDelete(user.id)}>
              Excluir
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
