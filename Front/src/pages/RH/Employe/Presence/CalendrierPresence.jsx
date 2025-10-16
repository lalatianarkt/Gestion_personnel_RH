// src/pages/Presence/CalendrierPresence.jsx
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
  TimePicker,
  Badge,
  Statistic,
  List,
  Tag,
  Tooltip,
  Alert,
  Tabs,
  Popover,
  Space,
  Divider
} from 'antd';
import {
  PlusOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const localizer = momentLocalizer(moment);

moment.locale('fr');

const CalendrierPresence = () => {
  const [events, setEvents] = useState([]);
  const [employees] = useState([
    { id: 1, nom: 'Dupont Jean', departement: 'IT', couleur: '#1890ff' },
    { id: 2, nom: 'Martin Marie', departement: 'IT', couleur: '#52c41a' },
    { id: 3, nom: 'Bernard Pierre', departement: 'Finance', couleur: '#faad14' },
    { id: 4, nom: 'Sophie Laurent', departement: 'IT', couleur: '#722ed1' },
    { id: 5, nom: 'Paul Durand', departement: 'Finance', couleur: '#fa541c' }
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());
  const [form] = Form.useForm();

  // Types d'événements avec couleurs
  const eventTypes = {
    present: { label: 'Présent', color: '#52c41a', icon: '✅' },
    absent: { label: 'Absent', color: '#f5222d', icon: '❌' },
    late: { label: 'Retard', color: '#faad14', icon: '⏰' },
    remote: { label: 'Télétravail', color: '#1890ff', icon: '🏠' },
    vacation: { label: 'Congés', color: '#722ed1', icon: '🏖️' },
    sickness: { label: 'Maladie', color: '#fa541c', icon: '🏥' },
    training: { label: 'Formation', color: '#13c2c2', icon: '📚' }
  };

  // Données mockées initiales
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        title: 'Dupont Jean - Présent',
        start: new Date(2024, 5, 15, 9, 0),
        end: new Date(2024, 5, 15, 17, 0),
        employeeId: 1,
        type: 'present',
        notes: 'Travail normal sur le projet X',
        allDay: false
      },
      {
        id: 2,
        title: 'Martin Marie - Congés',
        start: new Date(2024, 5, 16, 0, 0),
        end: new Date(2024, 5, 20, 23, 59),
        employeeId: 2,
        type: 'vacation',
        notes: 'Vacances annuelles',
        allDay: true
      },
      {
        id: 3,
        title: 'Bernard Pierre - Formation',
        start: new Date(2024, 5, 18, 9, 0),
        end: new Date(2024, 5, 18, 17, 0),
        employeeId: 3,
        type: 'training',
        notes: 'Formation sécurité',
        allDay: false
      },
      {
        id: 4,
        title: 'Sophie Laurent - Télétravail',
        start: new Date(2024, 5, 19, 8, 30),
        end: new Date(2024, 5, 19, 17, 30),
        employeeId: 4,
        type: 'remote',
        notes: 'Télétravail hebdomadaire',
        allDay: false
      },
      {
        id: 5,
        title: 'Paul Durand - Maladie',
        start: new Date(2024, 5, 20, 0, 0),
        end: new Date(2024, 5, 22, 23, 59),
        employeeId: 5,
        type: 'sickness',
        notes: 'Arrêt maladie',
        allDay: true
      }
    ];
    setEvents(mockEvents);
  }, []);

  // Style des événements dans le calendrier
  const eventStyleGetter = (event) => {
    const eventType = eventTypes[event.type];
    return {
      style: {
        backgroundColor: eventType.color,
        borderColor: eventType.color,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        fontSize: '12px',
        padding: '2px 5px'
      }
    };
  };

  // Formatage du titre de l'événement
  const formatEventTitle = (employeeId, type, allDay, start, end) => {
    const employee = employees.find(emp => emp.id === employeeId);
    const typeInfo = eventTypes[type];
    
    if (allDay) {
      return `${employee.nom} - ${typeInfo.label} ${typeInfo.icon}`;
    }
    
    return `${employee.nom} - ${typeInfo.label} ${typeInfo.icon} (${moment(start).format('HH:mm')}-${moment(end).format('HH:mm')})`;
  };

  // Gestion de la sélection d'une plage
  const handleSelectSlot = ({ start, end, allDay }) => {
    setSelectedEvent(null);
    form.resetFields();
    
    // Si c'est une sélection sur plusieurs jours, on suppose que c'est un événement allDay
    const isMultiDay = moment(end).diff(moment(start), 'days') > 1;
    
    form.setFieldsValue({
      allDay: allDay || isMultiDay,
      start: moment(start),
      end: moment(end)
    });
    
    setIsModalVisible(true);
  };

  // Gestion de la sélection d'un événement
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    form.setFieldsValue({
      employeeId: event.employeeId,
      type: event.type,
      start: moment(event.start),
      end: moment(event.end),
      allDay: event.allDay,
      notes: event.notes
    });
    setIsModalVisible(true);
  };

  // Soumission du formulaire
  const handleOk = () => {
    form.validateFields().then(values => {
      const employee = employees.find(emp => emp.id === values.employeeId);
      const eventData = {
        ...values,
        start: values.start.toDate(),
        end: values.end.toDate(),
        title: formatEventTitle(
          values.employeeId, 
          values.type, 
          values.allDay, 
          values.start, 
          values.end
        )
      };

      if (selectedEvent) {
        // Modification
        setEvents(events.map(event => 
          event.id === selectedEvent.id 
            ? { ...selectedEvent, ...eventData }
            : event
        ));
      } else {
        // Nouvel événement
        const newEvent = {
          id: Date.now(),
          ...eventData
        };
        setEvents([...events, newEvent]);
      }

      setIsModalVisible(false);
      form.resetFields();
      setSelectedEvent(null);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedEvent(null);
  };

  // Suppression d'un événement
  const handleDelete = () => {
    if (selectedEvent) {
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      setIsModalVisible(false);
      form.resetFields();
      setSelectedEvent(null);
    }
  };

  // Événements du jour pour la sidebar
  const eventsToday = events.filter(event => 
    moment(event.start).isSame(moment(), 'day')
  );

  // Statistiques du mois
  const monthlyStats = {
    present: events.filter(event => 
      moment(event.start).isSame(moment(), 'month') && event.type === 'present'
    ).length,
    absent: events.filter(event => 
      moment(event.start).isSame(moment(), 'month') && event.type === 'absent'
    ).length,
    vacation: events.filter(event => 
      moment(event.start).isSame(moment(), 'month') && event.type === 'vacation'
    ).length
  };

  // Composant personnalisé pour l'événement
  const CustomEvent = ({ event }) => {
    const employee = employees.find(emp => emp.id === event.employeeId);
    const typeInfo = eventTypes[event.type];
    
    return (
      <Popover
        content={
          <div>
            <div><strong>{employee.nom}</strong></div>
            <div>{typeInfo.label} {typeInfo.icon}</div>
            <div>
              {event.allDay ? 
                'Toute la journée' : 
                `${moment(event.start).format('HH:mm')} - ${moment(event.end).format('HH:mm')}`
              }
            </div>
            {event.notes && <div className="text-muted">{event.notes}</div>}
          </div>
        }
        title="Détails de la présence"
      >
        <div className="rbc-event-content">
          {!event.allDay && (
            <ClockCircleOutlined style={{ fontSize: '10px', marginRight: '4px' }} />
          )}
          {employee.nom.split(' ')[0]} - {typeInfo.label}
        </div>
      </Popover>
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
                Calendrier de Présence
              </h2>
              <p className="text-muted">
                Planning d'équipe et gestion des présences/absences
              </p>
            </div>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => handleSelectSlot({ 
                start: new Date(), 
                end: new Date(),
                allDay: false 
              })}
            >
              Ajouter une présence
            </Button>
          </div>
        </div>
      </div>

      <Row gutter={16}>
        {/* Colonne principale - Calendrier */}
        <Col span={17}>
          <Card>
            <Tabs
              activeKey={view}
              onChange={setView}
              items={[
                {
                  key: 'month',
                  label: 'Vue Mois',
                },
                {
                  key: 'week',
                  label: 'Vue Semaine',
                },
                {
                  key: 'day',
                  label: 'Vue Jour',
                },
                {
                  key: 'agenda',
                  label: 'Agenda',
                },
              ]}
            />
            
            <Calendar
              localizer={localizer}
              events={events}
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
                noEventsInRange: "Aucun événement dans cette période",
                showMore: total => `+${total} événement(s) supplémentaire(s)`
              }}
            />
          </Card>
        </Col>

        {/* Sidebar - Informations */}
        <Col span={7}>
          {/* Légende */}
          <Card title="Légende des statuts" className="mb-4" size="small">
            <div className="d-flex flex-column gap-2">
              {Object.entries(eventTypes).map(([key, type]) => (
                <div key={key} className="d-flex align-items-center">
                  <div 
                    style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: type.color,
                      borderRadius: '2px',
                      marginRight: '8px'
                    }}
                  />
                  <span>{type.icon} {type.label}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Statistiques du mois */}
          <Card title="Statistiques du mois" className="mb-4" size="small">
            <Row gutter={8}>
              <Col span={8}>
                <Statistic
                  title="Présences"
                  value={monthlyStats.present}
                  valueStyle={{ color: '#52c41a', fontSize: '18px' }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Absences"
                  value={monthlyStats.absent}
                  valueStyle={{ color: '#f5222d', fontSize: '18px' }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Congés"
                  value={monthlyStats.vacation}
                  valueStyle={{ color: '#722ed1', fontSize: '18px' }}
                />
              </Col>
            </Row>
          </Card>

          {/* Événements du jour */}
          <Card 
            title={
              <span>
                <TeamOutlined className="me-2" />
                Aujourd'hui
              </span>
            }
            className="mb-4"
          >
            {eventsToday.length > 0 ? (
              <List
                dataSource={eventsToday}
                renderItem={event => {
                  const employee = employees.find(emp => emp.id === event.employeeId);
                  const typeInfo = eventTypes[event.type];
                  return (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Badge 
                            color={typeInfo.color} 
                          />
                        }
                        title={
                          <div className="d-flex justify-content-between">
                            <span>{employee.nom}</span>
                            <Tag color={typeInfo.color} size="small">
                              {typeInfo.label}
                            </Tag>
                          </div>
                        }
                        description={
                          event.allDay ? 
                            'Toute la journée' : 
                            `${moment(event.start).format('HH:mm')} - ${moment(event.end).format('HH:mm')}`
                        }
                      />
                    </List.Item>
                  );
                }}
              />
            ) : (
              <div className="text-center text-muted py-3">
                <CalendarOutlined style={{ fontSize: '24px', marginBottom: '8px' }} />
                <div>Aucun événement aujourd'hui</div>
              </div>
            )}
          </Card>

          {/* Employés */}
          <Card title="Équipe" size="small">
            <List
              dataSource={employees}
              renderItem={employee => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <div 
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: employee.couleur,
                          borderRadius: '50%'
                        }}
                      />
                    }
                    title={employee.nom}
                    description={employee.departement}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Modal pour ajouter/modifier les événements */}
      <Modal
        title={
          <span>
            {selectedEvent ? <EditOutlined /> : <PlusOutlined />}
            {selectedEvent ? ' Modifier la présence' : ' Ajouter une présence'}
          </span>
        }
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        footer={[
          selectedEvent && (
            <Button 
              key="delete" 
              danger 
              icon={<DeleteOutlined />}
              onClick={handleDelete}
            >
              Supprimer
            </Button>
          ),
          <Button key="cancel" onClick={handleCancel}>
            Annuler
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            {selectedEvent ? 'Modifier' : 'Ajouter'}
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            type: 'present',
            allDay: false
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="employeeId"
                label="Collaborateur"
                rules={[{ required: true, message: 'Veuillez sélectionner un collaborateur' }]}
              >
                <Select placeholder="Sélectionnez un collaborateur">
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
                name="type"
                label="Type de présence"
                rules={[{ required: true, message: 'Veuillez sélectionner le type' }]}
              >
                <Select>
                  {Object.entries(eventTypes).map(([key, type]) => (
                    <Option key={key} value={key}>
                      <span>{type.icon} {type.label}</span>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="allDay"
            label=" "
            valuePropName="checked"
          >
            <Select>
              <Option value={false}>Plage horaire spécifique</Option>
              <Option value={true}>Toute la journée</Option>
            </Select>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.allDay !== currentValues.allDay}
          >
            {({ getFieldValue }) => {
              const allDay = getFieldValue('allDay');
              
              if (allDay) {
                return (
                  <Form.Item
                    name="dateRange"
                    label="Période"
                    rules={[{ required: true, message: 'Veuillez sélectionner la période' }]}
                  >
                    <RangePicker
                      style={{ width: '100%' }}
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                );
              }
              
              return (
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="start"
                      label="Date et heure de début"
                      rules={[{ required: true, message: 'Veuillez sélectionner la date de début' }]}
                    >
                      <DatePicker
                        showTime
                        format="DD/MM/YYYY HH:mm"
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="end"
                      label="Date et heure de fin"
                      rules={[{ required: true, message: 'Veuillez sélectionner la date de fin' }]}
                    >
                      <DatePicker
                        showTime
                        format="DD/MM/YYYY HH:mm"
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              );
            }}
          </Form.Item>

          <Form.Item
            name="notes"
            label="Notes (optionnel)"
          >
            <TextArea
              rows={3}
              placeholder="Ajoutez des notes ou des commentaires..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CalendrierPresence;