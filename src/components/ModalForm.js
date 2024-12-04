import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';

// Validação com Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Somente letras são permitidas')
    .required('O nome é obrigatório'),
  email: Yup.string()
    .email('Formato de e-mail inválido')
    .required('O e-mail é obrigatório'),
  phone: Yup.string()
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Formato inválido: (99) 99999-9999')
    .required('O celular é obrigatório'),
  cpf: Yup.string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato inválido: 999.999.999-99')
    .required('O CPF é obrigatório'),
});

const ModalForm = ({ show, onHide, onSave, userToEdit }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      cpf: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSave(values);
      onHide();
    },
    enableReinitialize: true, // Atualiza o formulário ao receber novos valores
  });

  // Preenche o formulário ao abrir o modal para edição
  useEffect(() => {
    if (userToEdit) {
      formik.setValues(userToEdit);
    }
  }, [userToEdit]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{userToEdit ? 'Editar Usuário' : 'Adicionar Usuário'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className={`form-control ${formik.errors.name && formik.touched.name ? 'is-invalid' : ''}`}
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && (
              <div className="invalid-feedback">{formik.errors.name}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              className={`form-control ${formik.errors.email && formik.touched.email ? 'is-invalid' : ''}`}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Celular</label>
            <InputMask
              mask="(99) 99999-9999"
              className={`form-control ${formik.errors.phone && formik.touched.phone ? 'is-invalid' : ''}`}
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="invalid-feedback">{formik.errors.phone}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">CPF</label>
            <InputMask
              mask="999.999.999-99"
              className={`form-control ${formik.errors.cpf && formik.touched.cpf ? 'is-invalid' : ''}`}
              name="cpf"
              value={formik.values.cpf}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.cpf && formik.touched.cpf && (
              <div className="invalid-feedback">{formik.errors.cpf}</div>
            )}
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
