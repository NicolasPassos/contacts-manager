const ContactsRepository = require('../repository/ContactsRepository');

class ContactController {
    async index(request, response) {
        // Listar todos os registros
        const { orderBy } = request.query;
        const contacts = await ContactsRepository.findAll(orderBy);
        response.json(contacts);
    }

    async show(request, response) {
        // Listar um registro
        const contact = await ContactsRepository.findById(request.params.id);
        
        if (!contact) {
            return response.status(404).json({error: 'User not found'});
        }
        
        response.json(contact);
    }

    async store(request, response) {
        // Criar um registro
        const { name, email, phone, category_id } = request.body;

        if (!name) {
            return response.status(400).json({ error: 'Name is required.'});
        }

        const contactExists = await ContactsRepository.findByEmail(email);

        if (contactExists) {
            return response.status(400).json({ error: 'This e-mail is already in use.'});
        }
        
        const contact = await ContactsRepository.create({
            name, email, phone, category_id
        });

        response.json(contact)

    }

    async update(request, response) {
        // Editar um registro
        const { id } = request.params;

        const { name, email, phone, category_id } = request.body;

         if (!name) {
            return response.status(400).json({ error: 'Name is required.'});
        }

        const contactExists = await ContactsRepository.findById(id);

        if (!contactExists) {
            return response.status(404).json({error: 'User not found'});
        }

        const contactEmail = await ContactsRepository.findByEmail(email);

        if (contactEmail && contactEmail.id === id) {
            return response.status(400).json({ error: 'This e-mail is already in use.'});
        }

        const contact = await ContactsRepository.update(id, {name, email, phone, category_id});
        
        response.json(contact);
    }

    async delete(request, response) {
        // Deleta um registro
        const {id} = request.params;

        await ContactsRepository.delete(id);

        // 204: no content
        return response.sendStatus(204);

    }
}

// Singleton
module.exports = new ContactController();