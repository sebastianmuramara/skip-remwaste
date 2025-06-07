import React from 'react';
import { 
  MapPin, 
  Trash2, 
  Truck, 
  FileCheck, 
  Calendar, 
  CreditCard,
  ChevronRight
} from 'lucide-react';
import { FormStep } from '../types/form';

interface FormHeaderProps {
  currentStep: string;
  completedSteps: string[];
  onStepClick: (stepId: string) => void;
}

const steps: FormStep[] = [
  { id: 'postcode', name: 'Postcode', icon: 'MapPin', completed: false, active: false, clickable: false },
  { id: 'waste-type', name: 'Waste Type', icon: 'Trash2', completed: false, active: false, clickable: false },
  { id: 'select-skip', name: 'Select Skip', icon: 'Truck', completed: false, active: false, clickable: false },
  { id: 'permit-check', name: 'Permit Check', icon: 'FileCheck', completed: false, active: false, clickable: false },
  { id: 'choose-date', name: 'Choose Date', icon: 'Calendar', completed: false, active: false, clickable: false },
  { id: 'payment', name: 'Payment', icon: 'CreditCard', completed: false, active: false, clickable: false },
];

const iconComponents = {
  MapPin,
  Trash2,
  Truck,
  FileCheck,
  Calendar,
  CreditCard,
};

export default function FormHeader({ currentStep, completedSteps, onStepClick }: FormHeaderProps) {
  const getStepState = (step: FormStep, index: number) => {
    const isCompleted = completedSteps.includes(step.id);
    const isActive = currentStep === step.id;
    const isClickable = isCompleted || completedSteps.length >= index;
    
    return {
      ...step,
      completed: isCompleted,
      active: isActive,
      clickable: isClickable,
    };
  };

  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between overflow-x-auto">
          {steps.map((step, index) => {
            const stepState = getStepState(step, index);
            const IconComponent = iconComponents[step.icon as keyof typeof iconComponents];
            const isLastStep = index === steps.length - 1;
            
            return (
              <React.Fragment key={step.id}>
                {/* Step */}
                <div 
                  className={`flex items-center space-x-3 cursor-pointer transition-all duration-200 px-3 py-2 rounded-lg min-w-max ${
                    stepState.clickable 
                      ? 'hover:bg-gray-50' 
                      : 'cursor-not-allowed opacity-50'
                  }`}
                  onClick={() => stepState.clickable && onStepClick(step.id)}
                >
                  {/* Icon Circle */}
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                    stepState.completed
                      ? 'bg-green-500 border-green-500 text-white'
                      : stepState.active
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : stepState.clickable
                      ? 'border-gray-300 text-gray-400 hover:border-gray-400'
                      : 'border-gray-200 text-gray-300'
                  }`}>
                    {stepState.completed ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <IconComponent className="w-5 h-5" />
                    )}
                  </div>
                  
                  {/* Step Name */}
                  <span className={`font-medium text-sm transition-colors duration-200 ${
                    stepState.active
                      ? 'text-blue-600'
                      : stepState.completed
                      ? 'text-green-600'
                      : stepState.clickable
                      ? 'text-gray-700 hover:text-gray-900'
                      : 'text-gray-400'
                  }`}>
                    {step.name}
                  </span>
                </div>

                {/* Connector Line */}
                {!isLastStep && (
                  <div className="flex items-center px-2">
                    <div className={`h-0.5 w-8 transition-colors duration-200 ${
                      completedSteps.includes(steps[index + 1].id) || completedSteps.includes(step.id)
                        ? 'bg-green-400'
                        : 'bg-gray-200'
                    }`} />
                    <ChevronRight className={`w-4 h-4 mx-1 transition-colors duration-200 ${
                      completedSteps.includes(steps[index + 1].id) || completedSteps.includes(step.id)
                        ? 'text-green-400'
                        : 'text-gray-300'
                    }`} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}