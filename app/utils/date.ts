export function formatDate(date: any) {
    return new Date(date).toLocaleDateString('default', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });
  }
  