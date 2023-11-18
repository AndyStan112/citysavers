import prisma from "./prismadb";

export const isAdmin = async (id: string) => {
  if (id === undefined) return false;
  const res = await prisma.user.findUnique({ where: { id: id } });
  return res !== null && res.role === "admin";
};
export const extractIdFromUrl = (url: string | undefined): string | null => {
  if (!url) return null;
  if (!url.startsWith("https://storage.googleapis.com/")) return null;

  const components = url.split("/");
  if (components.length < 5) return null;

  return components[components.length - 1];
};
export const generateUrlFromId = (fileName: string): string =>
  "https://storage.googleapis.com/" + process.env.BUCKET_NAME! + "/" + fileName;
