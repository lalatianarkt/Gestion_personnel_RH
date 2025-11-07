// src/pages/RH/Employees/Employees.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, Popconfirm, message, Avatar, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';

const { Option } = Select;

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Données mockées
  useEffect(() => {
    setEmployees([
      { id: 1, nom: 'Dupont Jean', departement: 'IT', poste: 'Développeur Senior', email: 'dupont@exemple.com' },
      { id: 2, nom: 'Martin Marie', departement: 'Finance', poste: 'Analyste', email: 'martin@exemple.com' },
      { id: 3, nom: 'Bernard Pierre', departement: 'RH', poste: 'Manager', email: 'bernard@exemple.com' },
    ]);
  }, []);

  // Ajouter un nouvel employé
  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // Modifier un employé existant
  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    form.setFieldsValue(employee); // pré-remplir le formulaire
    setIsModalVisible(true);
  };

  // Supprimer un employé
  const handleDeleteEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    message.success('Employé supprimé avec succès');
  };

  // Sauvegarder (ajout ou modification)
  const handleSaveEmployee = () => {
    form.validateFields().then(values => {
      if (selectedEmployee) {
        // Modification
        setEmployees(prev => prev.map(emp =>
          emp.id === selectedEmployee.id ? { ...emp, ...values } : emp
        ));
        message.success('Employé modifié avec succès');
      } else {
        // Ajout
        const newEmployee = { id: Date.now(), ...values };
        setEmployees(prev => [...prev, newEmployee]);
        message.success('Employé ajouté avec succès');
      }
      setIsModalVisible(false);
      form.resetFields();
      setSelectedEmployee(null);
    });
  };

  // Colonnes du tableau
  const columns = [
    {
      title: 'Employé',
      dataIndex: 'nom',
      key: 'nom',
      render: (nom, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div>{nom}</div>
            <div style={{ fontSize: '12px', color: '#999' }}>
              {record.poste} - {record.departement}
            </div>
          </div>
        </Space>
      )
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Modifier">
            <Button 
              type="link" 
              icon={<EditOutlined />}
              onClick={() => handleEditEmployee(record)}
            />
          </Tooltip>
          <Tooltip title="Supprimer">
            <Popconfirm
              title="Supprimer cet employé ?"
              onConfirm={() => handleDeleteEmployee(record.id)}
              okText="Oui"
              cancelText="Non"
            >
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddEmployee} style={{ marginBottom: 16 }}>
        Ajouter un employé
      </Button>

      <Table
        columns={columns}
        dataSource={employees}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {/* Modal pour ajouter/modifier un employé */}
      <Modal
        title={selectedEmployee ? 'Modifier l’employé' : 'Ajouter un employé'}
        open={isModalVisible}
        onOk={handleSaveEmployee}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setSelectedEmployee(null);
        }}
        width={500}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nom"
            label="Nom complet"
            rules={[{ required: true, message: 'Nom requis' }]}
          >
            <Input placeholder="Ex: Dupont Jean" />
          </Form.Item>

          <Form.Item
            name="poste"
            label="Poste"
            rules={[{ required: true, message: 'Poste requis' }]}
          >
            <Input placeholder="Ex: Développeur" />
          </Form.Item>

          <Form.Item
            name="departement"
            label="Département"
            rules={[{ required: true, message: 'Département requis' }]}
          >
            <Select placeholder="Sélectionnez un département">
              <Option value="IT">IT</Option>
              <Option value="Finance">Finance</Option>
              <Option value="RH">RH</Option>
              <Option value="Marketing">Marketing</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Email requis' },
              { type: 'email', message: 'Email invalide' }
            ]}
          >
            <Input placeholder="exemple@domaine.com" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Employees;
