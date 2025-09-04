import * as ImagePicker from 'expo-image-picker';
import { CameraIcon, ImageIcon } from 'phosphor-react-native';
import { Modal, Text, TouchableHighlightProps, TouchableOpacity, View } from 'react-native';

type Props = TouchableHighlightProps & {
  modalAddImage: boolean;
  setModalAddImage: (modalAlert: boolean) => void;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
};


export default function ModalAddImage({ setModalAddImage, modalAddImage, images, setImages, ...rest }: Props) {

  async function handlePhotoSelect(){
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
      allowsMultipleSelection: true
    });

    if (photoSelected.canceled) return; 

    const selectedImageUris = photoSelected.assets.map((asset) => asset.uri);
    setImages(prevImages => [...prevImages, ...selectedImageUris]);
    setModalAddImage(false);
  }

  async function handleCamera(){
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (!cameraPermission.granted) return;

    const photoSelected = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 1,
      allowsEditing: true,
      //aspect: [10, 16]
    });

    if (photoSelected.canceled) return;

    const selectedPhoto = photoSelected.assets[0].uri;
    setImages(prevImages => [...prevImages, selectedPhoto]);
    setModalAddImage(false);
  }

  return (
    <Modal
      animationType="fade"
      visible={modalAddImage}
      transparent={true}
      onRequestClose={() => {
        setModalAddImage(false);
      }}
    >
      <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.4)] px-7">

        <View className="bg-white h-auto w-full rounded-2xl shadow-md p-8 pb-6 items-center gap-4">

          <Text className="text-lg text-center text-neutral-900 font-medium">Adicionar imagem</Text>
          <Text className="text-base text-neutral-700 text-center">
            Capture uma imagem da câmera do dispositivo ou selecione da galeria.
          </Text>

          <View className="gap-4 justify-center items-center w-full">
            <TouchableOpacity 
              className="bg-white border-neutral-300 flex-grow rounded-lg justify-start items-center border w-full p-4 flex-row gap-3"
              onPress={handleCamera}
              {...rest}
            >
              <CameraIcon size={20} color="#4052A1" />
              <Text className="text-neutral-700 text-base font-semibold">Abrir câmera</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="bg-white border-neutral-300 flex-grow rounded-lg justify-start items-center border w-full p-4 flex-row gap-3"
              onPress={handlePhotoSelect}
              {...rest}
            >
              <ImageIcon size={20} color="#4052A1" />
              <Text className="text-neutral-700 text-base font-semibold">Buscar na galeria</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="bg-white flex-grow h-10 mt-2 rounded-lg justify-center items-center w-full"
              onPress={() => setModalAddImage(false)}
              {...rest}
            >
              <Text className="text-primary-600 text-base font-semibold">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
