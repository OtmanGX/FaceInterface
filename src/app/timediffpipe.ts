import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeDiff'
})
export class TimeDiffPipe implements PipeTransform {

    transform(value: any, args?: any): any {

        if (value) {
            let expiryDate = +new Date(value)
            let now = +new Date()
            let seconds = (expiryDate - now) / 1000; // expiry Date - current time
            let sign = Math.sign(seconds)
            let suffix = "left" // if the time is yet to come.
            if(sign === -1 ){
                seconds = Math.floor(seconds*sign) // removign the sign and the float part -25.5  = 25 seconds
                suffix = "passé" // if time is already expired.
            }
            const intervals = {
                'année': 31536000,
                'mois': 2592000,
                'semaine': 604800,
                'jour': 86400,
                'heure': 3600,
                'minute': 60,
                'seconde': 1
            };
            const allInterval = ['année', 'mois','semaine','jour', 'heure', 'minute', 'seconde'];
            let counter;
            for (let i of allInterval) {
                counter = Math.floor(seconds / intervals[i]);
                let toReturn: string = ""
                // calculateion shown for for 2hour:51 minute = 171 minute = 10260 second
                if (counter > 0) {
                    toReturn += this.calculateTime(counter, i);  // this will give 2 hours
                    let timeLeft = seconds - counter * intervals[i] // 3060 second
                    let index = allInterval.indexOf(i)+1 // get the index of next unit
                    i = allInterval[index]; // value of next unit = minute
                    if(index > 6 ){
                        return toReturn+ suffix // second ago for boundary case
                    }
                    counter = Math.floor(timeLeft / intervals[i]);  // 3060 second = 51
                    toReturn= toReturn + " "+this.calculateTime(counter, i) + " " + suffix; // will calculate "2 hours 51 Minutes" from current time
                    return toReturn;
                }

            }
        }
        return value;
    }

    calculateTime(counter : number, timeUnit : string ){
        if (counter === 1) {
            return counter + ' ' +timeUnit; // singular (1 hours ago)
        } else {

            let toReturn = counter + ' ' + timeUnit + 's ';
            return toReturn; // plural (2 hours ago)
        }

    }
}
