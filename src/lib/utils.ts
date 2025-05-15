
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata um número para o formato brasileiro (pt-BR)
 * com segurança contra valores undefined/null
 */
export function formatNumberBR(value: number | undefined | null, minimumFractionDigits = 2, maximumFractionDigits = 2): string {
  if (value === undefined || value === null || isNaN(Number(value))) {
    return "0,00";
  }
  return Number(value).toLocaleString('pt-BR', { 
    minimumFractionDigits, 
    maximumFractionDigits 
  });
}
