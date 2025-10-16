// src/pages/RH/Competences/Competences.jsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Progress,
  Space,
  Tooltip,
  Avatar,
  List,
  Statistic,
  Divider,
  Badge,
  Popconfirm,
  message,
  Tabs,
  InputNumber
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserOutlined,
  TrophyOutlined,
  BookOutlined,
  BarChartOutlined,
  TeamOutlined,
  SearchOutlined,
  StarOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Search } = Input;

const Competences = () => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [competences, setCompetences] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCompetenceModalVisible, setIsCompetenceModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedCompetence, setSelectedCompetence] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();
  const [competenceForm] = Form.useForm();

  // Données mockées des employés avec compétences
  useEffect(() => {
    const mockEmployees = [
      {
        id: 1,
        nom: 'Dupont Jean',
        departement: 'IT',
        poste: 'Développeur Senior',
        competences: [
          { id: 1, nom: 'Java', niveau: 5, type: 'technique', dateAcquisition: '2023-01-15' },
          { id: 2, nom: 'Spring Boot', niveau: 4, type: 'technique', dateAcquisition: '2023-03-20' },
          { id: 3, nom: 'MySQL', niveau: 4, type: 'technique', dateAcquisition: '2022-11-10' },
          { id: 4, nom: 'Angular', niveau: 3, type: 'technique', dateAcquisition: '2023-06-05' }
        ]
      },
      {
        id: 2,
        nom: 'Martin Marie',
        departement: 'IT',
        poste: 'Développeuse Frontend',
        competences: [
          { id: 5, nom: 'React', niveau: 5, type: 'technique', dateAcquisition: '2023-02-18' },
          { id: 6, nom: 'JavaScript', niveau: 5, type: 'technique', dateAcquisition: '2022-09-12' },
          { id: 7, nom: 'TypeScript', niveau: 4, type: 'technique', dateAcquisition: '2023-04-22' },
          { id: 8, nom: 'CSS/SCSS', niveau: 4, type: 'technique', dateAcquisition: '2022-08-30' }
        ]
      },
      {
        id: 3,
        nom: 'Bernard Pierre',
        departement: 'Finance',
        poste: 'Analyste Financier',
        competences: [
          { id: 9, nom: 'Excel', niveau: 5, type: 'bureautique', dateAcquisition: '2022-07-15' },
          { id: 10, nom: 'Comptabilité', niveau: 4, type: 'metier', dateAcquisition: '2023-01-10' },
          { id: 11, nom: 'PowerPoint', niveau: 4, type: 'bureautique', dateAcquisition: '2022-11-20' },
          { id: 12, nom: 'Analyse Financière', niveau: 5, type: 'metier', dateAcquisition: '2023-03-05' }
        ]
      }
    ];

    const mockCompetences = [
      { id: 1, nom: 'Java', categorie: 'Développement', description: 'Langage de programmation orienté objet' },
      { id: 2, nom: 'Spring Boot', categorie: 'Développement', description: 'Framework Java pour applications web' },
      { id: 3, nom: 'React', categorie: 'Frontend', description: 'Bibliothèque JavaScript pour interfaces utilisateur' },
      { id: 4, nom: 'Angular', categorie: 'Frontend', description: 'Framework TypeScript pour applications web' },
      { id: 5, nom: 'MySQL', categorie: 'Base de données', description: 'Système de gestion de base de données relationnelle' },
      { id: 6, nom: 'Excel', categorie: 'Bureautique', description: 'Tableur Microsoft pour analyses financières' },
      { id: 7, nom: 'Comptabilité', categorie: 'Métier', description: 'Principes et pratiques comptables' },
      { id: 8, nom: 'Leadership', categorie: 'Soft Skills', description: 'Compétences en management d équipe' }
    ];

    setEmployees(mockEmployees);
    setCompetences(mockCompetences);
  }, []);

  // Filtrage des employés
  const filteredEmployees = employees.filter(employee =>
    employee.nom.toLowerCase().includes(searchText.toLowerCase()) ||
    employee.departement.toLowerCase().includes(searchText.toLowerCase()) ||
    employee.competences.some(comp => 
      comp.nom.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  // Gestion des compétences employé
  const handleAddCompetence = (employee) => {
    setSelectedEmployee(employee);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditCompetence = (employee, competence) => {
    setSelectedEmployee(employee);
    setSelectedCompetence(competence);
    form.setFieldsValue({
      competenceId: competence.id,
      niveau: competence.niveau,
      dateAcquisition: competence.dateAcquisition
    });
    setIsModalVisible(true);
  };

  const handleDeleteCompetence = (employeeId, competenceId) => {
    setEmployees(prev => prev.map(emp =>
      emp.id === employeeId
        ? {
            ...emp,
            competences: emp.competences.filter(comp => comp.id !== competenceId)
          }
        : emp
    ));
    message.success('Compétence retirée avec succès');
  };

  const handleSaveCompetence = () => {
    form.validateFields().then(values => {
      if (selectedEmployee) {
        const competence = competences.find(comp => comp.id === values.competenceId);
        const newCompetence = {
          id: selectedCompetence ? selectedCompetence.id : Date.now(),
          nom: competence.nom,
          type: competence.categorie,
          niveau: values.niveau,
          dateAcquisition: values.dateAcquisition
        };

        setEmployees(prev => prev.map(emp =>
          emp.id === selectedEmployee.id
            ? {
                ...emp,
                competences: selectedCompetence
                  ? emp.competences.map(comp =>
                      comp.id === selectedCompetence.id ? newCompetence : comp
                    )
                  : [...emp.competences, newCompetence]
              }
            : emp
        ));

        message.success(
          selectedCompetence 
            ? 'Compétence modifiée avec succès' 
            : 'Compétence ajoutée avec succès'
        );
      }
      setIsModalVisible(false);
      form.resetFields();
      setSelectedCompetence(null);
    });
  };

  // Gestion du catalogue de compétences
  const handleAddCompetenceCatalogue = () => {
    setSelectedCompetence(null);
    competenceForm.resetFields();
    setIsCompetenceModalVisible(true);
  };

  const handleEditCompetenceCatalogue = (competence) => {
    setSelectedCompetence(competence);
    competenceForm.setFieldsValue(competence);
    setIsCompetenceModalVisible(true);
  };

  const handleDeleteCompetenceCatalogue = (competenceId) => {
    setCompetences(prev => prev.filter(comp => comp.id !== competenceId));
    message.success('Compétence supprimée du catalogue');
  };

  const handleSaveCompetenceCatalogue = () => {
    competenceForm.validateFields().then(values => {
      if (selectedCompetence) {
        // Modification
        setCompetences(prev => prev.map(comp =>
          comp.id === selectedCompetence.id ? { ...selectedCompetence, ...values } : comp
        ));
        message.success('Compétence modifiée avec succès');
      } else {
        // Ajout
        const newCompetence = {
          id: Date.now(),
          ...values
        };
        setCompetences(prev => [...prev, newCompetence]);
        message.success('Compétence ajoutée au catalogue');
      }
      setIsCompetenceModalVisible(false);
      competenceForm.resetFields();
      setSelectedCompetence(null);
    });
  };

  // Colonnes pour le tableau des employés
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
    {
      title: 'Compétences',
      dataIndex: 'competences',
      key: 'competences',
      render: (competences) => (
        <Space wrap>
          {competences.slice(0, 3).map(comp => (
            <Tooltip key={comp.id} title={`Niveau ${comp.niveau}/5`}>
              <Tag color={getCompetenceColor(comp.niveau)}>
                {comp.nom}
              </Tag>
            </Tooltip>
          ))}
          {competences.length > 3 && (
            <Tag>+{competences.length - 3} autres</Tag>
          )}
        </Space>
      )
    },
    {
      title: 'Score Moyen',
      key: 'scoreMoyen',
      render: (record) => {
        const moyenne = record.competences.length > 0
          ? (record.competences.reduce((sum, comp) => sum + comp.niveau, 0) / record.competences.length).toFixed(1)
          : 0;
        return (
          <Progress 
            percent={(moyenne / 5) * 100} 
            size="small" 
            format={() => `${moyenne}/5`}
            status={moyenne >= 4 ? 'success' : moyenne >= 3 ? 'normal' : 'exception'}
          />
        );
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <Space size="small">
          <Tooltip title="Voir les détails">
            <Button 
              type="link" 
              icon={<EyeOutlined />}
              onClick={() => handleAddCompetence(record)}
            />
          </Tooltip>
          <Tooltip title="Ajouter une compétence">
            <Button 
              type="link" 
              icon={<PlusOutlined />}
              onClick={() => handleAddCompetence(record)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  // Fonction utilitaire pour la couleur des compétences
  const getCompetenceColor = (niveau) => {
    switch (niveau) {
      case 1: return 'red';
      case 2: return 'orange';
      case 3: return 'yellow';
      case 4: return 'blue';
      case 5: return 'green';
      default: return 'default';
    }
  };

  return (
    <div className="container-fluid">
      {/* En-tête */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <TrophyOutlined className="me-2" />
                Gestion des Compétences
              </h2>
              <p className="text-muted">
                Inventaire et suivi des compétences des collaborateurs
              </p>
            </div>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={handleAddCompetenceCatalogue}
            >
              Ajouter au catalogue
            </Button>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <Row gutter={16} className="mb-4">
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Employés"
              value={employees.length}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Compétences Moyennes"
              value={
                employees.length > 0
                  ? (employees.reduce((sum, emp) => {
                      const moyenneEmp = emp.competences.length > 0
                        ? emp.competences.reduce((sumComp, comp) => sumComp + comp.niveau, 0) / emp.competences.length
                        : 0;
                      return sum + moyenneEmp;
                    }, 0) / employees.length).toFixed(1)
                  : 0
              }
              suffix="/5"
              prefix={<StarOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Compétences Uniques"
              value={competences.length}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Taux de Complétion"
              value="78"
              suffix="%"
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="employes">
        {/* Onglet 1: Liste des employés */}
        <TabPane 
          tab={
            <span>
              <TeamOutlined />
              Employés et Compétences
            </span>
          } 
          key="employes"
        >
          <Card
            title="Liste des Collaborateurs"
            extra={
              <Search
                placeholder="Rechercher un employé ou compétence..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 300 }}
              />
            }
          >
            <Table
              columns={columns}
              dataSource={filteredEmployees}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              expandable={{
                expandedRowRender: (record) => (
                  <div>
                    <h5>Détail des compétences :</h5>
                    <List
                      dataSource={record.competences}
                      renderItem={competence => (
                        <List.Item
                          actions={[
                            <Tooltip title="Modifier">
                              <Button 
                                type="link" 
                                icon={<EditOutlined />}
                                onClick={() => handleEditCompetence(record, competence)}
                              />
                            </Tooltip>,
                            <Tooltip title="Supprimer">
                              <Popconfirm
                                title="Retirer cette compétence ?"
                                onConfirm={() => handleDeleteCompetence(record.id, competence.id)}
                                okText="Oui"
                                cancelText="Non"
                              >
                                <Button 
                                  type="link" 
                                  danger 
                                  icon={<DeleteOutlined />}
                                />
                              </Popconfirm>
                            </Tooltip>
                          ]}
                        >
                          <List.Item.Meta
                            avatar={
                              <Badge 
                                count={competence.niveau} 
                                style={{ 
                                  backgroundColor: getCompetenceColor(competence.niveau)
                                }} 
                              />
                            }
                            title={competence.nom}
                            description={
                              <div>
                                <div>Type: {competence.type}</div>
                                <div>Acquise le: {competence.dateAcquisition}</div>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                )
              }}
            />
          </Card>
        </TabPane>

        {/* Onglet 2: Catalogue des compétences */}
        <TabPane 
          tab={
            <span>
              <BookOutlined />
              Catalogue des Compétences
            </span>
          } 
          key="catalogue"
        >
          <Card
            title="Répertoire des Compétences"
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAddCompetenceCatalogue}
              >
                Nouvelle compétence
              </Button>
            }
          >
            <Row gutter={16}>
              {competences.map(competence => (
                <Col span={8} key={competence.id} className="mb-3">
                  <Card
                    size="small"
                    actions={[
                      <Tooltip title="Modifier">
                        <EditOutlined onClick={() => handleEditCompetenceCatalogue(competence)} />
                      </Tooltip>,
                      <Tooltip title="Supprimer">
                        <Popconfirm
                          title="Supprimer cette compétence ?"
                          onConfirm={() => handleDeleteCompetenceCatalogue(competence.id)}
                          okText="Oui"
                          cancelText="Non"
                        >
                          <DeleteOutlined style={{ color: '#ff4d4f' }} />
                        </Popconfirm>
                      </Tooltip>
                    ]}
                  >
                    <Card.Meta
                      title={competence.nom}
                      description={
                        <div>
                          <Tag color="blue">{competence.categorie}</Tag>
                          <div className="mt-2 small text-muted">
                            {competence.description}
                          </div>
                          <div className="mt-2">
                            <Badge 
                              count={`${employees.filter(emp => 
                                emp.competences.some(comp => comp.nom === competence.nom)
                              ).length} employés`} 
                              style={{ backgroundColor: '#52c41a' }} 
                            />
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </TabPane>

        {/* Onglet 3: Analyse des compétences */}
        <TabPane 
          tab={
            <span>
              <BarChartOutlined />
              Analyse
            </span>
          } 
          key="analyse"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Répartition par Catégorie">
                <List
                  dataSource={[
                    { categorie: 'Technique', count: 6, color: 'blue' },
                    { categorie: 'Bureautique', count: 2, color: 'green' },
                    { categorie: 'Métier', count: 2, color: 'orange' },
                    { categorie: 'Soft Skills', count: 1, color: 'purple' }
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Tag color={item.color}>{item.categorie}</Tag>}
                        description={
                          <Progress 
                            percent={(item.count / competences.length) * 100} 
                            size="small"
                            format={() => `${item.count} compétences`}
                          />
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Top Compétences Maîtrisées">
                <List
                  dataSource={competences.map(comp => {
                    const employesAvecCompetence = employees.filter(emp =>
                      emp.competences.some(c => c.nom === comp.nom && c.niveau >= 4)
                    ).length;
                    return {
                      ...comp,
                      maitrise: employesAvecCompetence
                    };
                  }).sort((a, b) => b.maitrise - a.maitrise).slice(0, 5)}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.nom}
                        description={
                          <div>
                            <Progress 
                              percent={(item.maitrise / employees.length) * 100} 
                              size="small"
                              format={() => `${item.maitrise}/${employees.length} employés`}
                            />
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* Modal pour ajouter/modifier une compétence à un employé */}
      <Modal
        title={
          <span>
            {selectedCompetence ? <EditOutlined /> : <PlusOutlined />}
            {selectedCompetence ? ' Modifier la compétence' : ' Ajouter une compétence'}
            {selectedEmployee && ` - ${selectedEmployee.nom}`}
          </span>
        }
        open={isModalVisible}
        onOk={handleSaveCompetence}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setSelectedCompetence(null);
        }}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="competenceId"
            label="Compétence"
            rules={[{ required: true, message: 'Veuillez sélectionner une compétence' }]}
          >
            <Select placeholder="Sélectionnez une compétence">
              {competences.map(comp => (
                <Option key={comp.id} value={comp.id}>
                  {comp.nom} - {comp.categorie}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="niveau"
            label="Niveau de maîtrise (1-5)"
            rules={[{ required: true, message: 'Veuillez sélectionner un niveau' }]}
          >
            <Select placeholder="Sélectionnez le niveau">
              <Option value={1}>1 - Novice</Option>
              <Option value={2}>2 - Intermédiaire</Option>
              <Option value={3}>3 - Compétent</Option>
              <Option value={4}>4 - Avancé</Option>
              <Option value={5}>5 - Expert</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dateAcquisition"
            label="Date d'acquisition"
            rules={[{ required: true, message: 'Veuillez sélectionner une date' }]}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal pour le catalogue de compétences */}
      <Modal
        title={
          <span>
            {selectedCompetence ? <EditOutlined /> : <PlusOutlined />}
            {selectedCompetence ? ' Modifier la compétence' : ' Nouvelle compétence'}
          </span>
        }
        open={isCompetenceModalVisible}
        onOk={handleSaveCompetenceCatalogue}
        onCancel={() => {
          setIsCompetenceModalVisible(false);
          competenceForm.resetFields();
          setSelectedCompetence(null);
        }}
        width={500}
      >
        <Form
          form={competenceForm}
          layout="vertical"
        >
          <Form.Item
            name="nom"
            label="Nom de la compétence"
            rules={[{ required: true, message: 'Nom requis' }]}
          >
            <Input placeholder="Ex: Java, React, Comptabilité..." />
          </Form.Item>

          <Form.Item
            name="categorie"
            label="Catégorie"
            rules={[{ required: true, message: 'Catégorie requise' }]}
          >
            <Select placeholder="Sélectionnez une catégorie">
              <Option value="Développement">Développement</Option>
              <Option value="Frontend">Frontend</Option>
              <Option value="Base de données">Base de données</Option>
              <Option value="Bureautique">Bureautique</Option>
              <Option value="Métier">Métier</Option>
              <Option value="Soft Skills">Soft Skills</Option>
              <Option value="Management">Management</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <TextArea
              rows={3}
              placeholder="Description de la compétence..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Competences;