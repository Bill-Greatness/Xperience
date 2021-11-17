import {Share} from 'react-native'

type Post = {
    title:string|null, 
    content:string,
    date:Date,
    author:any
}

export const newPost = (content:Post) => {
    
}

export const onShare = async () => {
    try{
        const result = await Share.share({
            message:"This is a Test Message to be shared!"
        })
        if(result.action === Share.sharedAction){
            if(result.activityType){

            }else{
                //shared.
            }
        }else if(result.action === Share.dismissedAction){
            // dismissed
        }
    }catch(err){
        alert(err.message)
    }
}