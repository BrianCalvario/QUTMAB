import { Schema,model } from "mongoose";
import { IQuestionnaire } from "../@Types/GlobalTypes";


const QuestionnaireSchema = new Schema<IQuestionnaire>({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
});

export const QuestionnaireModel = model ("questionnaires",QuestionnaireSchema);