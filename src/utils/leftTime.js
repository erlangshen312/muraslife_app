import moment from 'moment';

export const timeLeft = (item) => {
  const currentDayTime = moment().format('YYYY-MM-DDTHH:mm:ss');
  const finishDayTime = moment(item.timer).format('YYYY-MM-DDTHH:mm:ss');
  const ms = moment(currentDayTime, 'YYYY-MM-DDTHH:mm:ss').diff(
    moment(finishDayTime, 'YYYY-MM-DDTHH:mm:ss'),
  );
  const isLeft = moment(currentDayTime).isBefore(finishDayTime);
  return { hoursLeft, isLeft };
};
