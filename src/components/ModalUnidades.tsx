import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import UnidadeCard from './UnidadeCard';

type Props ={
  modalUnidadesVisible: boolean,
  setModalUnidadesVisible: (modalUnidadesVisible: boolean) => void
}

export default function ModalUnidades({ modalUnidadesVisible, setModalUnidadesVisible }: Props) {

  return (
    <Modal
      animationType="fade"
      visible={modalUnidadesVisible}
      transparent={true}
      onRequestClose={() => {
        setModalUnidadesVisible(!modalUnidadesVisible);
      }}>
      <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.4)] px-7">
        <View className="bg-white h-[407] w-full rounded-2xl">
          <View className="flex-row justify-between px-8 pt-8 pb-4 border-b border-gray-400 border-solid">
            <Text className="font-semibold text-lg">Trocar a unidade</Text>
            <TouchableOpacity onPress={() => setModalUnidadesVisible(!modalUnidadesVisible)}>
              <Text>Fechar</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
            keyExtractor={item => item.toString()}
            renderItem={({item}) => <UnidadeCard />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginBottom: 0,
            }}
          />
          
        </View>
      </View>
    </Modal>
    
  );
}
