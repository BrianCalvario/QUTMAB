import { json, Request,Response } from "express"
import { UserModel } from "../models/UsersModel"
import jwt from "jsonwebtoken";

export const registerUsers = async (req: Request, res: Response): 
Promise<any> => {
    
    try {
        ///Primero debemos validar que los datos existen
        const name = req.body.name
        const email= req.body.email
        const lastnames = req.body.lastnames
        const password = req.body.password 
        const rol = req.body.rol

        //Administradores no pueden crear clientes 
        if(req.user?.rol === "administrador" && rol === "clientes"){
            return res.status(400).json({msg: "Los administradores no pueden crear clientes"})
        } 
        if(!name ||!email || !lastnames || !password|| !rol){
            return res.status(400).json({
                Msg:"Faltan datos para crear un usuario"
            })
        }
        //Validar que el usuario sea administrador si el usuario a crear sea administrador
        if (rol === "administrador" && req.user?.rol !="administrador"){
            return res.status(400).json({
                Msg:"No puedes crear un nuevo usuario si no eres administrador"
            })
        }

        const user = await UserModel.create({
            name,
            lastnames,
            email,
            password,
            rol
        })
        const token = jwt.sign(JSON.stringify (user),"pocoyo");

        return res.status(200).json ({msg:"Usuario registrado con exito", token })

    } catch (error) {
        console.log(error);
        return res.status(500).json ({ msg: "Hubo un error al crear el usuario"})
    }
} 
export const sining = async (req: Request, res:  Response) :Promise<any> => {
    //correo y contraseña
    //verificat que el usuario existe
    const user = await UserModel.findOne({email:req.body.email.password});
    //si no existe devuelve error 
    //si existe devuelva token
}

