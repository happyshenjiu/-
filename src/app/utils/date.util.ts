import { isDate, isValid,  isFuture, differenceInYears, parse, format} from 'date-fns';

export const isValiDate = (val: string): boolean => {
    const date = parse(val);
     return isDate(date) 
     && isValid(date) 
     && !isFuture(date) 
     && differenceInYears(Date.now(), date) < 150
}
