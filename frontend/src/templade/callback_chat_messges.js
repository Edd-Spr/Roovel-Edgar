import { httpClientePlugin } from '../Plugins/index'

export const getMessages = async(UserSentMenssge_Chat,UserReciveMenssage_Chat)=>{
    try{
        const  url = `http://localhost:3000/api/messages?idReciveMessague=${UserReciveMenssage_Chat}&idSentMessage=${UserSentMenssge_Chat}`
        const  menssages = await httpClientePlugin.get(url)
        return menssages
    }catch(Error){
        return 'pokemon not found'
    }

}