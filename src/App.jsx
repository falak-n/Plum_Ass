import { useState } from 'react';
import Screen1Input from './components/Screen1Input';
import Screen2Classification from './components/Screen2Classification';
import Screen3Benefits from './components/Screen3Benefits';
import Screen4ActionPlan from './components/Screen4ActionPlan';

function App() {
  
  const [currentScreen, setCurrentScreen] = useState('input');
  const [userInput, setUserInput] = useState('');
  const [category, setCategory] = useState(null);
  const [selectedBenefit, setSelectedBenefit] = useState(null);

  const handleInputSubmit = (input) => {
    setUserInput(input);
    setCurrentScreen('classification');
  };

  const handleClassificationComplete = (classifiedCategory) => {
    setCategory(classifiedCategory);
    setCurrentScreen('benefits');
  };

  const handleBenefitSelect = (benefit) => {
    setSelectedBenefit(benefit);
    setCurrentScreen('actionPlan');
  };

  const handleBack = () => {
    if (currentScreen === 'actionPlan') {
      setCurrentScreen('benefits');
    } else if (currentScreen === 'benefits') {
      setCurrentScreen('classification');
    } else if (currentScreen === 'classification') {
      setCurrentScreen('input');
    }
  };

  const handleRestart = () => {
    setUserInput('');
    setCategory(null);
    setSelectedBenefit(null);
    setCurrentScreen('input');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === 'input' && (
        <Screen1Input onSubmit={handleInputSubmit} />
      )}
      {currentScreen === 'classification' && (
        <Screen2Classification
          userInput={userInput}
          onComplete={handleClassificationComplete}
          onBack={handleBack}
        />
      )}
      {currentScreen === 'benefits' && category && (
        <Screen3Benefits
          category={category}
          onSelect={handleBenefitSelect}
          onBack={handleBack}
        />
      )}
      {currentScreen === 'actionPlan' && selectedBenefit && category && (
        <Screen4ActionPlan
          benefit={selectedBenefit}
          category={category}
          onBack={handleBack}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;

