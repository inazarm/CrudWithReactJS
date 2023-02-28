import React, { Component } from 'react';
import "./HomePage.scss";
import { TextField, Button} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CrudServices from '../Services/CrudServices';

const Service = new CrudServices();

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            UserId:'',
            UserName: '',
            Age: '',
            DataRecord: [],
            UpdateFlag:false
        }
    }
    componentWillMount() {
        console.info("Component will mount calling");
        this.ReadRecord();
    }

    ReadRecord() {
        Service.ReadRecord().then((data) => {
            console.info(data);
            console.info(data.data.readInformation);
            this.setState({ DataRecord: data.data.readInformation })
        }).catch((error) => {
            console.info(error);
        })
    }
    handleChange = (e) => {
        const { name, value } = e.target
        this.setState(
            { [name]: value },
            () => {
                console.info(this.state)
            })
    }
    handleClick = (e) => {
        if (this.state.UserName === '' || this.state.Age === '') {
            console.info("Input fields can not be empty!");
            return;
        }
        console.info("data : ", this.state);
        if(this.state.UpdateFlag===false){
            const data = {
                UserName: this.state.UserName,
                Age: Number(this.state.Age)
            }
            Service.CreateRecord(data).then((data) => {
                console.info(data)
                this.ReadRecord()
            }).catch((error) => {
                console.info(error)
            })
        }
        else{
            const data={
                UserId:Number(this.state.UserId),
                UserName:this.state.UserName,
                Age:Number(this.state.Age)
            }

            Service.UpdateRecord(data).then((data)=>{
                console.info(data)
                this.ReadRecord()
            }).catch((error)=>{
                console.info(error)
            })
        }
        this.setState({UpdateFlag:false,UserName:'',Age:''})
    }

    handleEdit = (data)=>{
        this.setState({UserName:data.userName,UserId:data.userID,Age:data.age,UpdateFlag:true})
    }

    handleDelete =(datas)=>{
        const data={
            UserId:Number(datas.userID),
          }
        Service.DeleteRecord(data).then((data)=>{
            console.info(data);
            this.ReadRecord();
        }).catch((error)=>{
            console.info(error);
        });
    }
    render() {
        let state = this.state;
        let self=this;
        return (
            <div className="MainContainer">
                <div className="SubContainer">
                    <div className='Box1'>
                        <div className='Input-Container'>
                            <div className='flex-Container'>
                                <TextField
                                    fullWidth
                                    label="UserName"
                                    name='UserName'
                                    size='small' v
                                    ariant="outlined"
                                    value={state.UserName}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className='flex-Container'>
                                <TextField
                                    fullWidth
                                    label="Age"
                                    name='Age'
                                    size='small'
                                    variant="outlined"
                                    value={state.Age}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className='flex-button'>
                                <Button variant='contained' color='secondary' onClick={this.handleClick}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className='Box2'>
                        {
                            Array.isArray(this.state.DataRecord) && this.state.DataRecord.length>0?
                            this.state.DataRecord.map(function (data, index) {
                                return (
                                    <div key={index} className='data-flex'>
                                        <div className='userID'>{data.userID}</div>
                                        <div className='userName'>{data.userName}</div>
                                        <div className='age'>{data.age}</div>
                                        <div className='Edit'>
                                        <Button variant="outlined" onClick={()=>{self.handleEdit(data)}} ><EditIcon/></Button>
                                        </div>
                                        <div className='Delete'>
                                        <Button variant="outlined" color="error" onClick={()=>{self.handleDelete(data)}} ><DeleteIcon/></Button>
                                        </div>
                                        
                                    </div>
                                )
                            }):<div className='data-flex'>
                            <div className='record-not-found'>Record not found</div>
                        </div>
                        }
                        {/* {this.state.DataRecord.length === 0 ? (
                            <div className='data-flex'>
                                <div className='record-not-found'>Record not found</div>
                            </div>

                        ) : (
                            this.state.DataRecord.map(function (data, index) {
                                return (
                                    <div key={index} className='data-flex'>
                                        <div className='userID'>{data.userID}</div>
                                        <div className='userName'>{data.userName}</div>
                                        <div className='age'>{data.age}</div>
                                    </div>
                                )
                            })
                        )} */}
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;