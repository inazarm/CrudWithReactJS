//const Axios=require('axios').default
import Axios from 'axios';
export default class AxiosServices{
    
    post(url,data,IsRequired=false,Header){
        console.log("Record in Axios = Data : ",data, " URL : ",url,"Header : ",Header);
        
        return Axios.post(url,data,IsRequired && Header);
    }
    get(url,IsRequired=false,Header){
        return Axios.get(url,IsRequired && Header);

    }
}