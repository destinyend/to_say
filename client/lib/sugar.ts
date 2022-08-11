import {field} from "../const";

export const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min


export function zfill(string, length = 2) {
    let new_str = String(string)
    while (new_str.length < length) new_str = '0' + new_str
    return new_str
}


export class EDate extends Date {
    constructor(...options: (string | number | Date)[]) {
        if (typeof options[0] === 'string' && options[0].length < 9) super('2000-01-01T' + options[0])
        else { // @ts-ignore
            super(...options);
        }
    }

    copy() {
        return new EDate(
            this.getFullYear(),
            this.getMonth(),
            this.getDate(),
            this.getHours(),
            this.getMinutes(),
            this.getSeconds(),
            this.getMilliseconds()
        )
    }

    isoDate() {
        let month = String(this.getMonth() + 1)
        let day = String(this.getDate())
        return this.getFullYear() + '-' + zfill(month) + '-' + zfill(day)
    }

    isoTime(seconds = true) {
        if (seconds) return zfill(this.getHours()) + ':' + zfill(this.getMonth()) + ':' + zfill(this.getSeconds())
        return zfill(this.getHours()) + ':' + zfill(this.getMonth())
    }

    isoDatetime() {
        return this.isoDate() + ' ' + this.isoTime()
    }

    ruDate(full = true) {
        let month = String(this.getMonth() + 1)
        let day = String(this.getDate())
        if (full) return zfill(day) + '.' + zfill(month) + '.' + this.getFullYear()
        return zfill(day) + '.' + zfill(month)
    }

    ruDateTime(full = true) {
        return this.ruDate(full) + ' ' + this.isoTime(full)
    }

    weekDay(short = false) {
        if (short) {
            switch (this.getDay()) {
                case 1:
                    return 'ПН'
                case 2:
                    return 'ВТ'
                case 3:
                    return 'СР'
                case 4:
                    return 'ЧТ'
                case 5:
                    return 'ПТ'
                case 6:
                    return 'СБ'
                case 0:
                    return 'ВС'
            }
        }
        switch (this.getDay()) {
            case 1:
                return 'понедельник'
            case 2:
                return 'вторник'
            case 3:
                return 'среда'
            case 4:
                return 'четверг'
            case 5:
                return 'пятница'
            case 6:
                return 'суббота'
            case 0:
                return 'воскресенье'
        }
    }

    change({days = 0, hours = 0, minutes = 0, seconds = 0}) {
        let delta = days * 86400000 || 0
        delta += hours * 3600000 || 0
        delta += minutes * 60000 || 0
        delta += seconds * 1000 || 0
        this.setTime(this.getTime() + delta)
        return this
    }

    monthName() {
        switch (this.getMonth()) {
            case 0:
                return 'январь'
            case 1:
                return 'февраль'
            case 2:
                return 'март'
            case 3:
                return 'апрель'
            case 4:
                return 'май'
            case 5:
                return 'июнь'
            case 6:
                return 'июль'
            case 7:
                return 'август'
            case 8:
                return 'сентябрь'
            case 9:
                return 'октябрь'
            case 10:
                return 'ноябрь'
            case 11:
                return 'декабрь'
        }
    }
}

export function replaceAll(string, what, to) {
    while (string.includes(what)) string.replace(what, to)
    return string
}

export function formatPhone(string) {
    let phone = string
    if (phone[0] === '+') phone = phone.slice(1, phone.length)
    phone = replaceAll(phone, ' ', '')
    phone = replaceAll(phone, '(', '')
    phone = replaceAll(phone, ')', '')
    if (phone.length === 11 && +phone) {
        if (phone[0] === '8') phone = '7' + phone.slice(1, phone.length)
        return phone
    }
}

export function asObject(field, value) {
    let obj = {}
    obj[field] = value
    return obj
}

export function isPhoneCorrect(phone) {
    try {
        let value = String(+phone.replace(/[^0-9]/g, ''))
        if (!Boolean(value)) return
        if (value.length === 11) value = '7' + value.slice(1)
        if (value.length === 10) value = '7' + value
        if (value.length !== 11) return
        return value
    } catch (e) {
        return null
    }
}

export function isEmailCorrect(email) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export function arrayToDict(array, key = 'id') {
    let dict = {}
    for (let item of array) dict[item[key]] = item
    return dict
}

export function getWidth(style, offset = 0) {
    return style && style.width ?
        {width: style.width - offset, maxWidth: style.width - offset, minWidth: style.width - offset}
        :
        {width: field.width - offset, maxWidth: field.maxWidth - offset, minWidth: field.minWidth - offset}
}

export function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export function isString(value) {
    return typeof value === 'string'
}

export function isNumber(value) {
    return typeof value === 'number'
}

export function isBoolean(value) {
    if (['0', '1', 0, 1].includes(value)) return true
    return typeof value === 'boolean'
}

export function raise(str: string): never {
    throw `>>>>>>>>>>>>>>> ${str} <<<<<<<<<<<<<<<`
}

export function isArray(value) {
    return Array.isArray(value)
}

export function isNumeric(str) {
    return !!str.match(/^\d+$/)
}

export function isUndefined(value) {
    return typeof value === 'undefined'
}

export function isDate(value) {
    return value instanceof EDate
}

export function isNull(value) {
    return value === null
}

export function stringToCamelCase(value: string) {
    const parts = value.split('_')
    let str = ''
    for (let i = 0; i < parts.length; i++) {
        if (i) str += capitalize(parts[i])
        else str += parts[i]
    }
    return str
}

export function toCamelCase(obj: object): object {
    let args = {}
    for (let key in obj) {
        args[stringToCamelCase(key)] = obj[key]
    }
    return args
}

export function getObjectIndex(array, id) {
    if (!array) return -1
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) return i
    }
    return -1
}

