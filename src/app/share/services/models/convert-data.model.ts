export interface DataSender {
    number: number;
    type: string;
    roman: string;
}

export interface DataReceiver {
    romanNumeral: string;
    number: number;
    hasError: boolean;
    errorMessages: any;
}