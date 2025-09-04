import Header from '@/components/Header';
import PhotoCard from '@/components/PhotoCard';
import { TitleText } from '@/components/TitleText';
import { router, useLocalSearchParams } from "expo-router";
import { View } from 'react-native';

export default function TermoConsentimentoDetails() {

  const { id } = useLocalSearchParams();

  const PHOTOS = [
    {
      id: 1,
      url: "https://thestartlaw.com/wp-content/uploads/2022/10/TERMOS_DE_USO.png"
    },
    {
      id: 2,
      url: "https://vivaocondominio.com.br/wp-content/uploads/2022/05/Termo-de-responsabilidade.jpg"
    },
    {
      id: 3,
      url: "https://www.administrefacil.com.br/images/modelos/400x500/1468-83ca0590a2a926a0a605713b1f046071.gif"
    },
    {
      id: 4,
      url: "https://thestartlaw.com/wp-content/uploads/2022/10/TERMOS_DE_USO.png"
    },
    {
      id: 5,
      url: "https://vivaocondominio.com.br/wp-content/uploads/2022/05/Termo-de-responsabilidade.jpg"
    },
  ]

  return (
    <View className="flex-1 bg-white p-safe">

      <Header icon="back" title="" onPress={()=> router.push({pathname: "/(app)/(patient)/patient/[id]", params: {id: id.toString()}})} />

      <View className="py-6 px-8">
        <TitleText title="Termo de consentimento" description="Veja abaixo a(s) foto(s) do termo de consentimento. Toque para ampliar." />

        <View className="flex-row flex-wrap gap-4 mt-8">

          {PHOTOS.map((item)=> (
            <PhotoCard key={item.id} image={item.url} />
          ))}
          
        </View>
      </View>

      


      


    </View>
  );
}
