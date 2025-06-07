export interface FormStep {
  id: string;
  name: string;
  icon: string;
  completed: boolean;
  active: boolean;
  clickable: boolean;
}

export interface FormState {
  currentStep: string;
  completedSteps: string[];
  selectedSkipId: number | null;
}