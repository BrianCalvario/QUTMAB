import { Request, Response } from "express";
import { AnswerModel } from "../models/AnswersModel";
import { OptionModel } from "../models/OptionsModel";
import { QuestionModel } from "../models/QuestionsModel";
import { QuestionnaireModel } from "../models/QuestionnairesModel";


export const createQuestionnaires = async (req: Request, res: Response): Promise<void> => {
    try {
        const title = req.body.title
        const description = req.body.description
        const userId = req.body.userId

        }

        if (!title || !description || !userId) {
            res.status(400).json({ msg: "Faltan datos para crear el cuestionario" })
            return;
        }

        const questionnaire = await QuestionnaireModel.create({
            title,
            description,
            userId,
        });

        res.status(200).json({ msg: "Cuestionario creado con éxito", questionnaire })
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear el cuestionario" })
        return;
    }
};

export const createQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
        const title = req.body.title
        const type = req.body.type
        const isMandatory = req.body.isMandatory
        const questionnaireId = req.body.questionnaireId

        if (!title || !type || !questionnaireId || !isMandatory) {
            res.status(400).json({ msg: "Faltan datos para crear la pregunta" });
            return;
        }

        const question = await QuestionModel.create({
            title,
            type,
            isMandatory,
            questionnaireId,
        });

        res.status(200).json({ msg: "Pregunta creada con éxito", question })
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear la pregunta" })
        return;
    }
};


export const createOption = async (req: Request, res: Response): Promise<void> => {
    try {
        const title = req.body.title
        const questionId = req.body.questionId

        if (!title || !questionId) {
            res.status(400).json({ msg: "Faltan datos para crear la opción" });
            return;
        }

        const option = await OptionModel.create({
            title,
            questionId,
        });

        res.status(200).json({ msg: "Opción creada con éxito", option })
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear la opción" })
        return;
    }
};

export const createAnswer = async (req: Request, res: Response): Promise<void> => {
    try {
        const questionnaireId = req.body.questionnaireId
        const questionId = req.body.questionId
        const answer  = req.body.answer

        if (!questionnaireId || !questionId || !answer) {
            res.status(400).json({ msg: "Faltan datos para enviar la respuesta" });
            return;
        }

        const newAnswer = await AnswerModel.create({
            questionnaireId,
            questionId,
            answer,
        });

        res.status(200).json({ msg: "Respuesta enviada con éxito", newAnswer })
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al enviar la respuesta" })
        return;
    }
};
