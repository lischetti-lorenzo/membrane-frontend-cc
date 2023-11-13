interface IOption {
  text: string
}

interface IQuestion {
  text: string
  image: string
  lifetimeSeconds: number
  options: Array<IOption>
}

export interface ISurvey {
  title: string
  image: string
  questions: Array<IQuestion>
}
