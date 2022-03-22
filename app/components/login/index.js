import { NativeModules } from "react-native";
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import auth from "@react-native-firebase/auth";
const { RNTwitterSignIn } = NativeModules;

//push this to evn when done
const KEY = "xRsQZKHUUYfryxoAcXEYoNu51";
const SECRET = "bqjVaF9lpfo2qfwvgEo95ZjRbC0QfSKN7yHRa92kFO8FA4X5DF";

//Twitter Signin Initialization
RNTwitterSignIn.init(KEY, SECRET).then(() =>
	console.log("Twitter SDK Success")
).catch(err => console.log(err));

//Google Sign Initialization
GoogleSignin.configure({
    webClientId:'47563389294-8dv1nvulocctv6cki54a1udl434svepg.apps.googleusercontent.com'
})
export async function onTwitterButtonPress() {
	//performing login request
	const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();

	const twitterCredential = auth.TwitterAuthProvider.credential(
		authToken,
		authTokenSecret
	);
	return auth().signInWithCredential(twitterCredential);
}

export async function onGoogleButtonPress(){
    const {idToken} = await GoogleSignin.signIn();
	
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    
    return auth().signInWithCredential(googleCredential)
}
