// import React, {useState} from 'react';
// import {View, Text, KeyboardAvoidingView} from 'react-native';
// import {Avatar, Button, TextInput, Switch} from 'react-native-paper';
// import ScreenWrapper from '../../commons/utils/ScreenWapper';
// import Color from '../../commons/style/Color';
// import useRegister from '../../commons/hooks/useRegister';

// const Register = () => {
//   const [userId, setUserId] = useState('');
//   const [userName, setUserName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const {mutate: mutateRegister} = useRegister();

//   const onPressRegister = () => {
//     mutateRegister({
//       userId,
//       userName,
//       email,
//       password,
//     });
//   };

//   return (
//     <ScreenWrapper>
//       <KeyboardAvoidingView style={{flex: 1}}>
//         <View
//           style={{
//             backgroundColor: '#ffffff',
//             padding: 20,
//           }}>
//           <Avatar.Text
//             size={100}
//             labelStyle={{fontSize: 17}}
//             style={{
//               backgroundColor: '#bc28e4',
//               margin: 10,
//               alignSelf: 'center',
//             }}
//             label="Portfolio"
//           />
//           <TextInput
//             mode="outlined"
//             placeholder="아이디를 입력하세요"
//             selectionColor="#c2c2c2"
//             activeOutlineColor="#919191"
//             outlineColor="#919191"
//             style={{backgroundColor: '#ffffff', fontSize: 12}}
//             value={userId}
//             onChangeText={setUserId}
//           />
//           <TextInput
//             mode="outlined"
//             placeholder="이름을 입력하세요"
//             selectionColor="#c2c2c2"
//             activeOutlineColor="#919191"
//             outlineColor="#919191"
//             style={{backgroundColor: '#ffffff', fontSize: 12}}
//             value={userName}
//             onChangeText={setUserName}
//           />
//           <TextInput
//             mode="outlined"
//             placeholder="이메일을 입력하세요"
//             selectionColor="#c2c2c2"
//             activeOutlineColor="#919191"
//             outlineColor="#919191"
//             style={{backgroundColor: '#ffffff', fontSize: 12}}
//             value={email}
//             onChangeText={setEmail}
//           />
//           <TextInput
//             mode="outlined"
//             placeholder="비밀번호를 입력하세요."
//             selectionColor="#c2c2c2" //텍스트 select 되었을 때
//             activeOutlineColor="#919191" //editmode
//             outlineColor="#919191" // input border
//             style={{backgroundColor: '#ffffff', fontSize: 12}}
//             secureTextEntry
//             value={password}
//             onChangeText={setPassword}
//           />
//           <Button
//             mode="contained"
//             onPress={onPressRegister}
//             style={{
//               borderWidth: 1,
//               borderRadius: 5,
//               padding: 5,
//               backgroundColor: Color.red4,
//             }}
//             labelStyle={{fontWeight: 'bold', fontSize: 15}}>
//             회원가입
//           </Button>
//         </View>
//       </KeyboardAvoidingView>
//     </ScreenWrapper>
//   );
// };

// export default Register;

import React, {useState} from 'react';
import {TextInput, Button, Checkbox} from 'react-native-paper';
import {View, Text, Pressable} from 'react-native';
import useRegister from '../../commons/hooks/reactQuery/mutation/useRegister';
import com from '../../commons/utils/common';
import useInform from '../../commons/hooks/useInform';

const Register = () => {
  const [email, setEmail] = useState('');
  const [user_name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const {mutate: mutateRegister} = useRegister();
  const inform = useInform();

  const onPressRegister = () => {
    if (!com.isEmail(email)) {
      inform({
        title: '오류',
        message: '이메일 형식이 맞지 않습니다.',
      });
      return;
    }

    /*if (!com.isPassword(password)) {
      inform({
        title: '오류',
        message: '비밀번호 형식이 맞지 않습니다.\n(8 ~ 10자 영문, 숫자 조합)',
      });
      return;
    }*/

    mutateRegister({
      user_name,
      email,
      password,
    });
  };

  return (
    <>
      <TextInput
        label="이메일(아이디)"
        mode="outlined"
        value={email}
        placeholder="이메일을 입력하세요."
        activeOutlineColor="#919191"
        outlineColor="#919191"
        left={<TextInput.Icon icon="email" size={20} />}
        style={{backgroundColor: '#ffffff', fontSize: 13}}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        label="활동명"
        mode="outlined"
        value={user_name}
        placeholder="활동명을 입력하세요."
        activeOutlineColor="#919191"
        outlineColor="#919191"
        left={<TextInput.Icon icon="account" size={20} />}
        style={{backgroundColor: '#ffffff', fontSize: 13}}
        onChangeText={text => setUserName(text)}
      />
      <TextInput
        label="비밀번호"
        mode="outlined"
        value={password}
        placeholder="8~16자 영문 숫자 조합"
        activeOutlineColor="#919191"
        outlineColor="#919191"
        left={<TextInput.Icon icon="file-key-outline" size={20} />}
        style={{backgroundColor: '#ffffff', fontSize: 13}}
        onChangeText={text => setPassword(text)}
      />
      {/* <TextInput
        label="비밀번호 확인"
        mode="outlined"
        value={setPassword}
        placeholder="방금 입력한 비밀번호를 다시 입력하세요."
        activeOutlineColor="#919191"
        outlineColor="#919191"
        left={<TextInput.Icon icon="file-key" size={20} />}
        style={{backgroundColor: '#ffffff', fontSize: 13}}
        onChangeText={text => setPassword(text)}
      /> */}
      <View>
        <Text style={{fontSize: 11, marginVertical: 20, marginLeft: 10}}>
          {/* <Pressable
            style={{color: 'red', textDecoration: 'underline'}}
            onPress={() => console.log('press')}>
            서비스 이용 약관
          </Pressable>{' '}
          및{' '}
          <Pressable
            style={{color: 'red', textDecoration: 'underline'}}
            onPress={() => console.log('press')}>
            개인 정보 수집 이용 약관
          </Pressable>
          을 확인하세요. */}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text style={{alignSelf: 'center', fontSize: 12}}>
            서비스 이용 약관에 동의함
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text style={{alignSelf: 'center', fontSize: 12}}>
            개인 정보 수집 이용 약관에 동의함
          </Text>
        </View>
        <Button
          mode="contained"
          onPress={onPressRegister}
          style={{
            borderWidth: 1,
            borderRadius: 5,
            padding: 5,
            marginVertical: 10,
            backgroundColor: 'orange',
          }}
          labelStyle={{fontWeight: 'bold', fontSize: 14}}>
          상기 약관에 동의하고 회원가입합니다.
        </Button>
      </View>
    </>
  );
};

export default Register;
