export const daysInWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const hoursMinutesArray = [
  ...Array(24 * 4)
    .fill(0)
    .map((_, i) => {
      return ('0' + ~~(i / 4) + ': 0' + 60 * ((i / 4) % 1)).replace(
        /\d(\d\d)/g,
        '$1',
      );
    }),
  '23:59',
];

export const userNameRE = /^[A-Za-z0-9]+$/i;
export const emailRE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const passwordRE =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Z\d@$!%*#?&]{8,}$/i;
export const cvvRE= /^[^\s]{4}$/i;

export const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

export const years = [
  '2023',
  '2024',
  '2025',
  '2026',
  '2027',
  '2028',
  '2029',
  '2030',
  '2031',
  '2032',
  '2033',
  '2034',
];

export const billingAmount = ['$100', '$250', '$500', '$700', '$1000'];
