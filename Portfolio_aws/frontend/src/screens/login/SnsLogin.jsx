import {useEffect} from 'react';
import {View} from 'react-native';
import {Button, Chip} from 'react-native-paper';
import ScreenWrapper from '../../commons/utils/ScreenWapper';
import Color from '../../commons/style/Color';
import {useMutation} from 'react-query';
import {googleLogin} from '../../api/login';
import {useNavigation} from '@react-navigation/core';
import useInform from '../../commons/hooks/useInform';
import {GoogleSignin} from '@react-native-community/google-signin';

const SnsLogin = () => {
  const navigation = useNavigation();
  const inform = useInform();

  const {mutate: mutateGoogleLogin} = useMutation(googleLogin, {
    onSuccess: data => {
      console.log('mutateGoogleLogin >>> onSuccess >>> data---------', data);
      navigation.navigate('MainTab');
    },
    onError: error => {
      console.log('mutateGoogleLogin >>> onError >>> error---------', error);
      inform({
        title: '오류',
        message: '구글 로그인 실패',
      });
    },
  });

  useEffect(() => {
    console.log('GoogleSignin 초기화!!!!!!!!');

    // GoogleSignin 초기화
    GoogleSignin.configure({
      scopes: ['profile', 'email'],
      webClientId: '',
      packageName: 'polaris.portfolio.frontend.dev',
      offlineAccess: true,
      //offlineAccess 속성은 액세스 토큰과 함께 리프레시 토큰을 받을 수 있도록 설정합니다.
      //이를 통해 사용자가 Google 계정으로 로그인한 후에도 서비스에 대한 권한을 유지할 수 있습니다.
      //오프라인 액세스 권한이 부여되면, 앱이 사용자의 Google 계정에서 액세스 토큰을 받은 후에도 새로운 액세스 토큰을 얻을 수 있습니다.
      //이를 통해 사용자가 앱을 사용하지 않을 때에도 앱이 사용자 데이터에 액세스할 수 있습니다.
    });
  }, []);

  const onPressGooleLogin = async () => {
    //mutateGoogleLogin();
    /*
    GoogleSignIn.configure(options): GoogleSignIn을 구성합니다. options 매개 변수는 webClientId, offlineAccess, hostedDomain, forceCodeForRefreshToken, accountName 등의 구성 옵션을 설정할 수 있습니다
    GoogleSignIn.signIn(): 사용자가 Google 계정으로 로그인하도록 요청합니다.
    GoogleSignIn.signOut(): 사용자를 Google 계정에서 로그아웃합니다.
    GoogleSignIn.disconnect(): 사용자의 Google 계정과의 연결을 끊습니다.
    GoogleSignIn.isSignedIn(): 사용자가 현재 Google 계정으로 로그인되어 있는지 확인합니다.
    GoogleSignIn.getCurrentUser(): 현재 로그인된 사용자 정보를 가져옵니다.
    GoogleSignIn.hasPermissions(scopes): 사용자가 지정된 스코프에 대한 권한을 가지고 있는지 확인합니다.
    GoogleSignIn.requestPermissions(scopes): 사용자로부터 지정된 스코프에 대한 권한을 요청합니다.
    GoogleSignIn.getTokens(): 사용자의 액세스 토큰과 리프레시 토큰을 가져옵니다.
    GoogleSignIn.clearCachedToken(token): 지정된 토큰을 캐시에서 지웁니다.
    GoogleSignIn.disconnectWithCredential(credential): 지정된 자격 증명을 사용하여 사용자의 Google 계정과의 연결을 끊습니다.
    GoogleSignIn.signInSilently(): 이전에 로그인된 사용자로 자동으로 로그인합니다.
    GoogleSignIn.getTokensSilently(): 이전에 로그인된 사용자의 액세스 토큰과 리프레시 토큰을 자동으로 가져옵니다.
    GoogleSignIn.revokeAccess(): Google 계정과의 연결만 끊고, 로그아웃 및 액세스 토큰 폐기는 수동으로 처리해야 합니다.
    이 함수는 GoogleSignIn.disconnect() 함수와 유사합니다. 그러나 disconnect() 함수는 현재 로그인된 사용자의 Google 계정과의 연결을 끊을 뿐만 아니라, 
    로그아웃 및 액세스 토큰을 폐기합니다.
    */
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      navigation.navigate('MainTab');
    } catch (error) {
      inform({
        title: '오류',
        message: '구글 로그인 실패',
      });
    }
    /*
    로그인 성공시 데이터 const userInfo = await GoogleSignin.signIn();
    {
      "idToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg2OTY5YWVjMzdhNzc4MGYxODgwNzg3NzU5M2JiYmY4Y2Y1ZGU1Y2UiLCJ0eXAiOiJKV1QifQ.
      eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NjgwODgzNzg5MzktamswczFndGw1YW00MmlxazNxbzI0cHUzaTVldmVkbTYuY
      XBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NjgwODgzNzg5MzktZmwxc3U1azE4aGJwdWMyNGh1NGY5cDA1NXNwaWYzc3MuYXBwc
      y5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDYzMTcxOTQzMDAwMzQwODUwMDUiLCJlbWFpbCI6Imh1amlpMDcxMUBnbWFpbC5j
      b20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Iuq5gO2YleykgCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2
      VyY29udGVudC5jb20vYS9BR05teXhZcENlck1LYjNEWVlVOTdEMzBJaUNhNEJXeWxjZW1qeHFqM19qVj1zOTYtYyIsImdpdmVuX25hbWUiOiLtmJX
      spIAiLCJmYW1pbHlfbmFtZSI6Iuq5gCIsImxvY2FsZSI6ImtvIiwiaWF0IjoxNjgxOTczNzI3LCJleHAiOjE2ODE5NzczMjd9.buTLchmFOYsPxHQeeEkJYr
      cMiFTVxtD6LhEsdkC6CFpfgUc1mBH2RQV444YMFHFOIUccyov8tCZJrip46L3RBF6yuHggFAoNRczNMtlaEHnVzqr5BaTdPAL3jixWj5ERmaSUB_lE-XPu9ZKo
      MCIM0HhBwLSluyUmPNm_oDKNXrWGxJywISti1f6aAH25Bd0bMLKFHiVhP6TlRy2sLXct9sPqd7PyFglcCi7DGOJUSNxAR0xS2Bq-nvMsO5UQpgxdpGAKmeCd4YFI
      YJxDHgBktNwIddZ8EUJqtPkUKoLuMuAHtsmOLIF7iyrQyBYtl4p7mZa3fW6qVumPERWkUwHYEg",
      "scopes":[
         "https://www.googleapis.com/auth/userinfo.profile",
         "https://www.googleapis.com/auth/userinfo.email"
      ],
      "serverAuthCode":"4/0AVHEtk48kwR1F2UOqce7R1YWNpLbJn_aFHm904pISuiMCuJSVQsc0oElt-HBk36DYd4k5Q",
      "user":{
         "email":"hujii0711@gmail.com",
         "familyName":"김",
         "givenName":"형준",
         "id":"106317194300034085005",
         "name":"김형준",
         "photo":"https://lh3.googleusercontent.com/a/AGNmyxD30IiCa4BWylcemjxqj3_jV=s96-c"
      }
    }*/
  };

  /*signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };*/

  return (
    <ScreenWrapper>
      <View style={{flex: 1}}>
        <View
          style={{
            padding: 20,
          }}>
          <Chip
            style={{backgroundColor: '#ffffff'}}
            textStyle={{fontSize: 12}}
            icon="transit-connection-variant"
            onPress={() => console.log('Pressed')}>
            간편계정으로 시작하기
          </Chip>
          <Button
            mode="contained"
            onPress={() => console.log('Pressed')}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              backgroundColor: '#ffcf00',
              marginVertical: 7,
            }}
            labelStyle={{fontWeight: 'bold', fontSize: 15}}>
            카카오톡 계정으로 시작하기
          </Button>
          <Button
            mode="contained"
            onPress={() => console.log('Pressed')}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              backgroundColor: '#40c500',
              marginVertical: 7,
            }}
            labelStyle={{fontWeight: 'bold', fontSize: 15}}>
            네이버 계정으로 시작하기
          </Button>
          <Button
            mode="contained"
            onPress={onPressGooleLogin}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              backgroundColor: '#0051ff',
              marginVertical: 7,
            }}
            labelStyle={{fontWeight: 'bold', fontSize: 15}}>
            구글 계정으로 시작하기
          </Button>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SnsLogin;
