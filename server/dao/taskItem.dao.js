const { handlePrismaError } = require('../utils/dao.util');

class TaskItemDAO {
    type = 'taskitem';
    
    constructor(prisma) {
        this.prisma = prisma;
    }

    async listTaskItems(filter = {}) {
        try {
            const taskItems = await this.prisma.taskItem.findMany({
                where: filter,
            });
            return taskItems;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async getTaskItem(taskItemId) {
        try {
            const taskItem = await this.prisma.taskItem.findUnique({
                where: { id: taskItemId },
            });
            return taskItem;
        } catch (error) {
            handlePrismaError(error, this.type, taskItemId);
        }
    }

    async createTaskItem(taskItemData) {
        try {
            const taskItem = await this.prisma.taskItem.create({
                data: taskItemData,
            });
            return taskItem;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async updateTaskItem(taskItemId, taskItemData) {
        try {
            delete taskItemData.id;
            const taskItem = await this.prisma.taskItem.update({
                where: { id: taskItemId },
                data: taskItemData,
            });
            return taskItem;
        } catch (error) {
            handlePrismaError(error, this.type, taskItemId);
        }
    }

    async deleteTaskItem(taskItemId) {
        try {
            const taskItem = await this.prisma.taskItem.delete({
                where: { id: taskItemId },
            });
            return taskItem;
        } catch (error) {
            handlePrismaError(error, this.type, taskItemId);
        }
    }

    async getTaskHints(taskId) {
        try {
            const taskHints = await this.prisma.taskItem.findMany({
                where: {
                    taskId: taskId,
                    type: 'hint',
                },
            });
            return taskHints;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async getTaskSolution(taskId) {
        try {
            const taskSolution = await this.prisma.taskItem.findMany({
                where: {
                    taskId: taskId,
                    type: 'solution',
                },
            });
            return taskSolution;
        } catch (error) {
            handlePrismaError(error);
        }
    }
}

module.exports = TaskItemDAO;