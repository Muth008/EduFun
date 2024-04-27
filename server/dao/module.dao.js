class ModuleDAO {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async getModule(moduleId) {
        try {
            const module = await this.prisma.module.findUnique({
                where: { id: moduleId },
            });

            if (!module) return null;
            
            module.tasks = await this.getModuleTasks(moduleId);

            return module;
        } catch (error) {
            throw new Error(`Failed to get module: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }

    async listModules(filter = {}) {
        try {
            const modules = await this.prisma.module.findMany({
                where: filter,
            });

            for (let module of modules) {
                module.tasks = await this.getModuleTasks(module.id);
            }

            return modules;
        } catch (error) {
            throw new Error(`Failed to list modules: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }

    async createModule(moduleData) {
        try {
            const tasks = moduleData.tasks ?? [];
            delete moduleData.tasks;

            const module = await this.prisma.module.create({
                data: moduleData,
            });

            await this.createModuleTasks(module.id, tasks);

            return this.getModule(module.id);
        } catch (error) {
            throw new Error(`Failed to create module: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }

    async updateModule(moduleId, moduleData) {
        try {
            const tasks = moduleData.tasks ?? [];
            delete moduleData.tasks;
            delete moduleData.id;

            const module = await this.prisma.module.update({
                where: { id: moduleId },
                data: moduleData,
            });

            if (tasks) {
                await this.prisma.moduleTask.deleteMany({
                    where: { moduleId: moduleId },
                });

                await this.createModuleTasks(module.id, tasks);
            }

            return this.getModule(module.id);
        } catch (error) {
            throw new Error(`Failed to update module: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }

    async deleteModule(moduleId) {
        try {
            await this.prisma.moduleTask.deleteMany({
                where: { moduleId: moduleId },
            });

            const module = await this.prisma.module.delete({
                where: { id: moduleId },
            });

            return module;
        } catch (error) {
            throw new Error(`Failed to delete module: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }

    async getModuleTasks(moduleId) {
        const moduleTasks = await this.prisma.moduleTask.findMany({
            where: { moduleId: moduleId },
            include: { Task: true },
        });

        return moduleTasks.map((moduleTask) => ({
            id: moduleTask.Task.id,
            order: moduleTask.order,
        }));
    }

    async createModuleTasks(moduleId, tasks) {
        for (let task of tasks) {
            await this.prisma.moduleTask.create({
                data: {
                    moduleId: moduleId,
                    taskId: task.id,
                    order: task.order,
                },
            });
        }
    }
}

module.exports = ModuleDAO;
