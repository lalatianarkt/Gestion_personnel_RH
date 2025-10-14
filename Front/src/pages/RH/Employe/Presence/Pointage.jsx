// src/pages/Presence/PointageManuel.jsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Alert,
  List,
  Statistic,
  Tag,
  Timeline,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Badge,
  Divider
} from 'antd';
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  HistoryOutlined,
  BellOutlined,
  CalculatorOutlined,
  TeamOutlined 
} from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

const PointageManuel = () => {
  const [employees] = useState([
    { id: 1, nom: 'Dupont Jean', departement: 'IT', heureNormale: '09:00' },
    { id: 2, nom: 'Martin Marie', departement: 'IT', heureNormale: '09:00' },
    { id: 3, nom: 'Bernard Pierre', departement: 'Finance', heureNormale: '08:30' },
    { id: 4, nom: 'Sophie Laurent', departement: 'IT', heureNormale: '08:00' },
    { id: 5, nom: 'Paul Durand', departement: 'Finance', heureNormale: '08:00' }
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [pointages, setPointages] = useState([]);
  const [currentTime, setCurrentTime] = useState(moment());
  const [showRetardModal, setShowRetardModal] = useState(false);
  const [retardForm] = Form.useForm();

  // Mise à jour de l'heure actuelle chaque minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Pointage d'arrivée
  const pointerArrivee = () => {
    if (!selectedEmployee) return;

    const maintenant = moment();
    const heureNormale = moment(selectedEmployee.heureNormale, 'HH:mm');
    const retard = maintenant.isAfter(heureNormale);

    const nouveauPointage = {
      id: Date.now(),
      employeeId: selectedEmployee.id,
      type: 'arrivee',
      heure: maintenant.format('HH:mm'),
      date: maintenant.format('YYYY-MM-DD'),
      timestamp: maintenant.valueOf(),
      retard: retard,
      minutesRetard: retard ? maintenant.diff(heureNormale, 'minutes') : 0
    };

    setPointages(prev => [nouveauPointage, ...prev]);

    // Notification de retard
    if (retard) {
      setShowRetardModal(true);
    }
  };

  // Pointage de départ
  const pointerDepart = () => {
    if (!selectedEmployee) return;

    const maintenant = moment();
    const pointageArrivee = pointages.find(p => 
      p.employeeId === selectedEmployee.id && 
      p.type === 'arrivee' && 
      p.date === maintenant.format('YYYY-MM-DD')
    );

    if (!pointageArrivee) {
      Alert.error('Veuillez pointer votre arrivée avant de pointer le départ');
      return;
    }

    const nouveauPointage = {
      id: Date.now(),
      employeeId: selectedEmployee.id,
      type: 'depart',
      heure: maintenant.format('HH:mm'),
      date: maintenant.format('YYYY-MM-DD'),
      timestamp: maintenant.valueOf()
    };

    setPointages(prev => [nouveauPointage, ...prev]);
  };

  // Soumission du motif de retard
  const handleRetardSubmit = (values) => {
    // Ici, on enverrait la notification par n8n
    console.log('Notification retard envoyée:', {
      employee: selectedEmployee.nom,
      motif: values.motif,
      details: values.details,
      minutesRetard: pointages[0]?.minutesRetard
    });

    Alert.success('Motif de retard enregistré et notification envoyée');
    setShowRetardModal(false);
    retardForm.resetFields();
  };

  // Calcul des heures travaillées aujourd'hui
  const calculerHeuresTravailees = (employeeId) => {
    const aujourdhui = moment().format('YYYY-MM-DD');
    const arrivee = pointages.find(p => 
      p.employeeId === employeeId && 
      p.type === 'arrivee' && 
      p.date === aujourdhui
    );
    const depart = pointages.find(p => 
      p.employeeId === employeeId && 
      p.type === 'depart' && 
      p.date === aujourdhui
    );

    if (!arrivee || !depart) return '--:--';

    const duree = moment.duration(
      moment(depart.timestamp).diff(moment(arrivee.timestamp))
    );
    const heures = Math.floor(duree.asHours());
    const minutes = duree.minutes();
    
    return `${heures.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // Statut actuel de l'employé
  const getStatutEmploye = (employeeId) => {
    const aujourdhui = moment().format('YYYY-MM-DD');
    const pointagesAujourdhui = pointages.filter(p => 
      p.employeeId === employeeId && p.date === aujourdhui
    );

    const arrivee = pointagesAujourdhui.find(p => p.type === 'arrivee');
    const depart = pointagesAujourdhui.find(p => p.type === 'depart');

    if (!arrivee) return { statut: 'absent', label: 'Non pointé', color: 'red' };
    if (arrivee && !depart) {
      if (arrivee.retard) {
        return { 
          statut: 'retard', 
          label: `En retard (+${arrivee.minutesRetard}min)`, 
          color: 'orange' 
        };
      }
      return { statut: 'present', label: 'Présent', color: 'green' };
    }
    if (arrivee && depart) return { statut: 'parti', label: 'Parti', color: 'blue' };
    
    return { statut: 'inconnu', label: 'Statut inconnu', color: 'default' };
  };

  // Pointages du jour pour l'historique
  const pointagesDuJour = pointages.filter(p => 
    p.date === moment().format('YYYY-MM-DD')
  ).sort((a, b) => b.timestamp - a.timestamp);

  const statutActuel = selectedEmployee ? getStatutEmploye(selectedEmployee.id) : null;

  return (
    <div className="container-fluid">
      {/* En-tête */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <ClockCircleOutlined className="me-2" />
                Pointage Manuel
              </h2>
              <p className="text-muted">
                Système de pointage manuel - Horodatage automatique
              </p>
            </div>
            <div className="text-end">
              <div className="fw-bold">{currentTime.format('DD/MM/YYYY')}</div>
              <div className="h4 text-primary">{currentTime.format('HH:mm')}</div>
            </div>
          </div>
        </div>
      </div>

      <Row gutter={16}>
        {/* Colonne principale - Pointage */}
        <Col span={16}>
          <Card title="Sélection du Collaborateur" className="mb-4">
            <Form layout="vertical">
              <Form.Item label="Choisir un collaborateur">
                <Select
                  placeholder="Sélectionnez votre nom"
                  value={selectedEmployee?.id}
                  onChange={(value) => setSelectedEmployee(employees.find(e => e.id === value))}
                  size="large"
                >
                  {employees.map(emp => (
                    <Option key={emp.id} value={emp.id}>
                      {emp.nom} - {emp.departement} (Heure normale: {emp.heureNormale})
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>

            {selectedEmployee && (
              <Card 
                type="inner" 
                title={`Pointage - ${selectedEmployee.nom}`}
                className="mt-3"
              >
                <div className="text-center">
                  {/* Statut actuel */}
                  {statutActuel && (
                    <div className="mb-4">
                      <Badge 
                        status={statutActuel.statut} 
                        text={
                          <span className={`text-${statutActuel.color} fw-bold h5`}>
                            {statutActuel.label}
                          </span>
                        } 
                      />
                    </div>
                  )}

                  {/* Boutons de pointage */}
                  <Space direction="vertical" size="large" className="w-100">
                    <Button
                      type="primary"
                      size="large"
                      icon={<PlayCircleOutlined />}
                      onClick={pointerArrivee}
                      disabled={statutActuel?.statut === 'present' || statutActuel?.statut === 'retard'}
                      style={{ height: '60px', fontSize: '16px', width: '200px' }}
                    >
                      Pointer l'Arrivée
                    </Button>

                    <Button
                      type="default"
                      size="large"
                      icon={<PauseCircleOutlined />}
                      onClick={pointerDepart}
                      disabled={statutActuel?.statut === 'absent' || statutActuel?.statut === 'parti'}
                      style={{ height: '60px', fontSize: '16px', width: '200px' }}
                    >
                      Pointer le Départ
                    </Button>
                  </Space>

                  {/* Heures travaillées aujourd'hui */}
                  <Divider />
                  <Statistic
                    title="Heures travaillées aujourd'hui"
                    value={calculerHeuresTravailees(selectedEmployee.id)}
                    prefix={<CalculatorOutlined />}
                    valueStyle={{ color: '#1890ff', fontSize: '24px' }}
                  />
                </div>
              </Card>
            )}
          </Card>

          {/* Historique des pointages du jour */}
          <Card 
            title={
              <span>
                <HistoryOutlined className="me-2" />
                Historique des Pointages - Aujourd'hui
              </span>
            }
          >
            {pointagesDuJour.length > 0 ? (
              <Timeline>
                {pointagesDuJour.map(pointage => {
                  const emp = employees.find(e => e.id === pointage.employeeId);
                  return (
                    <Timeline.Item
                      key={pointage.id}
                      color={pointage.type === 'arrivee' ? 'green' : 'blue'}
                      dot={pointage.retard ? <ExclamationCircleOutlined style={{ color: 'orange' }} /> : null}
                    >
                      <div className="d-flex justify-content-between">
                        <div>
                          <strong>{emp?.nom}</strong>
                          <Tag color={pointage.type === 'arrivee' ? 'green' : 'blue'} className="ms-2">
                            {pointage.type === 'arrivee' ? 'ARRIVÉE' : 'DÉPART'}
                          </Tag>
                          {pointage.retard && (
                            <Tag color="orange" className="ms-2">
                              Retard: {pointage.minutesRetard}min
                            </Tag>
                          )}
                        </div>
                        <div className="text-muted">
                          {moment(pointage.timestamp).format('HH:mm:ss')}
                        </div>
                      </div>
                    </Timeline.Item>
                  );
                })}
              </Timeline>
            ) : (
              <div className="text-center text-muted py-4">
                <HistoryOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                <p>Aucun pointage enregistré aujourd'hui</p>
              </div>
            )}
          </Card>
        </Col>

        {/* Colonne latérale - Vue d'ensemble */}
        <Col span={8}>
          {/* Statut de l'équipe */}
          <Card 
            title={
              <span>
                <TeamOutlined className="me-2" />
                Statut de l'Équipe
              </span>
            }
            className="mb-4"
          >
            <List
              dataSource={employees}
              renderItem={employee => {
                const statut = getStatutEmploye(employee.id);
                return (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<UserOutlined style={{ color: statut.color }} />}
                      title={employee.nom}
                      description={
                        <div>
                          <div>{employee.departement}</div>
                          <Tag color={statut.color}>{statut.label}</Tag>
                        </div>
                      }
                    />
                  </List.Item>
                );
              }}
            />
          </Card>

          {/* Alertes retards */}
          {pointagesDuJour.filter(p => p.retard).length > 0 && (
            <Card 
              title={
                <span>
                  <BellOutlined className="me-2" />
                  Alertes Retards
                </span>
              }
              className="mb-4"
            >
              <Alert
                message="Retards détectés aujourd'hui"
                description={
                  <div>
                    {pointagesDuJour
                      .filter(p => p.retard)
                      .map(pointage => {
                        const emp = employees.find(e => e.id === pointage.employeeId);
                        return (
                          <div key={pointage.id} className="mb-2">
                            <strong>{emp?.nom}</strong> - {pointage.minutesRetard} minutes de retard
                          </div>
                        );
                      })
                    }
                  </div>
                }
                type="warning"
                showIcon
              />
            </Card>
          )}

          {/* Statistiques rapides */}
          <Card title="Statistiques du Jour">
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Présents"
                  value={employees.filter(emp => 
                    ['present', 'retard'].includes(getStatutEmploye(emp.id).statut)
                  ).length}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Retards"
                  value={pointagesDuJour.filter(p => p.retard).length}
                  prefix={<ExclamationCircleOutlined />}
                  valueStyle={{ color: '#faad14' }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Modal pour motif de retard */}
      <Modal
        title={
          <span>
            <ExclamationCircleOutlined className="me-2" />
            Notification de Retard
          </span>
        }
        open={showRetardModal}
        onOk={() => retardForm.submit()}
        onCancel={() => setShowRetardModal(false)}
        okText="Envoyer la notification"
        cancelText="Annuler"
      >
        <Alert
          message="Retard détecté"
          description={`Vous avez ${pointages[0]?.minutesRetard} minutes de retard. Veuillez indiquer le motif.`}
          type="warning"
          showIcon
          className="mb-3"
        />
        
        <Form
          form={retardForm}
          layout="vertical"
          onFinish={handleRetardSubmit}
        >
          <Form.Item
            name="motif"
            label="Motif du retard"
            rules={[{ required: true, message: 'Veuillez sélectionner un motif' }]}
          >
            <Select placeholder="Sélectionnez le motif">
              <Option value="transport">Problème de transport</Option>
              <Option value="sante">Problème de santé</Option>
              <Option value="familial">Raison familiale</Option>
              <Option value="autre">Autre raison</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="details"
            label="Détails supplémentaires"
          >
            <TextArea
              rows={3}
              placeholder="Précisez les détails de votre retard..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PointageManuel;