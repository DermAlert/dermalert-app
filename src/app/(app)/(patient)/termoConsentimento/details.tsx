import Header from '@/components/Header';
import ModalAlert from '@/components/ModalAlert';
import { useRegisterLesionForm } from '@/hooks/Oncodermato/useRegisterLesionForm';
import { useRegisterLesionUlceraForm } from '@/hooks/Ulcera/useRegisterLesionUlceraForm';
import { usePatientForm } from '@/hooks/usePatientForm';
import { getImageUri } from '@/storage/imageStore';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { TrashIcon } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Zoom from 'react-native-zoom-reanimated';


export default function TermoConsentimento() {
  //const { width } = Dimensions.get('window');
  const { width, height } = useWindowDimensions()
  const altura = height-64
  const { deletar, isOncodermato, isPatient, isUlcera } = useLocalSearchParams();
  const [modalAlert, setModalAlert] = useState(false);

  const image = getImageUri(); 
  const { removeImageLesion } = useRegisterLesionForm(); 
  const { removeImageLesionUlcera } = useRegisterLesionUlceraForm(); 
  const { removeImage } = usePatientForm(); 

  useEffect(() => {
    console.log('isOncodermato:', isOncodermato);
    console.log('isPatient:', isPatient);
    console.log('isUlcera:', isUlcera);
  }, []);

  const handleCancel = () => {
    if (image) {
      if (isOncodermato === 'true') {
        removeImageLesion(image);
      } else if (isPatient === 'true') {  
        removeImage(image);
      } else if (isUlcera === 'true') {
        removeImageLesionUlcera(image);
        console.log('Removendo imagem de lesão úlcera:', image);
      }
    }
    setModalAlert(false);
    router.back(); 
  };
  

  const isDeleteButton = deletar === 'true';

  return (
    <View className="flex-1 bg-white p-safe">

      <View className="absolute top-0 left-0 right-0 z-50">
        <ModalAlert 
          modalAlert={modalAlert} 
          setModalAlert={setModalAlert} 
          title="Deseja remover esta imagem?"
          handleCancel={handleCancel}
          btnNoText="Não, cancelar"
          btnYesText="Sim, remover"
        />
      </View>

      {/* <Header title="" onPress={()=> router.push("/(app)/(patient)/termoConsentimento/[id]")} /> */}
      <Header title="" onPress={()=> router.back()} />

      {isDeleteButton && (
        <TouchableOpacity 
          className="absolute top-10 right-4 w-10 h-10 justify-center items-center" 
          onPress={() => setModalAlert(!modalAlert)}
        >
          <TrashIcon size={24} color="#4052A1" />
        </TouchableOpacity>
      )}

      <View className="flex-1 bg-gray-800 justify-center items-center">
        <Zoom>
          <Image
            //source={{ uri: "https://img.yumpu.com/52616976/1/500x640/termo-de-ajuste-de-conduta-tac.jpg" }}
            source={image ? { uri: image } : undefined}
            contentFit='contain'
            style={{
              width: width,
              height: altura
            }}
            contentPosition="center"
          />
        </Zoom>
      </View>

    </View>
    
  );
}