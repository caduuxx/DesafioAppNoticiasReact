// src/utils/formatDate.ts

/**
 * Formata uma data ISO para o formato DD/MM/YYYY
 * @param isoDate string no formato ISO (ex: "2025-09-30T20:00:00Z")
 * @returns string formatada (ex: "30/09/2025")
 */
export const formatDate = (isoDate: string): string => {
  try {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // meses começam do 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error("Erro ao formatar data:", error);
    return isoDate; // fallback caso a data esteja inválida
  }
};
