import React, {useRef, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieComponent from '../../components/LottieComponent/LottieComponent';
import RelaxLottie from '../../assets/lottie/RelaxLottie.json';
import CleanerLottie from '../../assets/lottie/CleanerLottie.json';
import ContactLottie from '../../assets/lottie/ContactLottie2.json';

// components for onboarding buttons
const Skip = ({...props}) => {
  return (
    <TouchableOpacity style={[styles.button, styles.skipButton]} {...props}>
      <Text style={styles.buttonText}>Skip</Text>
    </TouchableOpacity>
  );
};

const Next = ({...props}) => {
  return (
    <TouchableOpacity style={[styles.button, styles.nextButton]} {...props}>
      <Text style={styles.buttonText}>Next</Text>
    </TouchableOpacity>
  );
};

const Done = ({...props}) => {
  return (
    <TouchableOpacity style={[styles.button, styles.doneButton]} {...props}>
      <Text style={styles.buttonText}>Done</Text>
    </TouchableOpacity>
  );
};

const Dots = ({selected}) => {
  const scale = useRef(new Animated.Value(selected ? 1.15 : 1)).current;
  const opacity = useRef(new Animated.Value(selected ? 1 : 0.3)).current;

  useEffect(() => {
    Animated.timing(scale, {
      toValue: selected ? 1.15 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: selected ? 1 : 0.3,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [selected]);

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          transform: [{scale}],
          opacity,
        },
      ]}
    />
  );
};


const OnboardingScreen = ({navigation}) => {
  const {width} = Dimensions.get('window');

  const handleDone = () => {
    navigation.navigate('LoginScreen');
  }

  return (
    <View style={styles.container}>
      <Onboarding
        bottomBarHighlight={false}
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={handleDone}
        onDone={handleDone}
        pages={[
          {
            backgroundColor: '#a7f3d0',
            image: (
              <LottieComponent
                animationData={CleanerLottie}
                width={width * 0.9}
                height={width}
              />
            ),
            title: 'Pick a Service',
            subtitle:
              'Easily find the right service for you, with plenty of options right at your fingertips.',
          },
          {
            backgroundColor: '#edf1f4',
            image: (
              <LottieComponent
                animationData={ContactLottie}
                width={width * 0.9}
                height={width}
              />
            ),
            title: 'Connect with a Provider',
            subtitle:
              'Get in touch with trusted local experts, ready to assist when you need them.',
          },
          {
            backgroundColor: '#fef3c7',
            image: (
              <LottieComponent
                animationData={RelaxLottie}
                width={width * 0.9}
                height={width}
              />
            ),
            title: 'Get Your Work Done',
            subtitle:
              'Sit back and relax while skilled experts efficiently take care of your tasks, ensuring a job well done.',
          },
        ]}
        containerStyles={{width: '100%', height: '100%'}}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#00796b',
  },
  skipButton: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  nextButton: {
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  doneButton: {
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonText: {
    color: '#00796b',
    fontSize: 16,
  },
  dot: {
    width: 6,
    height: 6,
    marginHorizontal: 3,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});
