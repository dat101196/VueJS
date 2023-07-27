export class AnswerOption {
    id: number
    value: string
    pushTo?: string
    constructor(id: number, value: string = '', pushTo?: string) {
        this.id = id
        this.value = value
        this.pushTo = pushTo
    }
}