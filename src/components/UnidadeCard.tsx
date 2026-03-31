import { useUserAPI } from '@/hooks/api/useUserAPI';
import { useHealthCenterId } from '@/hooks/useHealthCenterId';
import { useFocusEffect } from '@react-navigation/native';
import { MapPinIcon } from 'phosphor-react-native';
import { useCallback, useState } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  unitId: number
}

export default function UnidadeCard({ unitId, ...rest }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [healthCenter, setHealthCenter] = useState(false);

  const { loadHealthCenterById } = useUserAPI();
  const { updateHealthCenterId } = useHealthCenterId();

  const handleChangeCenter = () => {
    updateHealthCenterId(unitId);
    console.log('unidade selecionada:', unitId);
  }

  useFocusEffect(
      useCallback(() => {
        if (!unitId) return;
    
        (async () => {
          setIsLoading(true)
          const response = await loadHealthCenterById(unitId.toString());
          setHealthCenter(response.name)
          setIsLoading(false)
        })();
      }, [unitId])
    );

  return (
    <TouchableOpacity 
      className="border-b border-neutral-300 flex-row justify-start px-4 py-3 items-center gap-5"
      activeOpacity={0.6}
      onPress={handleChangeCenter}
      {...rest}
    >
      <MapPinIcon size={24} color="#6775B4" />

      <Text allowFontScaling={false} className="text-base text-neutral-900">
        {healthCenter}
      </Text>

    </TouchableOpacity>
  )
}