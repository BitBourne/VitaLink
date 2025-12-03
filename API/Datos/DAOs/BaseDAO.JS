class BaseDAO {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return await this.model.create(data);
    }

    async findById(id) {
        return await this.model.findByPk(id);
    }

    async findAll(options = {}) {
        return await this.model.findAll(options);
    }

    /**
     * @param {Object} data - Condiciones de consulta
     */
    async findOne(data) {
        return await this.model.findOne({ where: data });
    }

    async update(id, data) {
        const instance = await this.model.findByPk(id);
        if (!instance) throw new Error(`${this.model.name} not found`);
        return await instance.update(data);
    }

    async delete(id) {
        const instance = await this.model.findByPk(id);
        if (!instance) throw new Error(`${this.model.name} not found`);
        return await instance.destroy();
    }
}

export default BaseDAO;