import { Answer } from './Answer'

export class QuestionAnswer {
    question: string
    answer: Answer
    constructor(question: string, answer: Answer) {
        this.question = question
        this.answer = answer
    }
}