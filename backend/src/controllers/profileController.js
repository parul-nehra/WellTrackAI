const prisma = require("../db/prisma.js");
const { hashPassword } = require("../Utils/bcryptPassword.js");

const getProfile = async (req, res) => {
    const userId = req.user.userId;

    try {
        const user = await prisma.users.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                phoneNumber: true,
                createdAt: true,
                updatedAt: true
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateProfile = async (req, res) => {
    const userId = req.user.userId;
    const { name, phoneNumber } = req.body;

    try {
        const updateData = {};
        if (name) updateData.name = name;
        if (phoneNumber) updateData.phoneNumber = phoneNumber;

        const user = await prisma.users.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
                phoneNumber: true,
                createdAt: true,
                updatedAt: true
            }
        });

        res.status(200).json(user);
    } catch (error) {
        console.error("Error updating profile:", error);
        if (error.code === 'P2002') {
            return res.status(400).json({ message: "Phone number already in use" });
        }
        res.status(500).json({ message: "Server error" });
    }
};

const changePassword = async (req, res) => {
    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Current and new password required" });
    }

    try {
        const user = await prisma.users.findUnique({
            where: { id: userId }
        });

        const { verifyPassword } = require("../Utils/bcryptPassword.js");
        const isValid = await verifyPassword(currentPassword, user.password);

        if (!isValid) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }

        const hashedPassword = await hashPassword(newPassword);
        await prisma.users.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteAccount = async (req, res) => {
    const userId = req.user.userId;

    try {
        await prisma.users.delete({
            where: { id: userId }
        });

        res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getProfile, updateProfile, changePassword, deleteAccount };
