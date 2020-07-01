export default class DateHandler {
  dateNow() {
    const dateNow = new Date();
    const yearNow = dateNow.getFullYear();
    const monthNow = dateNow.getMonth() + 1;
    const dayNow = dateNow.getDate();

    return `${yearNow}-${monthNow}-${dayNow}`;
  }

  dateWeekAgo() {
    const dateNow = new Date(Date.now() - 604800000);
    const yearNow = dateNow.getFullYear();
    const monthNow = dateNow.getMonth() + 1;
    const dayNow = dateNow.getDate();

    return `${yearNow}-${monthNow}-${dayNow}`;
  }
}
