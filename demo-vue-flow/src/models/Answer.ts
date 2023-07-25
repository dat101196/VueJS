import { AnswerType } from "./Enums";
import { AnswerOption } from "./AnswerOption";
export const AnswerTypeList = Object.values(AnswerType);
export class Answer {
    type: AnswerType
    listAnswer: AnswerOption[]
    constructor(type: AnswerType, listAnswer: AnswerOption[] = []){
        this.type = type
        this.listAnswer = listAnswer
    }
}

