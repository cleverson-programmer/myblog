
export const formatDate = (date) => {
    if (!date) return ""; // Caso o valor seja null ou undefined
    if (typeof date === "string") return date; // Se já for string, retorna
    return date.toISOString().split("T")[0]; // Converte Date para yyyy-MM-dd
};