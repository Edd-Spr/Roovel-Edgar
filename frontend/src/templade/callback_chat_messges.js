import { httpClientePlugin ,ClientPlugin_perfiles_chat, ClientPlugin_group_chat, ClientPligin_friends, } from '../Plugins/index'

export const getMessages = async(UserSentMenssge_Chat,UserReciveMenssage_Chat)=>{
    try{
        const  url = `http://localhost:3000/api/messages?idReciveMessague=${UserReciveMenssage_Chat}&idSentMessage=${UserSentMenssge_Chat}`
        const  menssages = await httpClientePlugin.get(url)
        const pass = [...menssages]
        //console.log(pass)
        return pass
    }catch(Error){
        return 'user not found'
    }

}
export const sendMessage = async(UserSentMenssge_Chat,UserReciveMenssage_Chat,Message)=>{
    try{
        const  url = `http://localhost:3000/api/messages`
        const  menssages = await httpClientePlugin.post(url,{UserSentMenssge_Chat,UserReciveMenssage_Chat,Message})
        return menssages
    }catch(Error){
        return 'user not found'
    }

}
export const getPorfiles = async(actualuser)=>{
    try {
         const url =  `http://localhost:3000/api/porfilesChat?userActivateChat=${actualuser}`
         const response = await ClientPlugin_perfiles_chat.get(url)
         return response
    } catch (error) {
        return 'user not found'
        
    }
}
export const getGroups = async(actualuser)=>{
    try {
         const url =  `http://localhost:3000/api/gruposChat?currentUser=${actualuser}`
         const response = await ClientPlugin_group_chat.get(url)
         return response
    } catch (error) {
        return 'user not found'
        
    }
}
export const PostFriendRquest = async(idUser, idUserRequest)=>{
    try {
         const url =  `http://localhost:3000/api/friendsRequest`
         const response = await ClientPligin_friends.post(url,{idUser,idUserRequest})
         return response
    } catch (error) {
        return 'user not found'
        
    }
}
