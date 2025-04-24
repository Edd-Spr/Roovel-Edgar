import {ClientPlugin_request_home, ClientPlugin_request_roomAll} from '../Plugins/index.js';

export const getRoomReview = async(idRoom)=>{
    try {
         const url =  `http://localhost:3000/api/roomRecentView?idRoom=${idRoom}`
         const response = await ClientPlugin_request_home.get(url)
         return response
    } catch (error) {
        return 'user not found'
        
    }
}
export const getRoomAll = async()=>{
    try {
         const url =  `http://localhost:3000/api/roomsAll`
         const response = await ClientPlugin_request_roomAll.get(url)
         return response
    } catch (error) {
        return 'error get all rooms' 
        
    }
}