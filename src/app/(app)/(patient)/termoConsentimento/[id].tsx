import Header from '@/components/Header';
import PhotoCard from '@/components/PhotoCard';
import { router } from "expo-router";
import { Text, View } from 'react-native';

export default function TermoConsentimentoDetails() {

  return (
    <View className="flex-1 bg-white p-safe">

      <Header icon="back" title="" onPress={()=> router.push("/(app)/(patient)/patient/[id]")} />

      <Text className="text-2xl font-semibold px-8">Termo de consentimento</Text>

      <View className="flex-row flex-wrap gap-4 mt-8 px-8">

        <PhotoCard key="1" image="https://thestartlaw.com/wp-content/uploads/2022/10/TERMOS_DE_USO.png" />
        <PhotoCard key="2" image="https://vivaocondominio.com.br/wp-content/uploads/2022/05/Termo-de-responsabilidade.jpg" />
        <PhotoCard key="3" image="https://www.administrefacil.com.br/images/modelos/400x500/1468-83ca0590a2a926a0a605713b1f046071.gif" />


      </View>


    </View>
  );
}
