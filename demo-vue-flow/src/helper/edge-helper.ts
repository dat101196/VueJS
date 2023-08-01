import type { AnswerOption } from "@/models/AnswerOption";
import type { QuestionAnswer } from "@/models/QuestionAnswer";
import { MarkerType, type GraphNode } from "@vue-flow/core";

export function createOptionEdge(soureNode: GraphNode, targetNode: string, question: QuestionAnswer, answer: AnswerOption) {
    return {
        id: `e${soureNode.id}-${targetNode}-q${question.id}-a${answer.id}`,
        label: `${question.question}\n${answer.value}`,
        source: soureNode.id,
        target: targetNode,
        markerEnd: MarkerType.ArrowClosed,
    }
}