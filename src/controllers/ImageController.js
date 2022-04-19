const Image = require("../models/Image")

module.exports = {
    async createImage(req, res) {
        const { location: url = '' } = req.file;
        const {text} = req.body;

        try {
            const image = await Image.create({
                text: text,
                post_image: url
            });
            
            if(image) {
                return res.status(201).json({ message: "Imagem criada com sucesso!"});
            } else {
                return res.status(422).json({ error: "Erro ao criar a imagem!"});
            }
            

        } catch (error) {
            res.json({error: error});
            console.log('Erro ao criar o a imgem', error); 
        }
    },

    async updateImage(req, res) {
        const { location: url = '' } = req.file;
        const {text, post_id} = req.body;

        try {
            const image = await Image.findOne({
                where: { id: post_id },
            });
        
            const id = image.id;
        
            const img = await Image.update(
             {
                id: id,
                text: text,
                post_image: url
             },
             {
                where: { id: post_id }
            });

            if(img) {
                return res.status(201).json({ message: "Imagem atualizado com sucesso!"});
            } else {
                return res.status(422).json({ error: "Erro ao atualizar a imagem!"});
            }
        

        } catch (error) {
            res.json({error: error});
            console.log('Erro ao atualizar a imagem', error); 
        }
    },
    async deleteImage(req, res) {
        const {post_id} = req.body;

        try {
            const image = await Image.findOne({
                where: { id: post_id },
            });
        
            const id = image.id;
        
            const img = await Image.destroy({where: { id: post_id}});
        
            res.json( {message: "deletado com sucesso!"} );

        } catch (error) {
            res.json({error: error});
            console.log('Erro ao deletar o Imgem', error); 
        }
    },
}