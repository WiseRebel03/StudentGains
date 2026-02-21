import React from 'react';
import './StepIndicator.css';

const StepIndicator = ({ currentStep, totalSteps, labels }) => (
    <div className="step-indicator">
        {Array.from({ length: totalSteps }, (_, i) => {
            const step = i + 1;
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;
            return (
                <React.Fragment key={step}>
                    <div className={`step-item ${isCompleted ? 'step-completed' : ''} ${isCurrent ? 'step-current' : ''}`}>
                        <div className="step-circle">
                            {isCompleted ? '✓' : step}
                        </div>
                        {labels?.[i] && (
                            <span className="step-label">{labels[i]}</span>
                        )}
                    </div>
                    {step < totalSteps && (
                        <div className={`step-line ${isCompleted ? 'step-line-completed' : ''}`} />
                    )}
                </React.Fragment>
            );
        })}
    </div>
);

export default StepIndicator;
