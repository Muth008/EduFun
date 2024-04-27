class TaskDAO {
    
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
            throw new Error(`Failed to find tasks: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }

    async getTask(taskId) {
        try {
            const task = await this.prisma.task.findUnique({
                where: { id: taskId },
            });
            return task;
        } catch (error) {
            throw new Error(`Failed to get task: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }

    async createTask(taskData) {
        try {
            const task = await this.prisma.task.create({
                data: taskData,
            });
            return task;
        } catch (error) {
            throw new Error(`Failed to create task: ${error.meta?.cause ?? error.meta?.target}`);
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
            throw new Error(`Failed to update task: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }

    async deleteTask(taskId) {
        try {
            const task = await this.prisma.task.delete({
                where: { id: taskId },
            });
            return task;
        } catch (error) {
            throw new Error(`Failed to delete task: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }
}

module.exports = TaskDAO;