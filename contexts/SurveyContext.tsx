import { createContext } from 'react';
import { ISurveyContextType } from '../types/survey-context.type';

export const SurveyContext = createContext<ISurveyContextType>({} as ISurveyContextType);
