// src/pages/RH/Employe/Presence/HeuresTravaillees.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Statistic,
  Tag,
  DatePicker,
  Select,
  Progress,
  Alert,
  List,
  Modal,
  Form,
  Input,
  Space,
  Divider,
  Tooltip,
  Badge
} from 'antd';
import {
  DownloadOutlined,
  CalculatorOutlined,
  BarChartOutlined,
  ClockCircleOutlined,
  PlusCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  TrophyOutlined,
  WarningOutlined,
  UserOutlined  // Ajout de l'import manquant
} from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const HeuresTravaillees = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [dateRange, setDateRange] = useState([
    moment().startOf('week'),
    moment().endOf('week')
  ]);
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form] = Form.useForm();
  const tableRef = useRef();

  // Données mockées des employés
  const [employees] = useState([
    { id: 1, nom: 'Dupont Jean', departement: 'IT', tauxHoraire: 45 },
    { id: 2, nom: 'Martin Marie', departement: 'IT', tauxHoraire: 42 },
    { id: 3, nom: 'Bernard Pierre', departement: 'Finance', tauxHoraire: 38 },
    { id: 4, nom: 'Sophie Laurent', departement: 'IT', tauxHoraire: 55 },
    { id: 5, nom: 'Paul Durand', departement: 'Finance', tauxHoraire: 50 }
  ]);

  // Données mockées des heures travaillées
  const [heuresData, setHeuresData] = useState([]);

  // Génération de données mockées
  useEffect(() => {
    generateMockData();
  }, []);

  const generateMockData = () => {
    const mockData = [];
    const startDate = moment().startOf('month');
    
    employees.forEach(employee => {
      for (let i = 0; i < 30; i++) {
        const date = moment(startDate).add(i, 'days');
        if (date.day() !== 0 && date.day() !== 6) { // Exclure weekends
          const heuresBase = 8;
          const heuresSupplementaires = Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0;
          const retard = Math.random() > 0.8 ? Math.floor(Math.random() * 30) : 0;
          
          mockData.push({
            id: `${employee.id}-${i}`,
            employeeId: employee.id,
            date: date.format('YYYY-MM-DD'),
            jour: date.format('dddd'),
            heureArrivee: `0${8 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            heureDepart: `${17 + Math.floor(heuresSupplementaires)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            heuresNormales: heuresBase,
            heuresSupplementaires,
            retardMinutes: retard,
            pauseDejeuner: 60,
            statut: heuresSupplementaires > 0 ? 'supplementaires' : 'normal',
            notes: heuresSupplementaires > 0 ? 'Projet urgent' : ''
          });
        }
      }
    });
    
    setHeuresData(mockData);
  };

  // Filtrage des données selon la période et l'employé
  const filteredData = heuresData.filter(record => {
    const recordDate = moment(record.date);
    const inDateRange = dateRange && dateRange[0] && dateRange[1] 
      ? recordDate.isBetween(dateRange[0], dateRange[1], 'day', '[]')
      : true;
    
    const employeeMatch = selectedEmployee === 'all' || record.employeeId === parseInt(selectedEmployee);
    
    return inDateRange && employeeMatch;
  });

  // Regroupement des données par employé
  const dataByEmployee = employees.map(employee => {
    const employeeRecords = filteredData.filter(record => record.employeeId === employee.id);
    const totalHeures = employeeRecords.reduce((sum, record) => sum + record.heuresNormales + record.heuresSupplementaires, 0);
    const totalSupplementaires = employeeRecords.reduce((sum, record) => sum + record.heuresSupplementaires, 0);
    const totalRetard = employeeRecords.reduce((sum, record) => sum + record.retardMinutes, 0);
    
    return {
      ...employee,
      totalHeures,
      totalSupplementaires,
      totalRetard,
      joursTravailles: employeeRecords.length,
      moyenneQuotidienne: totalHeures / (employeeRecords.length || 1)
    };
  });

  // Calcul des totaux généraux
  const totals = {
    totalHeures: dataByEmployee.reduce((sum, emp) => sum + emp.totalHeures, 0),
    totalSupplementaires: dataByEmployee.reduce((sum, emp) => sum + emp.totalSupplementaires, 0),
    totalJours: dataByEmployee.reduce((sum, emp) => sum + emp.joursTravailles, 0),
    moyenneGenerale: dataByEmployee.reduce((sum, emp) => sum + emp.moyenneQuotidienne, 0) / (dataByEmployee.length || 1)
  };

  // Colonnes du tableau détaillé
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => moment(date).format('DD/MM/YYYY'),
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix()
    },
    {
      title: 'Jour',
      dataIndex: 'jour',
      key: 'jour'
    },
    {
      title: 'Employé',
      dataIndex: 'employeeId',
      key: 'employeeId',
      render: (employeeId) => {
        const employee = employees.find(emp => emp.id === employeeId);
        return employee ? employee.nom : 'N/A';
      }
    },
    {
      title: 'Arrivée',
      dataIndex: 'heureArrivee',
      key: 'heureArrivee'
    },
    {
      title: 'Départ',
      dataIndex: 'heureDepart',
      key: 'heureDepart'
    },
    {
      title: 'Heures Normales',
      dataIndex: 'heuresNormales',
      key: 'heuresNormales',
      render: (heures) => `${heures}h`
    },
    {
      title: 'Heures Supp.',
      dataIndex: 'heuresSupplementaires',
      key: 'heuresSupplementaires',
      render: (heures) => (
        <Tag color={heures > 0 ? 'orange' : 'default'}>
          {heures > 0 ? `+${heures}h` : '0h'}
        </Tag>
      )
    },
    {
      title: 'Retard',
      dataIndex: 'retardMinutes',
      key: 'retardMinutes',
      render: (minutes) => (
        minutes > 0 ? 
          <Badge count={`${minutes}min`} style={{ backgroundColor: '#faad14' }} /> 
          : <Tag color="green">À l'heure</Tag>
      )
    },
    {
      title: 'Total Journalier',
      key: 'totalJournalier',
      render: (record) => (
        <strong>
          {record.heuresNormales + record.heuresSupplementaires}h
        </strong>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Voir les détails">
            <Button 
              type="link" 
              icon={<EyeOutlined />}
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
          <Tooltip title="Modifier">
            <Button 
              type="link" 
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  // Gestion des actions
  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    form.setFieldsValue({
      heureArrivee: record.heureArrivee,
      heureDepart: record.heureDepart,
      heuresSupplementaires: record.heuresSupplementaires,
      notes: record.notes
    });
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (selectedRecord) {
        setHeuresData(prev => prev.map(item =>
          item.id === selectedRecord.id
            ? { ...item, ...values }
            : item
        ));
      }
      setIsModalVisible(false);
      form.resetFields();
      setSelectedRecord(null);
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedRecord(null);
  };

  // Export Excel (simulé - nécessiterait l'installation de xlsx)
  const exportToExcel = () => {
    Alert.info('Export Excel - Pour activer cette fonctionnalité, installez la bibliothèque xlsx');
    // Code réel une fois xlsx installé :
    /*
    const worksheet = XLSX.utils.json_to_sheet(filteredData.map(record => {
      const employee = employees.find(emp => emp.id === record.employeeId);
      return {
        Date: moment(record.date).format('DD/MM/YYYY'),
        Employé: employee?.nom,
        'Heure Arrivée': record.heureArrivee,
        'Heure Départ': record.heureDepart,
        'Heures Normales': record.heuresNormales,
        'Heures Supplémentaires': record.heuresSupplementaires,
        'Total Journalier': record.heuresNormales + record.heuresSupplementaires,
        Retard: `${record.retardMinutes} min`
      };
    }));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Heures Travaillées');
    XLSX.writeFile(workbook, `heures_travaillees_${moment().format('DD-MM-YYYY')}.xlsx`);
    */
  };

  // Export PDF (simulé)
  const exportToPDF = () => {
    Alert.info('Export PDF - Fonctionnalité en cours de développement');
  };

  // Composant de graphique simple avec Ant Design (remplacement de Chart.js)
  const SimpleBarChart = ({ data }) => {
    return (
      <div className="simple-bar-chart">
        {data.map((item, index) => {
          const maxValue = Math.max(...data.map(d => d.value));
          const percentage = (item.value / maxValue) * 100;
          return (
            <div key={index} className="bar-item mb-2">
              <div className="d-flex justify-content-between mb-1">
                <span className="bar-label">{item.label}</span>
                <span className="bar-value">{item.value}h</span>
              </div>
              <Progress 
                percent={percentage} 
                strokeColor={item.color}
                showInfo={false}
              />
            </div>
          );
        })}
      </div>
    );
  };

  // Données pour les graphiques simplifiés
  const chartData = {
    bar: dataByEmployee.map(emp => ({
      label: emp.nom.split(' ')[0],
      value: emp.totalHeures,
      color: '#1890ff'
    })),
    supplementaires: dataByEmployee.map(emp => ({
      label: emp.nom.split(' ')[0],
      value: emp.totalSupplementaires,
      color: '#faad14'
    }))
  };

  return (
    <div className="container-fluid">
      {/* En-tête */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <CalculatorOutlined className="me-2" />
                Heures Travaillées
              </h2>
              <p className="text-muted">
                Suivi et analyse du temps de travail - Export pour la paie
              </p>
            </div>
            <Space>
              <Button 
                icon={<FileExcelOutlined />}
                onClick={exportToExcel}
              >
                Export Excel
              </Button>
              <Button 
                icon={<FilePdfOutlined />}
                onClick={exportToPDF}
              >
                Export PDF
              </Button>
            </Space>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <Card className="mb-4">
        <Row gutter={16} align="middle">
          <Col span={6}>
            <Form.Item label="Période">
              <Select 
                value={selectedPeriod}
                onChange={setSelectedPeriod}
              >
                <Option value="day">Aujourd'hui</Option>
                <Option value="week">Cette semaine</Option>
                <Option value="month">Ce mois</Option>
                <Option value="custom">Période personnalisée</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Plage de dates">
              <RangePicker
                value={dateRange}
                onChange={setDateRange}
                style={{ width: '100%' }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Employé">
              <Select 
                value={selectedEmployee}
                onChange={setSelectedEmployee}
              >
                <Option value="all">Tous les employés</Option>
                {employees.map(emp => (
                  <Option key={emp.id} value={emp.id}>
                    {emp.nom}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Button 
              type="primary" 
              icon={<PlusCircleOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              Ajouter une entrée
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Statistiques principales */}
      <Row gutter={16} className="mb-4">
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Heures Travaillées"
              value={totals.totalHeures}
              suffix="h"
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <Progress 
              percent={Math.min(100, (totals.totalHeures / (totals.totalJours * 8)) * 100)} 
              size="small" 
              status="active" 
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Heures Supplémentaires"
              value={totals.totalSupplementaires}
              suffix="h"
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
            <div className="text-muted small">
              {((totals.totalSupplementaires / totals.totalHeures) * 100).toFixed(1)}% du total
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Jours Travaillés"
              value={totals.totalJours}
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Moyenne Quotidienne"
              value={totals.moyenneGenerale.toFixed(1)}
              suffix="h/jour"
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Graphiques simplifiés */}
      <Row gutter={16} className="mb-4">
        <Col span={12}>
          <Card title="Heures Totales par Employé">
            <SimpleBarChart data={chartData.bar} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Heures Supplémentaires par Employé">
            <SimpleBarChart data={chartData.supplementaires} />
          </Card>
        </Col>
      </Row>

      {/* Tableau détaillé */}
      <Card 
        title="Détail des Heures Travaillées"
        extra={
          <span className="text-muted">
            {filteredData.length} enregistrements trouvés
          </span>
        }
      >
        <Table
          ref={tableRef}
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1000 }}
          loading={loading}
        />
      </Card>

      {/* Résumé pour la paie */}
      <Card title="Résumé pour la Paie" className="mt-4">
        <List
          dataSource={dataByEmployee}
          renderItem={employee => (
            <List.Item>
              <List.Item.Meta
                avatar={<UserOutlined />}
                title={employee.nom}
                description={`${employee.departement} - Taux horaire: ${employee.tauxHoraire}€/h`}
              />
              <div className="text-end">
                <div><strong>{employee.totalHeures}h</strong> total</div>
                <div className="text-warning">{employee.totalSupplementaires}h supp.</div>
                <div className="text-success">
                  {(employee.totalHeures * employee.tauxHoraire).toFixed(2)}€
                </div>
              </div>
            </List.Item>
          )}
        />
      </Card>

      {/* Modal pour voir/modifier les détails */}
      <Modal
        title={
          <span>
            <EyeOutlined className="me-2" />
            {selectedRecord ? 'Détails des heures' : 'Nouvelle entrée'}
          </span>
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="heureArrivee"
                label="Heure d'arrivée"
                rules={[{ required: true, message: 'Heure requise' }]}
              >
                <Input type="time" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="heureDepart"
                label="Heure de départ"
                rules={[{ required: true, message: 'Heure requise' }]}
              >
                <Input type="time" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="heuresSupplementaires"
            label="Heures supplémentaires"
          >
            <Input 
              type="number" 
              min={0}
              max={8}
              addonAfter="heures"
            />
          </Form.Item>

          <Form.Item
            name="notes"
            label="Notes"
          >
            <TextArea
              rows={3}
              placeholder="Commentaires sur la journée..."
            />
          </Form.Item>

          {selectedRecord && (
            <Alert
              message="Informations calculées"
              description={
                <div>
                  <div>Heures normales: {selectedRecord.heuresNormales}h</div>
                  <div>Retard: {selectedRecord.retardMinutes} minutes</div>
                  <div>Total: {selectedRecord.heuresNormales + selectedRecord.heuresSupplementaires}h</div>
                </div>
              }
              type="info"
              showIcon
            />
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default HeuresTravaillees;