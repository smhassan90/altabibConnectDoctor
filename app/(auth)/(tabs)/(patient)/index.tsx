// import React, { useEffect, useState } from 'react';
// import TitleBar from './../../../../components/TitleBar';
// import { colors, paddingM, styles } from './../../../../app/styles';
// import { Card, Image, Text, View, XStack, YStack } from 'tamagui';
// import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import axios from 'axios';
// import { url } from './../../../../env';
// import * as SecureStore from 'expo-secure-store';
// import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification';
// import Header from './../../../../components/Header';
// import { userData } from './../../../..//components/home/CustomContent';
// import { CusText } from './../../../../components/CusText';
// import { handleLogout } from './../../../..//components/home/CustomContent';

// export default function Page() {
//   const [password, setPassword] = useState('');
//   const [newPw, setNewPw] = useState('');
//   const [newConNewPw, setConNewPw] = useState('');

//   const handleOldPassChange = (text: string) => setPassword(text);
//   const handleNewPassChange = (text: string) => setNewPw(text);
//   const handleConNewPassChange = (text: string) => setConNewPw(text);

//   const [changePassState, setChangePassState] = useState(false);

//   useEffect(() => {
//     const token = SecureStore.getItem('token');

//     // Axios GET request to fetch user data

//     axios
//       .get(`${url}getClinics?token=${token}`)
//       .then((res) => {
//         console.log('Response Clinic Data:', JSON.stringify(res.data.data, null, 2));
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });

//     axios
//       .get(`${url}getClinics?token=${token}`)
//       .then((res) => {
//         console.log('Response Clinic Data:', JSON.stringify(res.data.data, null, 2));
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const changePw = (oldPw: string, newPw: string, newConNewPw: string) => {
//     const token = SecureStore.getItem('token');
//     axios
//       .get(`${url}changePassword?token=${token}&oldPassword=${oldPw}&newPassword=${newPw}`)
//       .then((res) => {
//         console.log(JSON.stringify(res.data, null, 2));
//         if (res.data.status == 200) {
//           Dialog.show({
//             type: ALERT_TYPE.SUCCESS,
//             title: 'Password Changed',
//             textBody: 'Password has been changed successfully',
//             //button: "Close",
//           });
//           setTimeout(() => {
//             Dialog.hide();
//             setChangePassState(false);
//           }, 2000);
//         } else if (newConNewPw !== newPw) {
//           Dialog.show({
//             type: ALERT_TYPE.DANGER,
//             title: 'Error Changing Password',
//             textBody: 'New Passwords do not match',
//             //button: "Close",
//           });
//           setTimeout(() => {
//             Dialog.hide();
//           }, 2000);
//         } else {
//           Dialog.show({
//             type: ALERT_TYPE.DANGER,
//             title: 'Error Changing Password',
//             textBody: 'Something went wrong',
//             //button: "Close",
//           });
//           setTimeout(() => {
//             Dialog.hide();
//           }, 2000);
//         }
//       })
//       .catch((err: any) => {
//         console.log('ERROR CHANGING PW: ', err);
//       });
//   };

//   return (
//     <AlertNotificationRoot>
//       <View flex={1} backgroundColor={colors.primary}>
//         <Header>
//           <TitleBar title="Summary" />
//         </Header>
//         <YStack padding={paddingM}>
//           <Card gap={20} unstyled padded backgroundColor={'white'}>
//             <Image
//               alignSelf="center"
//               height={100}
//               width={100}
//               borderRadius={50}
//               source={
//                 userData.gender === 'male'
//                   ? require('../../../../assets/docMale.png')
//                   : require('../../../../assets/docFemale.png')
//               }
//             />
//             <XStack>
//               <CusText bold size="md" color="yellow">
//                 User Name:{' '}
//               </CusText>
//               <CusText bold size="md" color="primary">
//                 {userData.username}
//               </CusText>
//             </XStack>
//             <XStack>
//               <CusText bold size="md" color="yellow">
//                 Name:{' '}
//               </CusText>
//               <CusText bold size="md" color="primary">
//                 {userData.name}
//               </CusText>
//             </XStack>
//             <XStack>
//               <CusText bold size="md" color="yellow">
//                 Address:{' '}
//               </CusText>
//               <CusText bold size="md" color="primary">
//                 {userData.address}
//               </CusText>
//             </XStack>
//             <XStack>
//               <CusText bold size="md" color="yellow">
//                 Qualifications:{' '}
//               </CusText>
//               <CusText bold size="md" color="primary">
//                 {userData.qualifications.map((qual) => qual.name + ', ')}
//               </CusText>
//             </XStack>

//             {changePassState ? (
//               <>
//                 <TextInput
//                   autoCapitalize="none"
//                   onChangeText={handleOldPassChange}
//                   placeholderTextColor={colors.labelGray}
//                   style={inp.input}
//                   //secureTextEntry
//                   placeholder="Enter old password"
//                 />
//                 <TextInput
//                   autoCapitalize="none"
//                   onChangeText={handleNewPassChange}
//                   placeholderTextColor={colors.labelGray}
//                   style={inp.input}
//                   placeholder="Enter new password"
//                 />
//                 <TextInput
//                   autoCapitalize="none"
//                   onChangeText={handleConNewPassChange}
//                   placeholderTextColor={colors.labelGray}
//                   style={inp.input}
//                   placeholder="Confirm new password"
//                 />
//                 <XStack gap={5}>
//                   <TouchableOpacity
//                     style={[styles.secBtn, { flex: 1 }]}
//                     onPress={() => {
//                       setChangePassState(!changePassState);
//                     }}>
//                     <CusText bold size="md" color="white">
//                       Cancel
//                     </CusText>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={[styles.primBtn, { flex: 1 }]}
//                     onPress={() => {
//                       changePw(password, newPw, newConNewPw);
//                     }}>
//                     <CusText bold size="md" color="white">
//                       Confirm
//                     </CusText>
//                   </TouchableOpacity>
//                 </XStack>
//               </>
//             ) : (
//               <TouchableOpacity
//                 style={styles.primBtn}
//                 onPress={() => {
//                   setChangePassState(!changePassState);
//                 }}>
//                 <Text color={colors.white} fontFamily={'ArialB'}>
//                   Change Password
//                 </Text>
//               </TouchableOpacity>
//             )}

//             <TouchableOpacity style={styles.secBtn} onPress={handleLogout}>
              
//               <Text fontFamily={'ArialB'} color={colors.white} >
//                 Logout
//               </Text>
              
//             </TouchableOpacity>
//           </Card>
//         </YStack>
//       </View>
//     </AlertNotificationRoot>
//   );
// }

// const inp = StyleSheet.create({
//   input: {
//     borderColor: colors.lightGray,
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 10,
//     backgroundColor: colors.white,
//   },
// });
// import React, { useState } from 'react';
// import TitleBar from './../../../../components/TitleBar';
// import { colors, paddingM, styles } from './../../../../app/styles';
// import { Card, Text,Separator, View, XStack, YStack } from 'tamagui';
// import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import Header from './../../../../components/Header';
// import { CusText } from './../../../../components/CusText';
// import { AntDesign } from '@expo/vector-icons';
// import DateTimePicker from '@react-native-community/datetimepicker';

// export default function Page() {
//   const [patientName, setPatientName] = useState('');
//   const [dob, setDob] = useState(new Date());
//   const [gender, setGender] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const handleSubmit = () => {
//     if (!patientName || !dob || !gender || !phoneNumber) {
//       alert('Please fill out all fields');
//       return;
//     }

//     const patientData = {
//       name: patientName,
//       dateOfBirth: dob,
//       gender,
//       phoneNumber,
//     };

//     console.log('Patient Data Submitted:', patientData);
//     alert('Patient data has been submitted successfully!');
//     // Reset the form
//     setPatientName('');
//     setDob(new Date());
//     setGender('');
//     setPhoneNumber('');
//   };

//   const onChangeDate = (event, selectedDate) => {
//     const currentDate = selectedDate || dob;
//     setShowDatePicker(false);
//     setDob(currentDate);
//   };

//   return (
//     <View flex={1} backgroundColor={colors.primary}>
//       <Header>
//         <TitleBar title="Patient " />
//       </Header>
//       <YStack padding={paddingM}>
//         <Card gap={20} unstyled padded backgroundColor={'white'}>
//           <CusText bold size="lg" color="primary" alignSelf="center">
//             Enter Patient Details
//           </CusText>
//                   <YStack gap={20}>
//                     <XStack backgroundColor={colors.white} borderRadius={5} padding={10} gap={10}>
//                       <AntDesign name="profile" size={24} color={colors.primary} />
//                       <Separator vertical borderColor={'lightgray'} />
//                       <TextInput
//                         maxLength={20}
//                         style={{ padding: 0, flex: 1, fontFamily: 'ArialB' }}
//                         placeholder="Patient Name"
//                         placeholderTextColor="#808080a4"
//                       />
//                     </XStack>
//                     <XStack backgroundColor={colors.white} borderRadius={5} padding={10} gap={10}>
//                       <AntDesign name="phone" size={24} color={colors.primary} />
//                       <Separator vertical borderColor={'lightgray'} />
//                       <TextInput
//                         maxLength={20}
//                         style={{ padding: 0, flex: 1, fontFamily: 'ArialB' }}
//                         placeholder="Enter Contact Number"
//                         placeholderTextColor="#808080a4"
//                       />
//                     </XStack>
//                     <XStack backgroundColor={colors.white} borderRadius={5} padding={10} gap={10}>
//                       <AntDesign name="man" size={24} color={colors.primary} />
//                       <Separator vertical borderColor={'lightgray'} />
//                       <TextInput
//                         maxLength={20}
//                         style={{ padding: 0, flex: 1, fontFamily: 'ArialB' }}
//                         placeholder="Select your gender"
//                         placeholderTextColor="#808080a4"
//                       />
//                     </XStack>
//                     <XStack backgroundColor={colors.white} borderRadius={5} padding={10} gap={10}>
//                       <AntDesign name="calendar" size={24} color={colors.primary} />
//                       <Separator vertical borderColor={'lightgray'} />
//                       <TextInput
//                         maxLength={20}
//                         style={{ padding: 0, flex: 1, fontFamily: 'ArialB' }}
//                         placeholder="Select date of birth"
//                         placeholderTextColor="#808080a4"
//                       />
//                     </XStack>
                    
                    

                    
//                   </YStack>


//           <TouchableOpacity style={styles.primBtn} onPress={handleSubmit}>
//             <CusText bold size="md" color="white">
//               Submit
//             </CusText>
//           </TouchableOpacity>
//         </Card>
//       </YStack>
//     </View>
//   );
// }

// const inp = StyleSheet.create({
//   input: {
//     borderColor: colors.lightGray,
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 10,
//     backgroundColor: colors.white,
//     marginBottom: 15,
//     flex: 1,
//     paddingLeft: 40, // Ensure there's space for the icon inside the input field
//   },
//   icon: {
//     position: 'absolute',
//     left: 10,
//     top: 12,
//   },
// });

// import React, { useState } from 'react';
// import TitleBar from './../../../../components/TitleBar';
// import { colors, paddingM, styles } from './../../../../app/styles';
// import { Card, Text, Separator, View, XStack, YStack } from 'tamagui';
// import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import Header from './../../../../components/Header';
// import { CusText } from './../../../../components/CusText';
// import { AntDesign } from '@expo/vector-icons';
// import DateTimePicker from '@react-native-community/datetimepicker';

// export default function Page() {
//   const [patientName, setPatientName] = useState('');
//   const [dob, setDob] = useState(new Date());
//   const [gender, setGender] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const handleSubmit = () => {
//     if (!patientName || !dob || !gender || !phoneNumber) {
//       alert('Please fill out all fields');
//       return;
//     }

//     const patientData = {
//       name: patientName,
//       dateOfBirth: dob,
//       gender,
//       phoneNumber,
//     };

//     console.log('Patient Data Submitted:', patientData);
//     alert('Patient data has been submitted successfully!');
//     // Reset the form
//     setPatientName('');
//     setDob(new Date());
//     setGender('');
//     setPhoneNumber('');
//   };

//   const onChangeDate = (event, selectedDate) => {
//     const currentDate = selectedDate || dob;
//     setShowDatePicker(false);
//     setDob(currentDate);
//   };

//   return (
//     <View flex={1} backgroundColor={colors.primary}>
//       <Header>
//         <TitleBar title="Patient " />
//       </Header>
//       <YStack padding={paddingM}>
//         <Card gap={20} unstyled padded backgroundColor={'white'}>
//           <CusText bold size="lg" color="primary" alignSelf="center">
//             Enter Patient Details
//           </CusText>
//           <YStack gap={20}>
//             <XStack backgroundColor={colors.white} borderRadius={5} padding={10} gap={10}>
//               <AntDesign name="profile" size={24} color={colors.primary} />
//               <Separator vertical borderColor={'lightgray'} />
//               <TextInput
//                 value={patientName}
//                 onChangeText={setPatientName}
//                 maxLength={20}
//                 style={{ padding: 0, flex: 1, fontFamily: 'ArialB' }}
//                 placeholder="Patient Name"
//                 placeholderTextColor="#808080a4"
//               />
//             </XStack>

//             <XStack backgroundColor={colors.white} borderRadius={5} padding={10} gap={10}>
//               <AntDesign name="phone" size={24} color={colors.primary} />
//               <Separator vertical borderColor={'lightgray'} />
//               <TextInput
//                 value={phoneNumber}
//                 onChangeText={setPhoneNumber}
//                 maxLength={20}
//                 style={{ padding: 0, flex: 1, fontFamily: 'ArialB' }}
//                 placeholder="Enter Contact Number"
//                 placeholderTextColor="#808080a4"
//               />
//             </XStack>

//             <XStack backgroundColor={colors.white} borderRadius={5} padding={10} gap={10}>
//               <AntDesign name="man" size={24} color={colors.primary} />
//               <Separator vertical borderColor={'lightgray'} />
//               <TextInput
//                 value={gender}
//                 onChangeText={setGender}
//                 maxLength={20}
//                 style={{ padding: 0, flex: 1, fontFamily: 'ArialB' }}
//                 placeholder="Select your gender"
//                 placeholderTextColor="#808080a4"
//               />
//             </XStack>

//             <XStack backgroundColor={colors.white} borderRadius={5} padding={10} gap={10}>
//               <AntDesign name="calendar" size={24} color={colors.primary} />
//               <Separator vertical borderColor={'lightgray'} />
//               <TouchableOpacity onPress={() => setShowDatePicker(true)}>
//                 <TextInput
//                   value={dob.toLocaleDateString()} // Format the date
//                   editable={false} // Disable editing, only show date
//                   style={{ padding: 0, flex: 1, fontFamily: 'ArialB' }}
//                   placeholder="Select date of birth"
//                   placeholderTextColor="#808080a4"
//                 />
//               </TouchableOpacity>
//             </XStack>

//             {showDatePicker && (
//               <DateTimePicker
//                 value={dob}
//                 mode="date"
//                 display="calendar"
//                 onChange={onChangeDate}
//               />
//             )}
//           </YStack>

//           <TouchableOpacity style={styles.primBtn} onPress={handleSubmit}>
//             <CusText bold size="md" color="white">
//               Submit
//             </CusText>
//           </TouchableOpacity>
//         </Card>
//       </YStack>
//     </View>
//   );
// }

// const inp = StyleSheet.create({
//   input: {
//     borderColor: colors.lightGray,
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 10,
//     backgroundColor: colors.white,
//     marginBottom: 15,
//     flex: 1,
//     paddingLeft: 40, // Ensure there's space for the icon inside the input field
//   },
//   icon: {
//     position: 'absolute',
//     left: 10,
//     top: 12,
//   },
// });
import React, { useState } from 'react';
import TitleBar from './../../../../components/TitleBar';
import { colors, paddingM, styles } from './../../../../app/styles';
import { Card, Text, Separator, View, XStack, YStack } from 'tamagui';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Header from './../../../../components/Header';
import { CusText } from './../../../../components/CusText';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'; // Import Picker for gender options

export default function Page() {
  const [patientName, setPatientName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    if (!patientName || !dob || !gender || !phoneNumber) {
      alert('Please fill out all fields');
      return;
    }

    const patientData = {
      name: patientName,
      dateOfBirth: dob,
      gender,
      phoneNumber,
    };

    console.log('Patient Data Submitted:', patientData);
    alert('Patient data has been submitted successfully!');
    // Reset the form
    setPatientName('');
    setDob(new Date());
    setGender('');
    setPhoneNumber('');
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(false);
    setDob(currentDate);
  };

  return (
    <View flex={1} backgroundColor={colors.primary}>
      <Header>
        <TitleBar title="Patient " />
      </Header>
      <YStack padding={paddingM}>
        <Card gap={20} unstyled padded backgroundColor={'white'}>
          <CusText bold size="lg" color="primary" alignSelf="center">
            Get Patient Details
          </CusText>
          <YStack gap={20}>
            <XStack backgroundColor={colors.white} borderRadius={5} padding={10} gap={10}>
              <AntDesign name="profile" size={29} color={colors.primary} />
              <Separator vertical borderColor={'lightgray'} />
              <TextInput
                value={patientName}
                onChangeText={setPatientName}
                maxLength={20}
                style={inp.input}
                placeholder="Patient Name"
                placeholderTextColor="#808080a4"
              />
            </XStack>
            <XStack backgroundColor={colors.white} borderRadius={5} padding={10} gap={10}>
              <AntDesign name="phone" size={29} color={colors.primary} />
              <Separator vertical borderColor={'lightgray'} />
              <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
                maxLength={20}
                style={inp.input}
                placeholder=" Enter Contact Number"
                placeholderTextColor="#808080a4"
              />
            </XStack>


           
            {/* Gender Dropdown */}
            {/* <XStack backgroundColor={colors.white} borderRadius={5} padding={10} gap={10}>
              <AntDesign name="man" size={24} color={colors.primary} />
              <Separator vertical borderColor={'lightgray'} />
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                style={{
                  padding: 0,
                  flex: 1,
                  fontFamily: 'ArialB',
                  color: '#000', // Text color consistent with inputs
                  fontSize: 16, // Font size consistent with inputs
                }}
              >
                <Picker.Item label="Select your gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            </XStack> */}
            

            <XStack backgroundColor={colors.white} borderRadius={5} padding={10} gap={10}>
              <AntDesign name="calendar" size={24} color={colors.primary} />
              <Separator vertical borderColor={'lightgray'} />
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <TextInput
                  value={dob.toLocaleDateString()} // Format the date
                  editable={false} // Disable editing, only show date
                  style={inp.input}
                  placeholder="Select date of birth"
                  placeholderTextColor="#808080a4"
                />
              </TouchableOpacity>
            </XStack>

            {showDatePicker && (
              <DateTimePicker
                value={dob}
                mode="date"
                display="calendar"
                onChange={onChangeDate}
              />
            )}
          </YStack>

          <TouchableOpacity style={styles.primBtn} onPress={handleSubmit}>
            <CusText bold size="md" color="white">
              Submit
            </CusText>
          </TouchableOpacity>
        </Card>
      </YStack>
    </View>
  );
}

const inp = StyleSheet.create({
  input: {
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 5,
    width: 250,
    padding: 10,
    height:35,
    backgroundColor: colors.white,
    // Ensure there's space for the icon inside the input field
  },
  icon: {
    top:20,
  },
});
