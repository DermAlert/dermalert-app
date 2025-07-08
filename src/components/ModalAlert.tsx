import Feather from '@expo/vector-icons/Feather';
import { Modal, Text, TouchableHighlightProps, TouchableOpacity, View } from 'react-native';

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
    <Modal
      animationType="fade"
      visible={modalAlert}
      transparent={true}
      onRequestClose={() => {
        setModalAlert(!modalAlert);
      }}>
      <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.4)] px-7">
        <View className="bg-white h-auto w-full rounded-2xl shadow-md p-10 items-center">
          <View className="mb-5">
            <Feather name="alert-triangle" size={41} color="#1E1E1E" />
          </View>
          <Text className="text-xl text-center">{title}</Text>

          {description && (
            <Text className="text-base text-gray-500 text-center mt-4">{description}</Text>
          )}
          

          <View className="flex-row gap-4 mt-8 justify-center items-center w-full">
            <TouchableOpacity 
              className="bg-white flex-grow h-12 rounded-lg justify-center items-center border border-gray-800"
              onPress={handleCancel}
              {...rest}
            >
              <Text className="text-gray-800 text-base">{btnYesText}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="bg-gray-800 flex-grow h-12 rounded-lg justify-center items-center border"
              onPress={() => setModalAlert(!modalAlert)}
              {...rest}
            >
              <Text className="text-white text-base">{btnNoText}</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </Modal>
    
  );
}
