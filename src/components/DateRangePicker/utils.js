// eslint-disable-next-line import/prefer-default-export
export const isDateValid = date => {
  return date instanceof Date && !Number.isNaN(date.getTime());
};

export const monthNameToNumberObject = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11
};

const formatMap = {
  dd: day => (day ? day.toString().padStart(2, '0') : ''),
  Do: {
    1: '1st',
    2: '2nd',
    3: '3rd',
    4: '4th',
    5: '5th',
    6: '6th',
    7: '7th',
    8: '8th',
    9: '9th',
    10: '10th',
    11: '11th',
    12: '12th',
    13: '13th',
    14: '14th',
    15: '15th',
    16: '16th',
    17: '17th',
    18: '18th',
    19: '19th',
    20: '20th',
    21: '21st',
    22: '22nd',
    23: '23rd',
    24: '24th',
    25: '25th',
    26: '26th',
    27: '27th',
    28: '28th',
    29: '29th',
    30: '30th',
    31: '31st'
  },
  MMM: {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
  },
  hh: hours =>
    hours <= 12
      ? String(hours).padStart(2, '0')
      : String(hours - 12).padStart(2, '0'), // only do this when hours > 12
  mm: minutes => String(minutes).padStart(2, '0'),
  a: hours => {
    if (hours - 12 >= 0) return 'pm';
    return 'am';
  },
  yy: year => year.toString().substr(-2)
};

export const formatDate = (date, format) => {
  try {
    const formattedDate = format.split('$').map(identifier => {
      if (identifier && Object.keys(formatMap).includes(identifier)) {
        switch (identifier) {
          case 'dd':
            return formatMap.dd(date.getDate());
          case 'Do':
            return formatMap.Do[date.getDate()];
          case 'MMM':
            return formatMap.MMM[date.getMonth() + 1]; // getMonth is zero based
          case 'hh':
            return formatMap.hh(date.getHours());
          case 'mm':
            return formatMap.mm(date.getMinutes());
          case 'a':
            return formatMap.a(date.getHours());
          case 'yy':
            return formatMap.yy(date.getFullYear());
          case 'MM':
            return formatMap.MM(date.getMonth() + 1);
          default:
            return identifier;
        }
      }
      return identifier;
    });
    return formattedDate.join('');
  } catch (e) {
    return 'INVALID_DATE';
  }
};

export const isCheckDateFormatRegex = (dateFormatString, formatType) => {
  let regexSelected = null;
  switch (formatType) {
    case 'dd/mm/yyyy':
      regexSelected = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
      break;
    case 'dd MMM yyyy':
      regexSelected = /^(\d{2})\s([j,J]an||[f,F]eb||[M,m]ar||[A,a]pr||[M,m]ay||[j,J]un||[j,J]ul||[A,a]ug||[s,S]ep||[O,o]ct||[N,n]ov||[d,D]ec)\s(\d{4})$/;
      break;
    default:
      regexSelected = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
      break;
  }
  return regexSelected.test(dateFormatString);
};
