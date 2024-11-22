import dayjs from 'dayjs';


export function formatDate(date: Date) {
    return dayjs(date).format("YYYY-MM-DD");
  }

export function formatDateTime(date: Date) {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}
