import AnimatedLottieView from 'lottie-react-native';

export default function LoadingScreen({}) {
    
    return <AnimatedLottieView source={require('../imgs/soccer-loading.json')}
            autoPlay={true}
            loop={true}/>
}