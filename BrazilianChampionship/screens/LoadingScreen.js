import AnimatedLottieView from 'lottie-react-native';
import { View } from 'react-native';

export default function LoadingScreen({}) {
    
    return <View>
        <AnimatedLottieView source={require('../imgs/soccer-loading.json')}
            autoPlay={true}
            loop={true}/>
    </View>
}