// src/pages/RH/Competences/PlanningFormations.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/fr';
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Tag,
  List,
  Statistic,
  Space,
  Tooltip,
  Badge,
  Alert,
  Tabs,
  Popconfirm,
  message,
  Progress,
  Timeline
} from 'antd';
import {
  PlusOutlined,
  CalendarOutlined,
  TeamOutlined,
  BookOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  BarChartOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const localizer = momentLocalizer(moment);

moment.locale('fr');

const PlanningFormations = () => {
  const [loading, setLoading] = useState(false);
  const [formations, setFormations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());
  const [form] = Form.useForm();

  // Données mockées
  useEffect(() => {
    const mockEmployees = [
      { id: 1, nom: 'Dupont Jean', departement: 'IT', poste: 'Développeur Senior' },
      { id: 2, nom: 'Martin Marie', departement: 'IT', poste: 'Développeuse Frontend' },
      { id: 3, nom: 'Bernard Pierre', departement: 'Finance', poste: 'Analyste Financier' },
      { id: 4, nom: 'Sophie Laurent', departement: 'IT', poste: 'Directrice IT' },
      { id: 5, nom: 'Thomas Legrand', departement: 'RH', poste: 'Assistant RH' }
    ];

    const mockFormations = [
      {
        id: 1,
        title: 'Spring Boot Avancé - Dupont Jean',
        start: new Date(2024, 5, 15, 9, 0),
        end: new Date(2024, 5, 17, 17, 0),
        employeeId: 1,
        nom: 'Spring Boot Avancé',
        organisme: 'OpenClassrooms',
        type: 'presentiel',
        statut: 'planifie',
        lieu: 'Salle de formation A',
        formateur: 'Michel Expert',
        participants: [1],
        competencesVisees: ['Spring Boot', 'Microservices', 'Spring Security'],
        cout: 1200,
        notes: 'Formation intensive sur Spring Boot'
      },
      {
        id: 2,
        title: 'React Avancé - Martin Marie',
        start: new Date(2024, 5, 20, 9, 0),
        end: new Date(2024, 5, 22, 17, 0),
        employeeId: 2,
        nom: 'React Avancé avec TypeScript',
        organisme: 'Udemy',
        type: 'en_ligne',
        statut: 'planifie',
        lieu: 'En ligne',
        formateur: 'Sarah Dev',
        participants: [2],
        competencesVisees: ['React', 'TypeScript', 'Hooks Avancés'],
        cout: 89,
        notes: 'Formation en ligne asynchrone'
      },
      {
        id: 3,
        title: 'Leadership - Sophie Laurent',
        start: new Date(2024, 6, 1, 9, 0),
        end: new Date(2024, 6, 5, 17, 0),
        employeeId: 4,
        nom: 'Leadership et Management',
        organisme: 'Harvard Business School',
        type: 'presentiel',
        statut: 'planifie',
        lieu: 'Paris',
        formateur: 'Dr. James Wilson',
        participants: [4],
        competencesVisees: ['Leadership', 'Management', 'Communication'],
        cout: 3500,
        notes: 'Formation executive'
      },
      {
        id: 4,
        title: 'Excel Avancé - Équipe Finance',
        start: new Date(2024, 5, 25, 9, 0),
        end: new Date(2024, 5, 25, 17, 0),
        employeeId: 3,
        nom: 'Excel Avancé pour Finance',
        organisme: 'Microsoft',
        type: 'presentiel',
        statut: 'planifie',
        lieu: 'Salle B',
        formateur: 'Pierre Compta',
        participants: [3, 5],
        competencesVisees: ['Excel', 'Formules Avancées', 'Tableaux Croisés'],
        cout: 450,
        notes: 'Formation collective'
      },
      {
        id: 5,
        title: 'Formation Sécurité - Tous IT',
        start: new Date(2024, 6, 10, 9, 0),
        end: new Date(2024, 6, 10, 12, 0),
        employeeId: 1,
        nom: 'Sécurité Informatique',
        organisme: 'ANSSI',
        type: 'presentiel',
        statut: 'planifie',
        lieu: 'Amphithéâtre',
        formateur: 'Agent Security',
        participants: [1, 2, 4],
        competencesVisees: ['Cybersécurité', 'Bonnes Pratiques'],
        cout: 0,
        notes: 'Formation obligatoire'
      }
    ];

    setEmployees(mockEmployees);
    setFormations(mockFormations);
  }, []);

  // Style des événements dans le calendrier
  const eventStyleGetter = (event) => {
    let backgroundColor = '#3174ad';
    let borderColor = '#3174ad';

    switch (event.statut) {
      case 'termine':
        backgroundColor = '#52c41a';
        borderColor = '#52c41a';
        break;
      case 'en_cours':
        backgroundColor = '#faad14';
        borderColor = '#faad14';
        break;
      case 'planifie':
        backgroundColor = '#1890ff';
        borderColor = '#1890ff';
        break;
      case 'annule':
        backgroundColor = '#f5222d';
        borderColor = '#f5222d';
        break;
      default:
        break;
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        fontSize: '12px',
        padding: '2px 5px'
      }
    };
  };

  // Gestion des formations
  const handleAddFormation = () => {
    setSelectedFormation(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditFormation = (formation) => {
    setSelectedFormation(formation);
    form.setFieldsValue({
      ...formation,
      dateRange: [moment(formation.start), moment(formation.end)],
      participants: formation.participants
    });
    setIsModalVisible(true);
  };

  const handleDeleteFormation = (formation) => {
    setFormations(prev => prev.filter(f => f.id !== formation.id));
    message.success('Formation supprimée du planning');
  };

  const handleSaveFormation = () => {
    form.validateFields().then(values => {
      const formationData = {
        ...values,
        start: values.dateRange[0].toDate(),
        end: values.dateRange[1].toDate(),
        title: `${values.nom} - ${employees.find(e => e.id === values.employeeId)?.nom}`,
        participants: values.participants || [values.employeeId]
      };

      if (selectedFormation) {
        // Modification
        setFormations(prev => prev.map(f =>
          f.id === selectedFormation.id ? { ...selectedFormation, ...formationData } : f
        ));
        message.success('Formation modifiée avec succès');
      } else {
        // Ajout
        const newFormation = {
          id: Date.now(),
          ...formationData
        };
        setFormations(prev => [...prev, newFormation]);
        message.success('Formation ajoutée au planning');
      }
      setIsModalVisible(false);
      form.resetFields();
      setSelectedFormation(null);
    });
  };

  // Gestion de la sélection dans le calendrier
  const handleSelectSlot = ({ start, end }) => {
    setSelectedFormation(null);
    form.resetFields();
    form.setFieldsValue({
      dateRange: [moment(start), moment(end)]
    });
    setIsModalVisible(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedFormation(event);
    form.setFieldsValue({
      ...event,
      dateRange: [moment(event.start), moment(event.end)],
      participants: event.participants
    });
    setIsModalVisible(true);
  };

  // Statistiques
  const stats = {
    totalFormations: formations.length,
    formationsPlanifiees: formations.filter(f => f.statut === 'planifie').length,
    formationsEnCours: formations.filter(f => f.statut === 'en_cours').length,
    formationsTerminees: formations.filter(f => f.statut === 'termine').length,
    coutTotal: formations.reduce((sum, f) => sum + f.cout, 0),
    employesImpliques: [...new Set(formations.flatMap(f => f.participants))].length
  };

  // Formations à venir (prochaines 2 semaines)
  const formationsProchaines = formations
    .filter(f => moment(f.start).isAfter(moment()) && moment(f.start).isBefore(moment().add(2, 'weeks')))
    .sort((a, b) => moment(a.start).diff(moment(b.start)));

  // Composant personnalisé pour l'événement
  const CustomEvent = ({ event }) => {
    const employee = employees.find(emp => emp.id === event.employeeId);
    
    return (
      <Tooltip
        title={
          <div>
            <div><strong>{event.nom}</strong></div>
            <div>Participant: {employee?.nom}</div>
            <div>Lieu: {event.lieu}</div>
            <div>Formateur: {event.formateur}</div>
          </div>
        }
      >
        <div className="rbc-event-content">
          <div><strong>{event.nom}</strong></div>
          <div>{employee?.nom.split(' ')[0]}</div>
          <div>{event.lieu}</div>
        </div>
      </Tooltip>
    );
  };

  return (
    <div className="container-fluid">
      {/* En-tête */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <CalendarOutlined className="me-2" />
                Planning des Formations
              </h2>
              <p className="text-muted">
                Organisation et suivi du plan de formation des collaborateurs
              </p>
            </div>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={handleAddFormation}
            >
              Nouvelle Formation
            </Button>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <Row gutter={16} className="mb-4">
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="Total Formations"
              value={stats.totalFormations}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="Planifiées"
              value={stats.formationsPlanifiees}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="En Cours"
              value={stats.formationsEnCours}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="Terminées"
              value={stats.formationsTerminees}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="Employés Formés"
              value={stats.employesImpliques}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="Budget Total"
              value={stats.coutTotal}
              suffix="€"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="calendrier">
        {/* Onglet 1: Calendrier */}
        <TabPane 
          tab={
            <span>
              <CalendarOutlined />
              Calendrier
            </span>
          } 
          key="calendrier"
        >
          <Row gutter={16}>
            <Col span={17}>
              <Card>
                <Calendar
                  localizer={localizer}
                  events={formations}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 600 }}
                  onSelectEvent={handleSelectEvent}
                  onSelectSlot={handleSelectSlot}
                  onView={setView}
                  onNavigate={setDate}
                  view={view}
                  date={date}
                  selectable
                  eventPropGetter={eventStyleGetter}
                  components={{
                    event: CustomEvent
                  }}
                  messages={{
                    next: "Suivant",
                    previous: "Précédent",
                    today: "Aujourd'hui",
                    month: "Mois",
                    week: "Semaine",
                    day: "Jour",
                    agenda: "Agenda",
                    date: "Date",
                    time: "Heure",
                    event: "Événement",
                    noEventsInRange: "Aucune formation planifiée dans cette période"
                  }}
                />
              </Card>
            </Col>

            <Col span={7}>
              {/* Légende */}
              <Card title="Légende" className="mb-4" size="small">
                <List size="small">
                  <List.Item>
                    <Badge color="#1890ff" text="Planifiée" />
                  </List.Item>
                  <List.Item>
                    <Badge color="#faad14" text="En cours" />
                  </List.Item>
                  <List.Item>
                    <Badge color="#52c41a" text="Terminée" />
                  </List.Item>
                  <List.Item>
                    <Badge color="#f5222d" text="Annulée" />
                  </List.Item>
                </List>
              </Card>

              {/* Formations à venir */}
              <Card 
                title={
                  <span>
                    <ClockCircleOutlined className="me-2" />
                    Prochaines Formations
                  </span>
                }
                className="mb-4"
              >
                {formationsProchaines.length > 0 ? (
                  <Timeline>
                    {formationsProchaines.map(formation => {
                      const employee = employees.find(emp => emp.id === formation.employeeId);
                      return (
                        <Timeline.Item
                          key={formation.id}
                          dot={<CalendarOutlined style={{ fontSize: '12px' }} />}
                          color="blue"
                        >
                          <div className="d-flex justify-content-between">
                            <div>
                              <div><strong>{formation.nom}</strong></div>
                              <div style={{ fontSize: '12px' }}>
                                {employee?.nom} • {formation.lieu}
                              </div>
                            </div>
                            <div style={{ fontSize: '12px', color: '#999' }}>
                              {moment(formation.start).format('DD/MM')}
                            </div>
                          </div>
                        </Timeline.Item>
                      );
                    })}
                  </Timeline>
                ) : (
                  <div className="text-center text-muted py-3">
                    <CalendarOutlined style={{ fontSize: '24px', marginBottom: '8px' }} />
                    <div>Aucune formation à venir</div>
                  </div>
                )}
              </Card>

              {/* Alertes */}
              <Card title="Alertes" size="small">
                <List
                  size="small"
                  dataSource={[
                    '2 formations débutent la semaine prochaine',
                    'Budget formation utilisé à 65%',
                    '3 employés sans formation cette année'
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <Alert
                        message={item}
                        type="warning"
                        showIcon
                        size="small"
                        style={{ width: '100%' }}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        {/* Onglet 2: Liste des formations */}
        <TabPane 
          tab={
            <span>
              <BookOutlined />
              Liste des Formations
            </span>
          } 
          key="liste"
        >
          <Card>
            <List
              dataSource={formations.sort((a, b) => moment(b.start).diff(moment(a.start)))}
              renderItem={formation => {
                const employee = employees.find(emp => emp.id === formation.employeeId);
                const participants = formation.participants.map(id => 
                  employees.find(emp => emp.id === id)?.nom
                ).filter(Boolean);

                return (
                  <List.Item
                    actions={[
                      <Tooltip title="Voir les détails">
                        <Button 
                          type="link" 
                          icon={<EyeOutlined />}
                          onClick={() => handleEditFormation(formation)}
                        />
                      </Tooltip>,
                      <Tooltip title="Modifier">
                        <Button 
                          type="link" 
                          icon={<EditOutlined />}
                          onClick={() => handleEditFormation(formation)}
                        />
                      </Tooltip>,
                      <Tooltip title="Supprimer">
                        <Popconfirm
                          title="Supprimer cette formation ?"
                          onConfirm={() => handleDeleteFormation(formation)}
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
                          status={
                            formation.statut === 'termine' ? 'success' :
                            formation.statut === 'en_cours' ? 'processing' :
                            formation.statut === 'planifie' ? 'default' : 'error'
                          } 
                        />
                      }
                      title={formation.nom}
                      description={
                        <div>
                          <div>
                            <strong>Organisme:</strong> {formation.organisme} • 
                            <strong> Formateur:</strong> {formation.formateur}
                          </div>
                          <div>
                            <strong>Dates:</strong> {moment(formation.start).format('DD/MM/YYYY')} - {moment(formation.end).format('DD/MM/YYYY')} • 
                            <strong> Lieu:</strong> {formation.lieu}
                          </div>
                          <div>
                            <strong>Participants:</strong> 
                            <Space wrap className="ms-2">
                              {participants.map((participant, index) => (
                                <Tag key={index} size="small">{participant}</Tag>
                              ))}
                            </Space>
                          </div>
                          <div>
                            <strong>Compétences visées:</strong>
                            <Space wrap className="ms-2">
                              {formation.competencesVisees.map((competence, index) => (
                                <Tag key={index} color="blue" size="small">{competence}</Tag>
                              ))}
                            </Space>
                          </div>
                          <div>
                            <strong>Coût:</strong> {formation.cout}€ • 
                            <strong> Statut:</strong> 
                            <Tag 
                              color={
                                formation.statut === 'termine' ? 'green' :
                                formation.statut === 'en_cours' ? 'orange' :
                                formation.statut === 'planifie' ? 'blue' : 'red'
                              }
                              className="ms-2"
                            >
                              {formation.statut}
                            </Tag>
                          </div>
                          {formation.notes && (
                            <div>
                              <strong>Notes:</strong> {formation.notes}
                            </div>
                          )}
                        </div>
                      }
                    />
                  </List.Item>
                );
              }}
            />
          </Card>
        </TabPane>

        {/* Onglet 3: Analyse */}
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
              <Card title="Répartition par Type">
                <List
                  dataSource={[
                    { type: 'Présentiel', count: 3, color: 'blue' },
                    { type: 'En ligne', count: 2, color: 'green' }
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Tag color={item.color}>{item.type}</Tag>}
                        description={
                          <Progress 
                            percent={(item.count / formations.length) * 100} 
                            size="small"
                            format={() => `${item.count} formations`}
                          />
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Budget par Département">
                <List
                  dataSource={[
                    { departement: 'IT', budget: 4789, color: 'blue' },
                    { departement: 'Finance', budget: 450, color: 'green' },
                    { departement: 'RH', budget: 3500, color: 'orange' }
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Tag color={item.color}>{item.departement}</Tag>}
                        description={
                          <div>
                            <div>{item.budget}€</div>
                            <Progress 
                              percent={(item.budget / stats.coutTotal) * 100} 
                              size="small"
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

      {/* Modal pour ajouter/modifier une formation */}
      <Modal
        title={
          <span>
            {selectedFormation ? <EditOutlined /> : <PlusOutlined />}
            {selectedFormation ? ' Modifier la formation' : ' Nouvelle formation'}
          </span>
        }
        open={isModalVisible}
        onOk={handleSaveFormation}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setSelectedFormation(null);
        }}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nom"
                label="Nom de la formation"
                rules={[{ required: true, message: 'Nom requis' }]}
              >
                <Input placeholder="Ex: Spring Boot Avancé, Leadership..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="organisme"
                label="Organisme formateur"
                rules={[{ required: true, message: 'Organisme requis' }]}
              >
                <Input placeholder="Ex: OpenClassrooms, Harvard..." />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="dateRange"
            label="Période de formation"
            rules={[{ required: true, message: 'Période requise' }]}
          >
            <RangePicker
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
              showTime={{
                format: 'HH:mm',
                defaultValue: [moment('09:00', 'HH:mm'), moment('17:00', 'HH:mm')]
              }}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="employeeId"
                label="Employé principal"
                rules={[{ required: true, message: 'Employé requis' }]}
              >
                <Select placeholder="Sélectionnez un employé">
                  {employees.map(employee => (
                    <Option key={employee.id} value={employee.id}>
                      {employee.nom} - {employee.departement}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="participants"
                label="Participants additionnels"
              >
                <Select mode="multiple" placeholder="Sélectionnez les participants">
                  {employees.map(employee => (
                    <Option key={employee.id} value={employee.id}>
                      {employee.nom} - {employee.departement}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="type"
                label="Type de formation"
                rules={[{ required: true, message: 'Type requis' }]}
              >
                <Select>
                  <Option value="presentiel">Présentiel</Option>
                  <Option value="en_ligne">En ligne</Option>
                  <Option value="hybride">Hybride</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="statut"
                label="Statut"
                rules={[{ required: true, message: 'Statut requis' }]}
              >
                <Select>
                  <Option value="planifie">Planifié</Option>
                  <Option value="en_cours">En cours</Option>
                  <Option value="termine">Terminé</Option>
                  <Option value="annule">Annulé</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="cout"
                label="Coût (€)"
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="lieu"
                label="Lieu"
              >
                <Input placeholder="Salle, adresse..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="formateur"
                label="Formateur"
              >
                <Input placeholder="Nom du formateur..." />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="competencesVisees"
            label="Compétences visées"
          >
            <Select mode="tags" placeholder="Ajoutez les compétences visées">
              <Option value="Spring Boot">Spring Boot</Option>
              <Option value="React">React</Option>
              <Option value="TypeScript">TypeScript</Option>
              <Option value="Leadership">Leadership</Option>
              <Option value="Management">Management</Option>
              <Option value="Excel">Excel</Option>
              <Option value="Comptabilité">Comptabilité</Option>
              <Option value="Cybersécurité">Cybersécurité</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="notes"
            label="Notes"
          >
            <TextArea
              rows={3}
              placeholder="Informations complémentaires..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PlanningFormations;