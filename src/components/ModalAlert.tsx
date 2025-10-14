import { Modal, SafeAreaView, Text, TouchableHighlightProps, TouchableOpacity, View } from 'react-native';
import Icon from './Icon';


type Props = TouchableHighlightProps & {
  modalAlert: boolean,
  setModalAlert: (modalAlert: boolean) => void,
  description?: string,
  title: string,
  handleCancel: () => void,
  btnYesText: string,
  btnNoText: string
}

export default function ModalAlert({ modalAlert, setModalAlert, description, title, handleCancel, btnYesText, btnNoText, ...rest }: Props) {

  return (
    <SafeAreaView>
      <Modal
        animationType="fade"
        visible={modalAlert}
        transparent={true}
        onRequestClose={() => {
          setModalAlert(!modalAlert);
        }}
        >
        <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.4)] px-7">
          <View className="bg-white h-auto w-full rounded-2xl shadow-md p-8 items-center">
            <Icon iconName="WarningIcon" style={{ alignSelf: "center"}} />
            <Text adjustsFontSizeToFit={false} allowFontScaling={false} textBreakStrategy="simple" className="text-xl text-center text-neutral-900 mt-4 font-medium">{title}</Text>

            {description && (
              <Text allowFontScaling={false} textBreakStrategy="simple" className="text-base text-neutral-700 text-center mt-4">  {description} </Text>
            )}
            

            <View className="flex-row gap-[10] mt-8 justify-center items-center w-full">
              <TouchableOpacity 
                className="bg-white flex-grow h-[40] rounded-full justify-center items-center border border-primary-600"
                onPress={handleCancel}
                {...rest}
              >
                <Text textBreakStrategy="balanced" className="text-primary-600 text-base ">{btnYesText}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="bg-primary-600 border-primary-600 flex-grow rounded-full justify-center items-center border px-3 py-[10]"
                onPress={() => setModalAlert(!modalAlert)}
                {...rest}
              >
                <Text className="text-white text-base  font-semibold">{btnNoText}</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      </Modal>
    </SafeAreaView>
    
    
  );
}
