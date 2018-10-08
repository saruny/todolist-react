import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Input ,Row, Col, Table,Card,Layout,Breadcrumb, Popconfirm, Form,Divider,Modal, Button  } from 'antd';
const {Content} = Layout;

const FormItem = Form.Item;
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
    modal:false,
    editText:''
  }

  
  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  handleClickOutside = (e) => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  }

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `${title} is required.`,
                      }],
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                  <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                  >
                    {restProps.children}
                  </div>
                )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}


class Todolist extends Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'Text',
      dataIndex: 'name',
      width: '70%',
      editable: true,
    },{
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=>this.OpenEditModal(record)}>Edit</a>
          <Modal
              title="Basic Modal"
              visible={this.state.modal}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
            <Row>
               <Col span={24}>
               <label>Id : {this.state.editId}</label>
               </Col>
            </Row>
            <br/>
            <Row>
               <Col span={2}>
               <label>Text </label>
               </Col>
               <Col span={22}>
               <Input value={this.state.editText} onChange={e => this.onTodoChange(e.target.value)}/>
               </Col>
             
            </Row>

            </Modal>
            <Divider type="vertical" />
          <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
          <a href="javascript:;">Delete</a>
        </Popconfirm>
        </span>
      )
      /*=> {
        return (
          this.state.dataSource.length >= 1
            ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                <a href="javascript:;">Delete</a>
              </Popconfirm>
            ) : null
        );
      },*/
    }];

    this.state = {
      dataSource: [],
      count: 0,
      editText:'',
      editId:''
    };
  }
  onTodoChange(value){
    this.setState({
      editText: value
    });
}
  handleOk = (e) => {
 
    this.setState({
      modal: false,
    });
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => this.state.editId === item.key);
    newData[index].name = this.state.editText;
   
    this.setState({ dataSource: newData });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      modal: false,
    });
  }
  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }
  OpenEditModal = (row) => {
    
    this.setState({
      modal: true,
    });
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    this.state.editId = row.key;
    this.state.editText = row.name;
  }
  handleAdd = (e) => {
    var text = e.target.value;
    if(text != ''){
    const { count, dataSource } = this.state;
    
 
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newData  = {
      key: id,
      name: text
    }
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
    e.target.value = "";
    }else{
      alert('Please input data.');
    }
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  }

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link  to="/Home">Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Todolist</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
      <Card  title="ToDoList">
        
      <Row>
        <Col span={2}>
            <label>Text  </label>
          </Col>
          <Col span={12}>
          <Input placeholder="Please input text ... Enter To Submit" onPressEnter={this.handleAdd}/>
          </Col>
        </Row>
        <br/>

        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </Card>   
      </div>
 
    </Content>

    );
}
}
export default Todolist;
