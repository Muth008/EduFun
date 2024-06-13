const { handlePrismaError } = require('../utils/dao.util');

class UserDAO {
    type = 'user';

    constructor(prisma) {
        this.prisma = prisma;
    }

    async listUsers(filter = {}) {
        try {
            const users = await this.prisma.user.findMany({
                where: filter,
            });
            return users;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async getUser(userId) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                include: { Role: true }
            });
            return user;
        } catch (error) {
            handlePrismaError(error, this.type, userId);
        }
    }

    async createUser(userData) {
        try {
            const user = await this.prisma.user.create({
                data: userData,
                include: { Role: true }
            });
            return user;
        } catch (error) {
            console.log("Error", error  );
            handlePrismaError(error);
        }
    }

    async updateUser(userId, userData) {
        try {
            delete userData.id;
            const user = await this.prisma.user.update({
                where: { id: userId },
                data: userData,
            });
            return user;
        } catch (error) {
            handlePrismaError(error, this.type, userId);
        }
    }

    async deleteUser(userId) {
        try {
            const user = await this.prisma.user.delete({
                where: { id: userId },
            });
            return user;
        } catch (error) {
            handlePrismaError(error, this.type, userId);
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email: email },
                include: { Role: true }
            });
            return user;
        } catch (error) {
            console.log("Error", error  );
            handlePrismaError(error, this.type, email);
        }
    }

    async getUserByResetPass(resetPass) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { resetPass: resetPass },
            });
            return user;
        } catch (error) {
            handlePrismaError(error, this.type, resetPass);
        }
    }
}

module.exports = UserDAO;