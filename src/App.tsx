import React, { useState } from 'react';
import FormHeader from './components/FormHeader';
import SkipSelection from './components/SkipSelection';
import { FormState } from './types/form';

function App() {
  const [formState, setFormState] = useState<FormState>({
    currentStep: 'select-skip',
    completedSteps: ['postcode', 'waste-type'], // Simulating that previous steps are completed
    selectedSkipId: null,
  });

  const handleStepClick = (stepId: string) => {
    // Only allow navigation to completed steps or the next available step
    const stepOrder = ['postcode', 'waste-type', 'select-skip', 'permit-check', 'choose-date', 'payment'];
    const currentIndex = stepOrder.indexOf(formState.currentStep);
    const targetIndex = stepOrder.indexOf(stepId);
    
    // Allow clicking on completed steps or the current step
    if (formState.completedSteps.includes(stepId) || stepId === formState.currentStep) {
      setFormState(prev => ({
        ...prev,
        currentStep: stepId,
      }));
    }
  };

  const handleSkipSelect = (skipId: number) => {
    setFormState(prev => ({
      ...prev,
      selectedSkipId: prev.selectedSkipId === skipId ? null : skipId,
    }));
  };

  const handleContinue = () => {
    if (formState.selectedSkipId) {
      const stepOrder = ['postcode', 'waste-type', 'select-skip', 'permit-check', 'choose-date', 'payment'];
      const currentIndex = stepOrder.indexOf(formState.currentStep);
      const nextStep = stepOrder[currentIndex + 1];
      
      if (nextStep) {
        setFormState(prev => ({
          ...prev,
          currentStep: nextStep,
          completedSteps: [...prev.completedSteps, prev.currentStep],
        }));
      }
    }
  };

  const renderCurrentStep = () => {
    switch (formState.currentStep) {
      case 'postcode':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Enter Your Postcode</h2>
              <p className="text-gray-600">This step is already completed in this demo.</p>
            </div>
          </div>
        );
      case 'waste-type':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Select Waste Type</h2>
              <p className="text-gray-600">This step is already completed in this demo.</p>
            </div>
          </div>
        );
      case 'select-skip':
        return <SkipSelection selectedSkipId={formState.selectedSkipId} onSkipSelect={handleSkipSelect} />;
      case 'permit-check':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Permit Check</h2>
              <p className="text-gray-600">Checking if you need a permit for skip placement...</p>
            </div>
          </div>
        );
      case 'choose-date':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Choose Delivery Date</h2>
              <p className="text-gray-600">Select your preferred delivery and collection dates...</p>
            </div>
          </div>
        );
      case 'payment':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Payment</h2>
              <p className="text-gray-600">Complete your booking with secure payment...</p>
            </div>
          </div>
        );
      default:
        return <SkipSelection selectedSkipId={formState.selectedSkipId} onSkipSelect={handleSkipSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FormHeader 
        currentStep={formState.currentStep}
        completedSteps={formState.completedSteps}
        onStepClick={handleStepClick}
      />
      
      {renderCurrentStep()}
      
      {/* Continue Button - Only show on skip selection when a skip is selected */}
      {formState.currentStep === 'select-skip' && formState.selectedSkipId && (
        <div className="fixed bottom-6 right-6">
          <button
            onClick={handleContinue}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            Continue to Permit Check
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;