const { handlePrismaError } = require('../utils/dao.util');

class TaskDAO {
    type = 'task';
    
    constructor(prisma) {
        this.prisma = prisma;
    }

    async listTasks(filter = {}) {
        try {
            const tasks = await this.prisma.task.findMany({
                where: filter,
            });
            return tasks;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async getTask(taskId) {
        try {
            const task = await this.prisma.task.findUnique({
                where: { id: taskId },
            });
            return task;
        } catch (error) {
            handlePrismaError(error, this.type, taskId);
        }
    }

    async createTask(taskData) {
        try {
            const task = await this.prisma.task.create({
                data: taskData,
            });
            return task;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async updateTask(taskId, taskData) {
        try {
            delete taskData.id;
            const task = await this.prisma.task.update({
                where: { id: taskId },
                data: taskData,
            });
            return task;
        } catch (error) {
            handlePrismaError(error, this.type, taskId);
        }
    }

    async deleteTask(taskId) {
        try {
            const task = await this.prisma.task.delete({
                where: { id: taskId },
            });
            return task;
        } catch (error) {
            handlePrismaError(error, this.type, taskId);
        }
    }
}

module.exports = TaskDAO;