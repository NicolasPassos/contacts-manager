const CategoriesRepository = require('../repository/CategoriesRepository');

class CategoryController {
    async index(request, response) {
        const { orderBy } = request.query;
        const categories = await CategoriesRepository.findAll(orderBy);
        response.json(categories);
    }

    async show(request, response) {
        const category = await CategoriesRepository.findById(request.params.id);
        response.json(category);
    }

    async store(request, response) {
        const { name } = request.body;
        if (!name) {
            return response.status(400).json({ error: 'Name is required.'});
        }
        const category = await CategoriesRepository.create({ name });
        response.json(category);
    }

    async delete(request, response) {
        const { id } = request.query;
        await CategoriesRepository.delete(id);
        return response.sendStatus(204); 
    }

    async update(request, response) {
        const { id } = request.params;
        const { name } = request.body;

        const categoryExists = await CategoriesRepository.findById(id);

        if (!categoryExists) {
            return response.status(400).json({ error: 'Category not found.'}); 
        }

        const category = await CategoriesRepository.update(id, {name});

        response.json(category);
    }
}

module.exports = new CategoryController();