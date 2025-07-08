import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Modal, Text, TouchableHighlightProps, TouchableOpacity, View } from 'react-native';

type Props = TouchableHighlightProps & {
  modalAddImage: boolean,
  setModalAddImage: (modalAlert: boolean) => void
}


export default function ModalAddImage({ setModalAddImage, modalAddImage, ...rest }: Props) {
  const [image, setImage] = useState<string[]>([]);

  async function handlePhotoSelect(){
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
      allowsMultipleSelection: true
    })

    if (photoSelected.canceled) return

    if (photoSelected) {
      //console.log(photoSelected)
      const selectedImageUris = photoSelected.assets.map((asset) => asset.uri);
      setImage(prevImages => [...prevImages, ...selectedImageUris]);
      setModalAddImage(!modalAddImage);
    }

  }

  async function handleCamera(){
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

    if (!cameraPermission.granted) return

    if (cameraPermission.status === 'granted') {
      const photoSelected = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 1,
        allowsEditing: true,
      })

      if (photoSelected.canceled) return

      if (photoSelected) {
        //console.log(photoSelected.assets[0].uri)
        const selectedPhoto = photoSelected.assets[0].uri;
        setImage(prevImages => [...prevImages, selectedPhoto]);
        setModalAddImage(!modalAddImage);
      }
    }

    

  }

  useEffect(()=> {
    console.log(image)
  }, [image])

  return (
    <Modal
      animationType="fade"
      visible={modalAddImage}
      transparent={true}
      onRequestClose={() => {
        setModalAddImage(!modalAddImage);
      }}>
      <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.4)] px-7">
        <View className="bg-white h-auto w-full rounded-2xl shadow-md p-10 pb-6 items-center">
          <Text className="text-xl text-center">Adicionar imagem</Text>

          <Text className="text-base text-gray-500 text-center mt-4">Capture uma imagem da câmera do dispositivo ou selecione da galeria.</Text>
          

          <View className="gap-4 mt-6 justify-center items-center w-full">
            <TouchableOpacity 
              className="bg-white border-gray-800 flex-grow h-14 rounded-lg justify-start items-center border w-full px-4 flex-row gap-4"
              onPress={handleCamera}
              {...rest}
            >
              <Feather name="camera" size={22} color="#1E1E1E" />
              <Text className="text-gray-800 text-base">Abrir câmera</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="bg-white border-gray-800 flex-grow h-14 rounded-lg justify-start items-center border w-full px-4 flex-row gap-4"
              onPress={handlePhotoSelect}
              {...rest}
            >
              <Feather name="image" size={22} color="#1E1E1E" />
              <Text className="text-gray-800 text-base">Buscar na galeria</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="bg-white flex-grow h-12 rounded-lg justify-center items-center w-full"
              onPress={() => setModalAddImage(!modalAddImage)}
              {...rest}
            >
              <Text className="text-gray-800 text-base">Cancelar</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </Modal>
    
  );
}
