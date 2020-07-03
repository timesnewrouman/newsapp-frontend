function dateNowHandler() {
  const dateNow = new Date(Date.now());
  const yearNow = dateNow.getFullYear();
  const monthNow = dateNow.getMonth() + 1;
  const dayNow = dateNow.getDate();

  return `${yearNow}-${monthNow}-${dayNow}`;
}

function dateWeekAgoHandler() {
  const sevenDays = 7 * 24 * 60 * 60 * 1000; // 7 дней в миллисекундах
  const dateNow = new Date(Date.now() - sevenDays);
  const yearNow = dateNow.getFullYear();
  const monthNow = dateNow.getMonth() + 1;
  const dayNow = dateNow.getDate();

  return `${yearNow}-${monthNow}-${dayNow}`;
}

export { dateNowHandler, dateWeekAgoHandler };
