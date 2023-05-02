import Draw from "../models/drawModel";
import { Request, Response } from 'express'

class DrawController {
    public static async getAllDraws(req: Request, res: Response){
        try {
            const draws = await Draw.find({});
            return res.status(200).json({draws});
        } catch (error) {
            console.log(error);
        }
    }

    public static async store(req: Request, res: Response){
        const {title, font, data, description, categories, url} = req.body;
        const draw = new Draw({
            title,
            font,
            data,
            description,
            categories,
            url
        });

        try {
            await draw.save();
            return res.status(200).json({
                message: "Desenho salvo",
                isSucess: true
            });
        } catch (error) {
            console.log(error);
        }
    }

    public static async getSomeDraw(req: Request, res: Response){
        const section = req.params.section;
        console.log(section)
        const draw = await Draw.find({ section: section});
        if(!draw) return res.status(400).json({ message: "Tipo de desenho não encontrado"});
        return res.status(200).json( { isSucess: true, draw});
    }
}

export default DrawController;