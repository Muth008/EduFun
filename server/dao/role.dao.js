const { handlePrismaError } = require('../utils/dao.util');

class RoleDAO {
    type = 'role';

    constructor(prisma) {
        this.prisma = prisma;
    }

    async listRoles(filter = {}) {
        try {
            const roles = await this.prisma.role.findMany({
                where: filter,
            });
            return roles;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async getRole(roleId) {
        try {
            const role = await this.prisma.role.findUnique({
                where: { id: roleId },
            });
            return role;
        } catch (error) {
            handlePrismaError(error, this.type, roleId);
        }
    }

    async createRole(roleData) {
        try {
            const role = await this.prisma.role.create({
                data: roleData,
            });
            return role;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async updateRole(roleId, roleData) {
        try {
            delete roleData.id;
            const role = await this.prisma.role.update({
                where: { id: roleId },
                data: roleData,
            });
            return role;
        } catch (error) {
            handlePrismaError(error, this.type, roleId);
        }
    }

    async deleteRole(roleId) {
        try {
            const role = await this.prisma.role.delete({
                where: { id: roleId },
            });
            return role;
        } catch (error) {
            handlePrismaError(error, this.type, roleId);
        }
    }

    async getRoleByName(roleName) {
        try {
            const role = await this.prisma.role.findUnique({
                where: { name: roleName },
            });
            return role;
        } catch (error) {
            handlePrismaError(error, this.type, roleName);
        }
    }
}

module.exports = RoleDAO;