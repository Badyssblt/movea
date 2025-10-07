import { computed } from 'vue';
import dayjs from 'dayjs';

export function useDate(isoDate: any, format = 'DD/MM/YYYY HH:mm') {
  // formattedDate est un computed qui renvoie la date formatée
  const formattedDate = computed(() => {
    if (!isoDate) return '';
    return dayjs(isoDate).format(format);
  });

  return {
    formattedDate,
  };
}
