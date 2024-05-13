import moment, { Moment } from 'moment';

export function generateCurrentDateTime() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    // Will display in 2022-12-13
    const formattedToday = yyyy + '-' + mm + '-' + dd;

    // get current time
    let unix_timestamp = Date.now();
    var time = new Date(unix_timestamp);
    var hours = time.getHours();
    var minutes = '0' + time.getMinutes();
    var seconds = '0' + time.getSeconds();

    // Will display in 2022-12-13_10-30-23 format
    const output =
    formattedToday +
    '_' +
    hours +
    '-' +
    minutes.substr(-2) +
    '-' +
    seconds.substr(-2);

    return output;
}

export function getShiftCurrentDateTime() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const formattedToday = dd + '/' + mm; // -> 20/12
    const localTime = today.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' }); // -> "11:28 AM"
    const shiftDateTime = formattedToday + ' ' + localTime;
    return shiftDateTime;
}

export function reformatCurrentDateTime(date: Moment | Date, format: string) {
    return `${moment(date).format(format)}`;
}

export function getDayOfWeek(date: number) {
    let week = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
        default: 'Wrong day',
    };
    return week[date] || week['default'];
}

export const getDateTimeFromOnlineStoreFormInput = (
    date: string,
    time: string
): Date => {
    const todayString = ' (Today)';
    if (date.includes(todayString)) {
        date = date.replace(todayString, '');
    }

    date = `${date} ${new Date().getFullYear()}`;
    time = time.replace('ASAP(', '');
    time = time.replace(')', '');

    return new Date(`${date} ${time}`);
};

/**
 * Adds a leading zero to a number if it is less than 10
 */
export const prefixZero = (n: number): string => (n < 9 ? `0${n}` : `${n}`);

/**
 * Formats a timestamp as a relative age string
 */
export const getAgeFormat = (input: number): string => {
    if (input === 0) {
        return '--';
    }
    const diffDays = moment().diff(moment(input), 'days');
    if (diffDays >= 2) {
        return `${diffDays}d`;
    }
    const diffMinutes = moment().diff(moment(input), 'minutes');
    const hours = diffMinutes / 60;
    const roundHours = Math.floor(hours);
    const minutes = (hours - roundHours) * 60;
    const roundMinutes = Math.round(minutes);
    return `${prefixZero(roundHours)}:${prefixZero(roundMinutes)}`;

};

export function getDeviceTimeZone(){
    let date = new Date();
    return date.getTimezoneOffset();
}
