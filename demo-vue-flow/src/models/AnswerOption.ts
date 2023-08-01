export class AnswerOption {
    id: number
    value: string
    pushTo?: string
    edgeId?: string
    constructor(id: number, value: string = '') {
        this.id = id
        this.value = value
    }
}