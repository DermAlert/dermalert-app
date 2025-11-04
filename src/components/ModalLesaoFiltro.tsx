import { Modal, Text, TouchableOpacity, View } from 'react-native';

type Props ={
  modalLesoesVisible: boolean,
  setModalLesoesVisible: (modalLesoesVisible: boolean) => void
}

export default function ModalLesaoFiltro({ modalLesoesVisible, setModalLesoesVisible }: Props) {

  return (
    <Modal
      animationType="fade"
      visible={modalLesoesVisible}
      transparent={true}
      onRequestClose={() => {
        setModalLesoesVisible(!modalLesoesVisible);
      }}>
      <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.4)] px-7">
        <View className="bg-white h-[210] w-full rounded-2xl">
          <View className="flex-row justify-between px-8 pt-8 pb-4 border-b border-gray-400 border-solid">
            <Text allowFontScaling={false} className="font-semibold text-lg">Filtrar por tipo</Text>
            <TouchableOpacity onPress={() => setModalLesoesVisible(!modalLesoesVisible)}>
              <Text>Fechar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="border-b border-gray-400 flex-row justify-start px-5 py-3 items-center gap-5">
            <Text>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity className="border-b border-gray-400 flex-row justify-start px-5 py-3 items-center gap-5">
            <Text>Oncodermato</Text>
          </TouchableOpacity>
          <TouchableOpacity className="border-b border-gray-400 flex-row justify-start px-5 py-3 items-center gap-5">
            <Text>Úlcera venosa</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </Modal>
    
  );
}
