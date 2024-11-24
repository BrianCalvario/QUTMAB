import { json, Request,Response } from "express"
import { UserModel } from "../models/UsersModel"

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

        await UserModel.create({
            name,
            lastnames,
            email,
            password,
            rol
        })

        return res.status(200).json ({msg:"Usuario registrado con exito"})

    } catch (error) {
        console.log(error);
        return res.status(500).json ({ msg: "Hubo un error al crear el usuario"})
    }
}