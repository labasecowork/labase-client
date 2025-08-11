/**
 * Format a date string to a human-readable format
 * @param dateString - The date string to format
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }

    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Fecha inválida";
  }
}

/**
 * Format a date to show how much time has passed (e.g., "2 hours ago")
 * @param dateString - The date string
 * @returns Relative time string
 */
export function timeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }

    const secondsPast = (now.getTime() - date.getTime()) / 1000;

    if (secondsPast < 60) {
      return "Hace un momento";
    }
    if (secondsPast < 3600) {
      return `Hace ${Math.floor(secondsPast / 60)} minutos`;
    }
    if (secondsPast < 86400) {
      return `Hace ${Math.floor(secondsPast / 3600)} horas`;
    }
    if (secondsPast < 604800) {
      return `Hace ${Math.floor(secondsPast / 86400)} días`;
    }
    if (secondsPast < 2592000) {
      return `Hace ${Math.floor(secondsPast / 604800)} semanas`;
    }
    if (secondsPast < 31536000) {
      return `Hace ${Math.floor(secondsPast / 2592000)} meses`;
    }

    return `Hace ${Math.floor(secondsPast / 31536000)} años`;
  } catch (error) {
    console.error("Error calculating time ago:", error);
    return "Fecha inválida";
  }
}

/**
 * Format a date range (start date to end date)
 * @param startDate - The start date string
 * @param endDate - The end date string
 * @returns Formatted date range string
 */
export function formatDateRange(startDate: string, endDate: string): string {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return "Rango de fechas inválido";
    }

    const startFormatted = new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(start);

    const endFormatted = new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(end);

    return `${startFormatted} - ${endFormatted}`;
  } catch (error) {
    console.error("Error formatting date range:", error);
    return "Rango de fechas inválido";
  }
}
