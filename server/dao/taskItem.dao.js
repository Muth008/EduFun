class TaskItemDAO {
    
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
            throw new Error(`Failed to list task items: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }

    async getTaskItem(taskItemId) {
        try {
            const taskItem = await this.prisma.taskItem.findUnique({
                where: { id: taskItemId },
            });
            return taskItem;
        } catch (error) {
            throw new Error(`Failed to get task item: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }

    async createTaskItem(taskItemData) {
        try {
            const taskItem = await this.prisma.taskItem.create({
                data: taskItemData,
            });
            return taskItem;
        } catch (error) {
            throw new Error(`Failed to create task item: ${error.meta?.cause ?? error.meta?.target}`);
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
            throw new Error(`Failed to update task item: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }

    async deleteTaskItem(taskItemId) {
        try {
            const taskItem = await this.prisma.taskItem.delete({
                where: { id: taskItemId },
            });
            return taskItem;
        } catch (error) {
            throw new Error(`Failed to delete task item: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }
}

module.exports = TaskItemDAO;