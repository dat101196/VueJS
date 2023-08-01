import { Answer } from './Answer'

export class QuestionAnswer {
    id: number
    question: string
    answer: Answer
    constructor(id: number, question: string, answer: Answer) {
        this.id = id
        this.question = question
        this.answer = answer
    }
}