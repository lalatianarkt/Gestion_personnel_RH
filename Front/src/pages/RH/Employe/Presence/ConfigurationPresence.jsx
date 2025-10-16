// src/pages/RH/Employe/Presence/ConfigurationPresence.jsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Button,
  TimePicker,
  DatePicker,
  Table,
  Tag,
  Modal,
  message,
  Divider,
  Alert,
  List,
  Space,
  Tooltip,
  Popconfirm,
  Tabs,
  Badge,
  Upload
} from 'antd';
import {
  SaveOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ClockCircleOutlined,
  BellOutlined,
  CalendarOutlined,
  SettingOutlined,
  UploadOutlined,
  DownloadOutlined,
  ReloadOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const ConfigurationPresence = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('horaires');
  const [joursFeries, setJoursFeries] = useState([]);
  const [plagesHoraires, setPlagesHoraires] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFerieModalVisible, setIsFerieModalVisible] = useState(false);
  const [selectedPlage, setSelectedPlage] = useState(null);
  const [selectedFerie, setSelectedFerie] = useState(null);
  const [form] = Form.useForm();
  const [ferieForm] = Form.useForm();

  // Configuration par défaut
  const [configuration, setConfiguration] = useState({
    // Horaires de travail
    horaires: {
      heureDebut: '09:00',
      heureFin: '17:00',
      pauseDejeuner: 60,
      dureeJournee: 7,
      toleranceArrivee: 5,
      travailWeekend: false
    },
    
    // Seuils de retard
    seuils: {
      seuilAlerteRetard: 15,
      seuilAvertissementRetard: 30,
      seuilCritiqueRetard: 60,
      nombreRetardsAlerte: 3,
      periodeCalculRetards: 30
    },
    
    // Notifications
    notifications: {
      notificationRetardAuto: true,
      notificationAbsenceAuto: true,
      canalNotification: 'email',
      templateRetard: 'Bonjour {employe}, vous avez été signalé en retard ce {date} à {heure}.',
      templateAbsence: 'Bonjour {employe}, votre absence du {date} a été enregistrée.',
      rappelJustificatif: true,
      delaiRappelJustificatif: 24
    },
    
    // Paramètres généraux
    parametres: {
      modePointage: 'manuel',
      validationSuperviseur: true,
      calculHeuresAuto: true,
      roundHeures: 15,
      fuseauHoraire: 'Europe/Paris'
    }
  });

  // Chargement initial des données
  useEffect(() => {
    loadConfiguration();
    loadJoursFeries();
    loadPlagesHoraires();
  }, []);

  const loadConfiguration = () => {
    // Simulation de chargement depuis une API
    setLoading(true);
    setTimeout(() => {
      // Données mockées
      const mockConfiguration = {
        horaires: {
          heureDebut: '09:00',
          heureFin: '17:00',
          pauseDejeuner: 60,
          dureeJournee: 7,
          toleranceArrivee: 5,
          travailWeekend: false
        },
        seuils: {
          seuilAlerteRetard: 15,
          seuilAvertissementRetard: 30,
          seuilCritiqueRetard: 60,
          nombreRetardsAlerte: 3,
          periodeCalculRetards: 30
        },
        notifications: {
          notificationRetardAuto: true,
          notificationAbsenceAuto: true,
          canalNotification: 'email',
          templateRetard: 'Bonjour {employe}, vous avez été signalé en retard ce {date} à {heure}. Merci de fournir un justificatif si nécessaire.',
          templateAbsence: 'Bonjour {employe}, votre absence du {date} a été enregistrée. Veuillez régulariser votre situation.',
          rappelJustificatif: true,
          delaiRappelJustificatif: 24
        },
        parametres: {
          modePointage: 'manuel',
          validationSuperviseur: true,
          calculHeuresAuto: true,
          roundHeures: 15,
          fuseauHoraire: 'Europe/Paris'
        }
      };
      setConfiguration(mockConfiguration);
      setLoading(false);
    }, 1000);
  };

  const loadJoursFeries = () => {
    // Jours fériés mockés pour l'année en cours
    const annee = moment().year();
    const mockJoursFeries = [
      {
        id: 1,
        nom: 'Jour de l\'an',
        date: `${annee}-01-01`,
        type: 'ferie',
        recurrence: 'annuelle',
        paye: true
      },
      {
        id: 2,
        nom: 'Fête du travail',
        date: `${annee}-05-01`,
        type: 'ferie',
        recurrence: 'annuelle',
        paye: true
      },
      {
        id: 3,
        nom: 'Armistice 1945',
        date: `${annee}-05-08`,
        type: 'ferie',
        recurrence: 'annuelle',
        paye: true
      },
      {
        id: 4,
        nom: 'Fête nationale',
        date: `${annee}-07-14`,
        type: 'ferie',
        recurrence: 'annuelle',
        paye: true
      },
      {
        id: 5,
        nom: 'Assomption',
        date: `${annee}-08-15`,
        type: 'ferie',
        recurrence: 'annuelle',
        paye: true
      },
      {
        id: 6,
        nom: 'Toussaint',
        date: `${annee}-11-01`,
        type: 'ferie',
        recurrence: 'annuelle',
        paye: true
      },
      {
        id: 7,
        nom: 'Noël',
        date: `${annee}-12-25`,
        type: 'ferie',
        recurrence: 'annuelle',
        paye: true
      }
    ];
    setJoursFeries(mockJoursFeries);
  };

  const loadPlagesHoraires = () => {
    // Plages horaires mockées
    const mockPlages = [
      {
        id: 1,
        nom: 'Standard',
        heureDebut: '09:00',
        heureFin: '17:00',
        jours: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'],
        type: 'standard',
        actif: true
      },
      {
        id: 2,
        nom: 'Télétravail',
        heureDebut: '08:30',
        heureFin: '16:30',
        jours: ['lundi', 'mercredi', 'vendredi'],
        type: 'teletravail',
        actif: true
      },
      {
        id: 3,
        nom: 'Été',
        heureDebut: '08:00',
        heureFin: '16:00',
        jours: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'],
        type: 'saisonnier',
        actif: false
      }
    ];
    setPlagesHoraires(mockPlages);
  };

  // Sauvegarde de la configuration
  const saveConfiguration = () => {
    setLoading(true);
    // Simulation de sauvegarde
    setTimeout(() => {
      message.success('Configuration sauvegardée avec succès');
      setLoading(false);
    }, 1500);
  };

  // Réinitialisation de la configuration
  const resetConfiguration = () => {
    Modal.confirm({
      title: 'Réinitialiser la configuration',
      content: 'Êtes-vous sûr de vouloir réinitialiser tous les paramètres aux valeurs par défaut ?',
      okText: 'Oui',
      cancelText: 'Non',
      onOk: () => {
        loadConfiguration();
        message.info('Configuration réinitialisée');
      }
    });
  };

  // Gestion des plages horaires
  const handleAddPlage = () => {
    setSelectedPlage(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditPlage = (plage) => {
    setSelectedPlage(plage);
    form.setFieldsValue({
      ...plage,
      jours: plage.jours || []
    });
    setIsModalVisible(true);
  };

  const handleDeletePlage = (plage) => {
    setPlagesHoraires(prev => prev.filter(p => p.id !== plage.id));
    message.success('Plage horaire supprimée');
  };

  const handleSavePlage = () => {
    form.validateFields().then(values => {
      if (selectedPlage) {
        // Modification
        setPlagesHoraires(prev => prev.map(p => 
          p.id === selectedPlage.id 
            ? { ...selectedPlage, ...values }
            : p
        ));
        message.success('Plage horaire modifiée');
      } else {
        // Ajout
        const newPlage = {
          id: Date.now(),
          ...values
        };
        setPlagesHoraires(prev => [...prev, newPlage]);
        message.success('Plage horaire ajoutée');
      }
      setIsModalVisible(false);
      form.resetFields();
      setSelectedPlage(null);
    });
  };

  // Gestion des jours fériés
  const handleAddFerie = () => {
    setSelectedFerie(null);
    ferieForm.resetFields();
    setIsFerieModalVisible(true);
  };

  const handleEditFerie = (ferie) => {
    setSelectedFerie(ferie);
    ferieForm.setFieldsValue({
      ...ferie,
      date: moment(ferie.date)
    });
    setIsFerieModalVisible(true);
  };

  const handleDeleteFerie = (ferie) => {
    setJoursFeries(prev => prev.filter(j => j.id !== ferie.id));
    message.success('Jour férié supprimé');
  };

  const handleSaveFerie = () => {
    ferieForm.validateFields().then(values => {
      if (selectedFerie) {
        // Modification
        setJoursFeries(prev => prev.map(j => 
          j.id === selectedFerie.id 
            ? { ...selectedFerie, ...values, date: values.date.format('YYYY-MM-DD') }
            : j
        ));
        message.success('Jour férié modifié');
      } else {
        // Ajout
        const newFerie = {
          id: Date.now(),
          ...values,
          date: values.date.format('YYYY-MM-DD')
        };
        setJoursFeries(prev => [...prev, newFerie]);
        message.success('Jour férié ajouté');
      }
      setIsFerieModalVisible(false);
      ferieForm.resetFields();
      setSelectedFerie(null);
    });
  };

  // Colonnes pour le tableau des plages horaires
  const columnsPlages = [
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom'
    },
    {
      title: 'Heure Début',
      dataIndex: 'heureDebut',
      key: 'heureDebut'
    },
    {
      title: 'Heure Fin',
      dataIndex: 'heureFin',
      key: 'heureFin'
    },
    {
      title: 'Jours',
      dataIndex: 'jours',
      key: 'jours',
      render: (jours) => (
        <Space wrap>
          {jours?.map(jour => (
            <Tag key={jour} color="blue">
              {jour.charAt(0).toUpperCase() + jour.slice(1)}
            </Tag>
          ))}
        </Space>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'standard' ? 'green' : type === 'teletravail' ? 'blue' : 'orange'}>
          {type}
        </Tag>
      )
    },
    {
      title: 'Statut',
      dataIndex: 'actif',
      key: 'actif',
      render: (actif) => (
        <Badge 
          status={actif ? 'success' : 'default'} 
          text={actif ? 'Actif' : 'Inactif'} 
        />
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Modifier">
            <Button 
              type="link" 
              icon={<EditOutlined />}
              onClick={() => handleEditPlage(record)}
            />
          </Tooltip>
          <Tooltip title="Supprimer">
            <Popconfirm
              title="Êtes-vous sûr de vouloir supprimer cette plage horaire ?"
              onConfirm={() => handleDeletePlage(record)}
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
        </Space>
      )
    }
  ];

  // Colonnes pour le tableau des jours fériés
  const columnsFeries = [
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => moment(date).format('DD/MM/YYYY')
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'ferie' ? 'red' : 'orange'}>
          {type === 'ferie' ? 'Férié' : 'Fermeture'}
        </Tag>
      )
    },
    {
      title: 'Récurrence',
      dataIndex: 'recurrence',
      key: 'recurrence',
      render: (recurrence) => (
        <Tag color={recurrence === 'annuelle' ? 'green' : 'blue'}>
          {recurrence}
        </Tag>
      )
    },
    {
      title: 'Payé',
      dataIndex: 'paye',
      key: 'paye',
      render: (paye) => (
        <Tag color={paye ? 'green' : 'red'}>
          {paye ? 'Oui' : 'Non'}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Modifier">
            <Button 
              type="link" 
              icon={<EditOutlined />}
              onClick={() => handleEditFerie(record)}
            />
          </Tooltip>
          <Tooltip title="Supprimer">
            <Popconfirm
              title="Êtes-vous sûr de vouloir supprimer ce jour férié ?"
              onConfirm={() => handleDeleteFerie(record)}
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
        </Space>
      )
    }
  ];

  return (
    <div className="container-fluid">
      {/* En-tête */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <SettingOutlined className="me-2" />
                Configuration de la Présence
              </h2>
              <p className="text-muted">
                Paramètres des horaires, seuils, notifications et jours fériés
              </p>
            </div>
            <Space>
              <Button 
                icon={<ReloadOutlined />}
                onClick={resetConfiguration}
              >
                Réinitialiser
              </Button>
              <Button 
                type="primary" 
                icon={<SaveOutlined />}
                loading={loading}
                onClick={saveConfiguration}
              >
                Sauvegarder
              </Button>
            </Space>
          </div>
        </div>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        {/* Onglet 1: Horaires de travail */}
        <TabPane 
          tab={
            <span>
              <ClockCircleOutlined />
              Horaires de Travail
            </span>
          } 
          key="horaires"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Horaires par Défaut" loading={loading}>
                <Form layout="vertical">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Heure de début">
                        <TimePicker 
                          value={moment(configuration.horaires.heureDebut, 'HH:mm')}
                          format="HH:mm"
                          style={{ width: '100%' }}
                          onChange={(time) => setConfiguration(prev => ({
                            ...prev,
                            horaires: {
                              ...prev.horaires,
                              heureDebut: time ? time.format('HH:mm') : '09:00'
                            }
                          }))}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Heure de fin">
                        <TimePicker 
                          value={moment(configuration.horaires.heureFin, 'HH:mm')}
                          format="HH:mm"
                          style={{ width: '100%' }}
                          onChange={(time) => setConfiguration(prev => ({
                            ...prev,
                            horaires: {
                              ...prev.horaires,
                              heureFin: time ? time.format('HH:mm') : '17:00'
                            }
                          }))}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item label="Pause déjeuner (minutes)">
                    <InputNumber 
                      value={configuration.horaires.pauseDejeuner}
                      min={0}
                      max={180}
                      style={{ width: '100%' }}
                      onChange={(value) => setConfiguration(prev => ({
                        ...prev,
                        horaires: {
                          ...prev.horaires,
                          pauseDejeuner: value || 60
                        }
                      }))}
                    />
                  </Form.Item>

                  <Form.Item label="Durée journée (heures)">
                    <InputNumber 
                      value={configuration.horaires.dureeJournee}
                      min={1}
                      max={12}
                      style={{ width: '100%' }}
                      onChange={(value) => setConfiguration(prev => ({
                        ...prev,
                        horaires: {
                          ...prev.horaires,
                          dureeJournee: value || 7
                        }
                      }))}
                    />
                  </Form.Item>

                  <Form.Item label="Tolérance arrivée (minutes)">
                    <InputNumber 
                      value={configuration.horaires.toleranceArrivee}
                      min={0}
                      max={60}
                      style={{ width: '100%' }}
                      onChange={(value) => setConfiguration(prev => ({
                        ...prev,
                        horaires: {
                          ...prev.horaires,
                          toleranceArrivee: value || 5
                        }
                      }))}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Switch 
                      checked={configuration.horaires.travailWeekend}
                      onChange={(checked) => setConfiguration(prev => ({
                        ...prev,
                        horaires: {
                          ...prev.horaires,
                          travailWeekend: checked
                        }
                      }))}
                    />
                    <span className="ms-2">Travail le weekend autorisé</span>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            <Col span={12}>
              <Card 
                title="Plages Horaires"
                extra={
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    size="small"
                    onClick={handleAddPlage}
                  >
                    Ajouter
                  </Button>
                }
              >
                <Table
                  columns={columnsPlages}
                  dataSource={plagesHoraires}
                  rowKey="id"
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        {/* Onglet 2: Seuils de retard */}
        <TabPane 
          tab={
            <span>
              <ExclamationCircleOutlined />
              Seuils de Retard
            </span>
          } 
          key="seuils"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Configuration des Seuils" loading={loading}>
                <Form layout="vertical">
                  <Alert
                    message="Seuils de retard"
                    description="Définissez les seuils qui déclencheront les alertes et notifications."
                    type="info"
                    showIcon
                    className="mb-3"
                  />

                  <Form.Item label="Seuil d'alerte retard (minutes)">
                    <InputNumber 
                      value={configuration.seuils.seuilAlerteRetard}
                      min={1}
                      max={120}
                      style={{ width: '100%' }}
                      onChange={(value) => setConfiguration(prev => ({
                        ...prev,
                        seuils: {
                          ...prev.seuils,
                          seuilAlerteRetard: value || 15
                        }
                      }))}
                    />
                  </Form.Item>

                  <Form.Item label="Seuil d'avertissement retard (minutes)">
                    <InputNumber 
                      value={configuration.seuils.seuilAvertissementRetard}
                      min={1}
                      max={240}
                      style={{ width: '100%' }}
                      onChange={(value) => setConfiguration(prev => ({
                        ...prev,
                        seuils: {
                          ...prev.seuils,
                          seuilAvertissementRetard: value || 30
                        }
                      }))}
                    />
                  </Form.Item>

                  <Form.Item label="Seuil critique retard (minutes)">
                    <InputNumber 
                      value={configuration.seuils.seuilCritiqueRetard}
                      min={1}
                      max={480}
                      style={{ width: '100%' }}
                      onChange={(value) => setConfiguration(prev => ({
                        ...prev,
                        seuils: {
                          ...prev.seuils,
                          seuilCritiqueRetard: value || 60
                        }
                      }))}
                    />
                  </Form.Item>

                  <Form.Item label="Nombre de retards pour alerte">
                    <InputNumber 
                      value={configuration.seuils.nombreRetardsAlerte}
                      min={1}
                      max={20}
                      style={{ width: '100%' }}
                      onChange={(value) => setConfiguration(prev => ({
                        ...prev,
                        seuils: {
                          ...prev.seuils,
                          nombreRetardsAlerte: value || 3
                        }
                      }))}
                    />
                  </Form.Item>

                  <Form.Item label="Période de calcul des retards (jours)">
                    <InputNumber 
                      value={configuration.seuils.periodeCalculRetards}
                      min={7}
                      max={90}
                      style={{ width: '100%' }}
                      onChange={(value) => setConfiguration(prev => ({
                        ...prev,
                        seuils: {
                          ...prev.seuils,
                          periodeCalculRetards: value || 30
                        }
                      }))}
                    />
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            <Col span={12}>
              <Card title="Aperçu des Seuils">
                <List>
                  <List.Item>
                    <Badge color="green" text="Retard ≤ 15 minutes" />
                    <Tag color="green">Normal</Tag>
                  </List.Item>
                  <List.Item>
                    <Badge color="orange" text="Retard 15-30 minutes" />
                    <Tag color="orange">Alerte</Tag>
                  </List.Item>
                  <List.Item>
                    <Badge color="red" text="Retard 30-60 minutes" />
                    <Tag color="red">Avertissement</Tag>
                  </List.Item>
                  <List.Item>
                    <Badge color="red" text="Retard > 60 minutes" />
                    <Tag color="red">Critique</Tag>
                  </List.Item>
                </List>

                <Divider />

                <Alert
                  message="Recommandations"
                  description={
                    <div>
                      <div>• 3 retards dans les 30 jours = Entretien</div>
                      <div>• Retard critique = Notification immédiate</div>
                      <div>• Suivi mensuel des tendances</div>
                    </div>
                  }
                  type="warning"
                  showIcon
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        {/* Onglet 3: Jours fériés et fermetures */}
        <TabPane 
          tab={
            <span>
              <CalendarOutlined />
              Jours Fériés
            </span>
          } 
          key="feries"
        >
          <Row gutter={16}>
            <Col span={16}>
              <Card 
                title="Gestion des Jours Fériés et Fermetures"
                extra={
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={handleAddFerie}
                  >
                    Ajouter
                  </Button>
                }
                loading={loading}
              >
                <Table
                  columns={columnsFeries}
                  dataSource={joursFeries}
                  rowKey="id"
                  pagination={false}
                />
              </Card>
            </Col>

            <Col span={8}>
              <Card title="Import/Export">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Upload>
                    <Button icon={<UploadOutlined />} style={{ width: '100%' }}>
                      Importer calendrier
                    </Button>
                  </Upload>
                  
                  <Button icon={<DownloadOutlined />} style={{ width: '100%' }}>
                    Exporter calendrier
                  </Button>

                  <Button style={{ width: '100%' }}>
                    Synchroniser calendrier national
                  </Button>
                </Space>

                <Divider />

                <Alert
                  message="Prochains jours fériés"
                  description={
                    <List
                      size="small"
                      dataSource={joursFeries
                        .filter(j => moment(j.date).isAfter(moment()))
                        .sort((a, b) => moment(a.date).diff(moment(b.date)))
                        .slice(0, 3)
                      }
                      renderItem={jour => (
                        <List.Item>
                          <div>
                            <div>{jour.nom}</div>
                            <div className="text-muted">
                              {moment(jour.date).format('DD/MM/YYYY')}
                            </div>
                          </div>
                        </List.Item>
                      )}
                    />
                  }
                  type="info"
                  showIcon
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        {/* Onglet 4: Configuration des notifications */}
        <TabPane 
          tab={
            <span>
              <BellOutlined />
              Notifications
            </span>
          } 
          key="notifications"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Paramètres des Notifications" loading={loading}>
                <Form layout="vertical">
                  <Form.Item>
                    <Switch 
                      checked={configuration.notifications.notificationRetardAuto}
                      onChange={(checked) => setConfiguration(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          notificationRetardAuto: checked
                        }
                      }))}
                    />
                    <span className="ms-2">Notification automatique des retards</span>
                  </Form.Item>

                  <Form.Item>
                    <Switch 
                      checked={configuration.notifications.notificationAbsenceAuto}
                      onChange={(checked) => setConfiguration(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          notificationAbsenceAuto: checked
                        }
                      }))}
                    />
                    <span className="ms-2">Notification automatique des absences</span>
                  </Form.Item>

                  <Form.Item>
                    <Switch 
                      checked={configuration.notifications.rappelJustificatif}
                      onChange={(checked) => setConfiguration(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          rappelJustificatif: checked
                        }
                      }))}
                    />
                    <span className="ms-2">Rappel automatique justificatif</span>
                  </Form.Item>

                  <Form.Item label="Délai rappel justificatif (heures)">
                    <InputNumber 
                      value={configuration.notifications.delaiRappelJustificatif}
                      min={1}
                      max={168}
                      style={{ width: '100%' }}
                      onChange={(value) => setConfiguration(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          delaiRappelJustificatif: value || 24
                        }
                      }))}
                    />
                  </Form.Item>

                  <Form.Item label="Canal de notification">
                    <Select 
                      value={configuration.notifications.canalNotification}
                      style={{ width: '100%' }}
                      onChange={(value) => setConfiguration(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          canalNotification: value
                        }
                      }))}
                    >
                      <Option value="email">Email uniquement</Option>
                      <Option value="sms">SMS uniquement</Option>
                      <Option value="both">Email et SMS</Option>
                    </Select>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            <Col span={12}>
              <Card title="Modèles de Messages">
                <Form layout="vertical">
                  <Form.Item label="Modèle notification retard">
                    <TextArea
                      value={configuration.notifications.templateRetard}
                      rows={4}
                      onChange={(e) => setConfiguration(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          templateRetard: e.target.value
                        }
                      }))}
                    />
                  </Form.Item>

                  <Form.Item label="Modèle notification absence">
                    <TextArea
                      value={configuration.notifications.templateAbsence}
                      rows={4}
                      onChange={(e) => setConfiguration(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          templateAbsence: e.target.value
                        }
                      }))}
                    />
                  </Form.Item>

                  <Alert
                    message="Variables disponibles"
                    description={
                      <div>
                        <code>{'{employe}'}</code> - Nom de l'employé<br/>
                        <code>{'{date}'}</code> - Date du retard/absence<br/>
                        <code>{'{heure}'}</code> - Heure d'arrivée<br/>
                        <code>{'{retard}'}</code> - Durée du retard
                      </div>
                    }
                    type="info"
                    showIcon
                  />
                </Form>
              </Card>
            </Col>
          </Row>
        </TabPane>

        {/* Onglet 5: Paramètres généraux */}
        <TabPane 
          tab={
            <span>
              <SettingOutlined />
              Paramètres Généraux
            </span>
          } 
          key="parametres"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Paramètres Système" loading={loading}>
                <Form layout="vertical">
                  <Form.Item label="Mode de pointage">
                    <Select 
                      value={configuration.parametres.modePointage}
                      style={{ width: '100%' }}
                      onChange={(value) => setConfiguration(prev => ({
                        ...prev,
                        parametres: {
                          ...prev.parametres,
                          modePointage: value
                        }
                      }))}
                    >
                      <Option value="manuel">Manuel</Option>
                      <Option value="badge">Badge</Option>
                      <Option value="biometrique">Biométrique</Option>
                      <Option value="mobile">Application mobile</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <Switch 
                      checked={configuration.parametres.validationSuperviseur}
                      onChange={(checked) => setConfiguration(prev => ({
                        ...prev,
                        parametres: {
                          ...prev.parametres,
                          validationSuperviseur: checked
                        }
                      }))}
                    />
                    <span className="ms-2">Validation par le superviseur requise</span>
                  </Form.Item>

                  <Form.Item>
                    <Switch 
                      checked={configuration.parametres.calculHeuresAuto}
                      onChange={(checked) => setConfiguration(prev => ({
                        ...prev,
                        parametres: {
                          ...prev.parametres,
                          calculHeuresAuto: checked
                        }
                      }))}
                    />
                    <span className="ms-2">Calcul automatique des heures</span>
                  </Form.Item>

                  <Form.Item label="Arrondi des heures (minutes)">
                    <Select 
                      value={configuration.parametres.roundHeures}
                      style={{ width: '100%' }}
                      onChange={(value) => setConfiguration(prev => ({
                        ...prev,
                        parametres: {
                          ...prev.parametres,
                          roundHeures: value
                        }
                      }))}
                    >
                      <Option value={1}>1 minute</Option>
                      <Option value={5}>5 minutes</Option>
                      <Option value={15}>15 minutes</Option>
                      <Option value={30}>30 minutes</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Fuseau horaire">
                    <Select 
                      value={configuration.parametres.fuseauHoraire}
                      style={{ width: '100%' }}
                      onChange={(value) => setConfiguration(prev => ({
                        ...prev,
                        parametres: {
                          ...prev.parametres,
                          fuseauHoraire: value
                        }
                      }))}
                    >
                      <Option value="Europe/Paris">Europe/Paris</Option>
                      <Option value="UTC">UTC</Option>
                      <Option value="Europe/London">Europe/London</Option>
                      <Option value="America/New_York">America/New_York</Option>
                    </Select>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            <Col span={12}>
              <Card title="Sauvegarde et Maintenance">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button 
                    type="primary" 
                    icon={<SaveOutlined />}
                    style={{ width: '100%' }}
                    onClick={saveConfiguration}
                    loading={loading}
                  >
                    Sauvegarder la configuration
                  </Button>

                  <Button 
                    icon={<DownloadOutlined />}
                    style={{ width: '100%' }}
                  >
                    Exporter la configuration
                  </Button>

                  <Button 
                    icon={<UploadOutlined />}
                    style={{ width: '100%' }}
                  >
                    Importer la configuration
                  </Button>

                  <Popconfirm
                    title="Réinitialiser la configuration"
                    description="Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?"
                    onConfirm={resetConfiguration}
                    okText="Oui"
                    cancelText="Non"
                  >
                    <Button 
                      danger
                      icon={<ReloadOutlined />}
                      style={{ width: '100%' }}
                    >
                      Réinitialiser aux valeurs par défaut
                    </Button>
                  </Popconfirm>
                </Space>

                <Divider />

                <Alert
                  message="Statut du système"
                  description="Tous les services fonctionnent normalement"
                  type="success"
                  showIcon
                />

                <List
                  size="small"
                  className="mt-3"
                  dataSource={[
                    'Dernière sauvegarde: Aujourd\'hui 14:30',
                    'Prochaine maintenance: 15/12/2024',
                    'Version: 2.1.0'
                  ]}
                  renderItem={item => <List.Item>{item}</List.Item>}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* Modal pour les plages horaires */}
      <Modal
        title={
          <span>
            {selectedPlage ? <EditOutlined /> : <PlusOutlined />}
            {selectedPlage ? ' Modifier la plage horaire' : ' Nouvelle plage horaire'}
          </span>
        }
        open={isModalVisible}
        onOk={handleSavePlage}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setSelectedPlage(null);
        }}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="nom"
            label="Nom de la plage"
            rules={[{ required: true, message: 'Nom requis' }]}
          >
            <Input placeholder="Ex: Standard, Télétravail, Été..." />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="heureDebut"
                label="Heure de début"
                rules={[{ required: true, message: 'Heure requise' }]}
              >
                <TimePicker 
                  format="HH:mm"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="heureFin"
                label="Heure de fin"
                rules={[{ required: true, message: 'Heure requise' }]}
              >
                <TimePicker 
                  format="HH:mm"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="jours"
            label="Jours d'application"
            rules={[{ required: true, message: 'Jours requis' }]}
          >
            <Select mode="multiple" placeholder="Sélectionnez les jours">
              <Option value="lundi">Lundi</Option>
              <Option value="mardi">Mardi</Option>
              <Option value="mercredi">Mercredi</Option>
              <Option value="jeudi">Jeudi</Option>
              <Option value="vendredi">Vendredi</Option>
              <Option value="samedi">Samedi</Option>
              <Option value="dimanche">Dimanche</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="type"
            label="Type de plage"
            rules={[{ required: true, message: 'Type requis' }]}
          >
            <Select>
              <Option value="standard">Standard</Option>
              <Option value="teletravail">Télétravail</Option>
              <Option value="saisonnier">Saisonnier</Option>
              <Option value="projet">Projet spécifique</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="actif"
            label="Statut"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal pour les jours fériés */}
      <Modal
        title={
          <span>
            {selectedFerie ? <EditOutlined /> : <PlusOutlined />}
            {selectedFerie ? ' Modifier le jour férié' : ' Nouveau jour férié'}
          </span>
        }
        open={isFerieModalVisible}
        onOk={handleSaveFerie}
        onCancel={() => {
          setIsFerieModalVisible(false);
          ferieForm.resetFields();
          setSelectedFerie(null);
        }}
        width={500}
      >
        <Form
          form={ferieForm}
          layout="vertical"
        >
          <Form.Item
            name="nom"
            label="Nom"
            rules={[{ required: true, message: 'Nom requis' }]}
          >
            <Input placeholder="Ex: Jour de l'an, Fête du travail..." />
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Date requise' }]}
          >
            <DatePicker 
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
            />
          </Form.Item>

          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Type requis' }]}
          >
            <Select>
              <Option value="ferie">Jour férié</Option>
              <Option value="fermeture">Fermeture exceptionnelle</Option>
              <Option value="reduction">Journée réduite</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="recurrence"
            label="Récurrence"
            rules={[{ required: true, message: 'Récurrence requise' }]}
          >
            <Select>
              <Option value="annuelle">Annuelle</Option>
              <Option value="ponctuelle">Ponctuelle</Option>
              <Option value="exceptionnelle">Exceptionnelle</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="paye"
            label="Jour payé"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ConfigurationPresence;