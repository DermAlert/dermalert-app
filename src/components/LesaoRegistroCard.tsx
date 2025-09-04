import { formatDateFromApi } from '@/utils/formatDate';
import { router } from 'expo-router';
import { CardsIcon } from 'phosphor-react-native';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type LesaoRegistroCardProps = TouchableOpacityProps & {
  lesionType: string;
  registroId?: number;
  imagesNumber?: number;
  lesionDate?: string;
}

export default function LesaoRegistroCard({ lesionType, registroId, imagesNumber, lesionDate, ...rest }: LesaoRegistroCardProps) {

  return (
    <TouchableOpacity 
      className="shadow-sm shadow-neutral-800 bg-white rounded-lg flex-row justify-start p-4 items-center gap-4"
      activeOpacity={0.6}
      onPress={()=> {
        router.push({pathname: '/(app)/(patient)/lesao/registroDetail/registroDetail', params: { type: lesionType, registroId }});
      }}
      {...rest}
    >

      {/* <View 
        className="w-[56] h-[56] border border-gray-300 rounded-md justify-center items-center overflow-hidden bg-gray-300 relative"
      >
        <Image 
          source={{ uri: "https://clinicapatriciaholderbaum.com.br/wp-content/uploads/2021/08/lpele5.jpg" }}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          contentPosition="top"
        />
      </View> */}

      <View className={`h-12 w-12 rounded-lg justify-center items-center  ${lesionType === "cancer" ? 'bg-secondary-100' : 'bg-primary-200'}`}>
        <CardsIcon size={24} color={`${lesionType === 'cancer' ?  '#FF765E' : '#6775B4' }`} weight="fill" />
      </View>

      <View>

        <Text className='font-medium text-sm mb-1 text-neutral-900'>
          Registro de {lesionDate ? formatDateFromApi(lesionDate) : 'Data não disponível'}
        </Text>

        <Text className='text-xs font-semibold text-neutral-700'>
          {imagesNumber && imagesNumber > 1 ? `${imagesNumber} imagens` : `${imagesNumber} imagem`}
        </Text>
        
      </View>


    </TouchableOpacity>
  )
}