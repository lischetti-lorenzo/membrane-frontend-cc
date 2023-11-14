export interface ISurveyContextType {
  currentQuestionIndex: number
  setCurrentQuestionIndex: (index: number) => void
  timeIsUp: boolean
  setTimeIsUp: (value: boolean) => void
  answersIds: Array<number>
  setAnswersIds: (value: Array<number>) => void
  currentAnswerId: string | null
  setCurrentAnswerId: (value: string | null) => void
}
