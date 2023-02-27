import Configuration from './../Configuration/Configuration';
import Axios from './AxiosServices';
const axios=new Axios();
//const  Config=new Configuration();
export default class CrudServices {
    
    CreateRecord(data){
        console.log("Data : ",data, " URL : ",Configuration.CreateRecord);
        return axios.post(Configuration.CreateRecord,data,false);
    }
    ReadRecord(){
        console.info("Url : ",Configuration.GetRecord);
        return axios.get(Configuration.GetRecord,false);
    }
}
