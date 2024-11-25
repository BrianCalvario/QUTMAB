import { Schema } from "mongoose";
export interface IUser {
    name:string;
    email:string;
    lastnames:string;
    password:string;
    rol: "administrador" | "client"
}

export interface IQuestion{
    title:String,
    type: "radio" | "checkbox" | "select" | "text",
    isMandatory:boolean,
    questionnaireId:Schema.Types.ObjectId | string;
}

export interface IQuestionnaire{
    title:String,
    description:String,
    userId:Schema.Types.ObjectId | String;
}

export interface IOption {
    title: String,
    questionId: Schema.Types.ObjectId | string;
}

export interface IAnswer{
    questionnaireId:Schema.Types.ObjectId | string;
    questionId:Schema.Types.ObjectId | string;
    answer:String;
}

