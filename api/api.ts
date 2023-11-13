import axios from 'axios'
import { ISurvey } from '../types/survey.type'

export const getQuiz = (): Promise<ISurvey | void> => {
  return axios.get<ISurvey>(
    'https://gist.githubusercontent.com/lischetti-lorenzo/3ce32d5082d3441eafa5cd8eb984cab2/raw/d32783c34e2c72809c7386e0d71413d32caeb26c/survey.json', {
    headers: {
      accept: 'application/json'
    }
  })
    .then(res => res.data)
    .catch(err => console.error(err))
}
