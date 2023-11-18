import prisma from "./prismadb";

export const isAdmin = async (id: string) => {
  if (id === undefined) return false;
  const res = await prisma.user.findUnique({ where: { id: id } });
  return res !== null && res.role === "admin";
};
