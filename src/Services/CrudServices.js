import Configuration from './../Configuration/Configuration';
import Axios from './AxiosServices';
const axios = new Axios();
//const  Config=new Configuration();
export default class CrudServices {

    CreateRecord(data) {
        console.log("Data : ", data, " URL : ", Configuration.CreateRecord);
        return axios.post(Configuration.CreateRecord, data, false);
    }
    ReadRecord() {
        console.info("Url : ", Configuration.GetRecord);
        return axios.get(Configuration.GetRecord, false);
    }
    UpdateRecord(data) {
        console.info("Url : ", Configuration.UpdateRecord);
        return axios.put(Configuration.UpdateRecord, data, false);
    }
    DeleteRecord(data){
        console.info("Url : ",Configuration.DeleteRecord, "Data : ",data);
        //return axios.delete(Configuration.DeleteRecord,{data:{UserID:data.UserId}},false);
        return axios.delete(Configuration.DeleteRecord,data,false);
    }
}
