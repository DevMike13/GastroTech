import React, { useState } from 'react';
import { View } from 'react-native';

import StepOne from './steps/StepOne/StepOne';
import StepTwo from './steps/StepTwo/StepTwo';
import StepThree from './steps/StepThree/StepThree';
import StepFour from './steps/StepFour/StepFour';
import StepFive from './steps/StepFive/StepFive';
import StepSix from './steps/StepSix/StepSix';

const Stepper = ({ navigation }) => {

    const [step, setStep] = useState(1);
  return (
    <View>
      {step === 1 && <StepOne setStep={setStep} navigation={navigation}/>}
      {step === 2 && <StepTwo setStep={setStep} navigation={navigation}/>}
      {step === 3 && <StepThree setStep={setStep} navigation={navigation}/>}
      {step === 4 && <StepFour setStep={setStep} navigation={navigation} />}
      {step === 5 && <StepFive setStep={setStep} navigation={navigation} />}
      {step === 6 && <StepSix setStep={setStep} navigation={navigation} />}
    </View>
  )
}

export default Stepper