import { LesionProps, PatientProps } from "@/types/forms";
import { formatCPF } from "@/utils/formatCPF";
import { formatDateFromApi } from "@/utils/formatDate";
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { useState } from "react";

type useGeneratePDFProps = {
  lesion: LesionProps;
  patient: PatientProps;
};

export function useGeneratePDF({lesion, patient}: useGeneratePDFProps) {

  const [isLoadingPDF, setIsLoadingPDF] = useState(false);

  const inflamationItems = {
    increased_pain: "Dor aumentada",
    perilesional_erythema: "Eritema perilesional",
    perilesional_edema: "Edema perilesional",
    heat_or_warm_skin: "Calor / pele quente",
    increased_exudate: "Exsudato aumentado",
    purulent_exudate: "Exsudato purulento",
    friable_tissue: "Tecido friável ou facilmente sangrante",
    stagnant_wound: "Ferida estagnada, sem melhora de cicatrização",
    biofilm_compatible_tissue: "Tecido compatível com biofilme",
    odor: "Odor",
    hypergranulation: "Hipergranulação",
    wound_size_increase: "Aumento do tamanho da ferida",
    satallite_lesions: "Lesões satélite",
    grayish_wound_bed: "Leito de ferida com aspecto acinzentado",
  };

  

  const isCancer = lesion?.cancer_forms?.length;
  const isWound = lesion?.wounds?.length;

  const registrosHtml = isCancer
  ? lesion.cancer_forms
      .map((registro) => {

        // local
        const imageGroups: string[] = registro.images.map(({ image }) => `<img src="${image.replace("localhost", "192.168.15.82")}" style="max-width: 100%; width: 32%; height: auto;" />`);

        // prod
        // const imageGroups: string[] = registro.images.map(({ image }) => `<img src="${image}" style="max-width: 100%; height: auto;" />`);

        return `
          <div style="margin-top: 20px; width: auto; margin-bottom: 50px; border-bottom: 1px solid #273161; padding-bottom: 50px;">

            <h2 style="color: #273161; font-size: 16px; font-weight: bold;">Registro de ${formatDateFromApi(registro.created_at)}</h2>

            <h3 style="color: #344281; font-size: 14px; font-weight: bold;">Imagens capturadas:</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
              ${imageGroups}
            </div>

            <div style="width: auto;">
              <h3 style="color: #273161; font-size: 14px; font-weight: bold; margin-bottom: 20px;">Questionário ABCDE:</h3>

              <h4 style="color: #4052A1; font-size: 14px; font-weight: bold; margin-bottom: 0;">A - Assimetria</h4>
              <p style="color: #344281; font-size: 14px; font-weight: bold; margin-top: 8px; margin-bottom: 8px;">A lesão apresenta simetria entre suas metades?</p>
              <p style="color: #060810; font-size: 14px; margin-top: 0;">
                ${
                  registro.asymmetry === 'symmetric'
                    ? 'Sim, a lesão é simétrica (forma uniforme)'
                    : registro.asymmetry === 'asymmetric'
                    ? 'Não, a lesão é assimétrica (uma metade é diferente da outra)'
                    : 'Não informado'
                }
              </p>

              <h4 style="color: #4052A1; font-size: 14px; font-weight: bold; margin-bottom: 0;">B - Bordas</h4>
              <p style="color: #344281; font-size: 14px; font-weight: bold; margin-top: 8px; margin-bottom: 8px;">Como são as bordas da lesão?</p>
              <p style="color: #060810; font-size: 14px; margin-top: 0;">
                ${
                  registro.border === 'regular_well_defined'? 'Regulares e bem definidas' :
                  registro.border === 'irregular_poorly_defined'? 'Irregulares, mal definidas, com contornos serrilhados ou borrados' :
                  'Não informado'
                }
              </p>

              <h4 style="color: #4052A1; font-size: 14px; font-weight: bold; margin-bottom: 0;">C - Cor</h4>
              <p style="color: #344281; font-size: 14px; font-weight: bold; margin-top: 8px; margin-bottom: 8px;">A lesão apresenta variação de cor?</p>
              <p style="color: #060810; font-size: 14px; margin-top: 0;">
                ${
                  registro.color_variation === 'single_color'? 'Uma única cor (ex: castanho claro ou escuro)' :
                  registro.color_variation === 'three_or_more_colors'? 'Três ou mais cores (ex: marrom, preto, vermelho, branco, azul)' :
                  'Não informado'
                }
              </p>

              <h4 style="color: #4052A1; font-size: 14px; font-weight: bold; margin-bottom: 0;">D - Diâmetro</h4>
              <p style="color: #344281; font-size: 14px; font-weight: bold; margin-top: 8px; margin-bottom: 8px;">Qual o tamanho aproximado da lesão?</p>
              <p style="color: #060810; font-size: 14px; margin-top: 0;">
                ${
                  registro.diameter === 'under_6mm'? 'Menor que 6 mm (menor que uma borracha de lápis)' :
                  registro.diameter === 'over_or_equal_6mm'? 'Maior ou igual a 6 mm.' :
                  'Não informado'
                }
              </p>

              <h4 style="color: #4052A1; font-size: 14px; font-weight: bold; margin-bottom: 0;">E - Evolução</h4>
              <p style="color: #344281; font-size: 14px; font-weight: bold; margin-top: 8px; margin-bottom: 8px;">A lesão mudou ao longo do tempo?</p>
              <p style="color: #060810; font-size: 14px; margin-top: 0;">
                ${
                  registro.evolution === 'no_changes'? 'Não houve mudanças perceptíveis nos últimos meses' :
                  registro.evolution === 'recent_changes'? 'Houve mudança de forma, tamanho, cor, coceira ou sangramento recentemente' :
                  'Não informado'
                }
              </p>
            </div>

            
          </div>
        `;
      })
      .join('')
  : isWound 
  ? lesion.wounds
      .map((registro) => {
        const inflamationGroup = Object.keys(registro)
        .filter((key) => registro[key as keyof typeof registro] === true)
        .map(key => inflamationItems[key as keyof typeof inflamationItems]);

        // local
        const imageGroups: string[] = registro.images.map(({ image }) => `<img src="${image.replace("localhost", "192.168.15.82")}" style="max-width: 100%; width: 32%; height: auto;" />`);

        // prod
        // const imageGroups: string[] = registro.images.map(({ image }) => `<img src="${image}" style="max-width: 100%; height: auto;" />`);

        return `
          <div style="margin-top: 20px; width: auto; margin-bottom: 50px; border-bottom: 1px solid #273161; padding-bottom: 50px;">
                      
            <h2 style="color: #273161; font-size: 16px; font-weight: bold;">Registro de ${formatDateFromApi(registro.created_at)}</h2>

            <h3 style="color: #344281; font-size: 14px; font-weight: bold;">Imagens capturadas:</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
              ${imageGroups}
            </div>

            <div style="width: auto;">
            
            <h3 style="color: #273161; font-size: 14px; font-weight: bold; margin-bottom: 20px;">RESVECH</h3>
            
            <div style="background-color: #F5F6FA; padding: 10px 15px; width: auto; border-radius: 10px; max-width: 200px;">
              <h4 style="margin: 0 0 10px 0; color: #273161; font-weight: bold; font-size: 14px;">Pontuação total</h4>
              <p style="margin: 0; color: #060810; font-size: 14px;">${registro.total_score ?? 'Não informado'}</p>
            </div>

            <h4 style="color: #4052A1; font-size: 14px; font-weight: bold; margin-bottom: 0;">Dimensão da lesão</h4>
            <p style="color: #060810; font-size: 14px; margin-top: 10px;">${
              registro.width_mm === 0 ? 'Área = 0m²' :
              registro.width_mm === 17 ? 'Área < 4cm²' :
              registro.width_mm === 20 ? 'Área = entre 4cm² e 16cm²' :
              registro.width_mm === 40 ? 'Área = entre 16cm² e 36cm²' :
              registro.width_mm === 60 ? 'Área = entre 36cm² e 64cm²' :
              registro.width_mm === 80 ? 'Área = entre 64cm² e 100cm²' :
              registro.width_mm === 100 ? 'Área > 100cm²' :
              'Não informado'
            }</p>

            <h4 style="color: #4052A1; font-size: 14px; font-weight: bold; margin-bottom: 0;">Profundidade do tecido atingido</h4>
            <p style="color: #060810; font-size: 14px; margin-top: 10px;">${
              registro.depth_of_tissue_injury === 'intact_skin'? 'Pele intacta regenerada ou cicatrizada' :
              registro.depth_of_tissue_injury === 'epidermis_dermis'? 'Atingimento de epiderme e derme' :
              registro.depth_of_tissue_injury === 'hypodermis_subcutaneous'? 'Atingimento de tela subcutânea ou tecido adiposo sem atingir a fáscia muscular' :
              registro.depth_of_tissue_injury === 'muscle_tissue'? 'Atingimento muscular' :
              registro.depth_of_tissue_injury === 'bone_tissue'? 'Atingimento ósseo e/ou tecidos anexos (tendões, ligamentos, cápsula articular) ou necrose negra, não permitindo visualização de tecidos subjacentes' :
              'Não informado'
            }</p>

            <h4 style="color: #4052A1; font-size: 14px; font-weight: bold; margin-bottom: 0;">Bordos</h4>
            <p style="color: #060810; font-size: 14px; margin-top: 10px;">${
              registro.wound_edges === 'no_edges'? 'Ausência de bordos e ferida' :
              registro.wound_edges === 'diffuse'? 'Difusos' :
              registro.wound_edges === 'well_defined'? 'Delimitados' :
              registro.wound_edges === 'damaged'? 'Lesados' :
              registro.wound_edges === 'thickened'? 'Espessos ("envelhecimento", "evertidos")' :
              'Não informado'
            }</p>

            <h4 style="color: #4052A1; font-size: 14px; font-weight: bold; margin-bottom: 0;">Tipo de tecido presente no leito da ferida</h4>
            <p style="color: #060810; font-size: 14px; margin-top: 10px;">${
              registro.wound_bed_tissue === 'regenerated_scarred'? 'Tecido regenerado/cicatrizado' :
              registro.wound_bed_tissue === 'epithelialization'? 'Tecido epitelial' :
              registro.wound_bed_tissue === 'granulation'? 'Tecido de granulação' :
              registro.wound_bed_tissue === 'devitalized_fibrinous'? 'Tecido desvitalizado e/ou fibrinoso' :
              registro.wound_bed_tissue === 'necrotic'? 'Tecido necrótico (necrose seca ou úmida)' :
              'Não informado'
            }</p>

            <h4 style="color: #4052A1; font-size: 14px; font-weight: bold; margin-bottom: 0;">Exsudato</h4>
            <p style="color: #060810; font-size: 14px; margin-top: 10px;">${
              registro.exudate_type === 'dry'? 'Seco' :
              registro.exudate_type === 'moist'? 'Úmido' :
              registro.exudate_type === 'wet'? 'Molhado' :
              registro.exudate_type === 'saturated'? 'Saturado ou elevado' :
              registro.exudate_type === 'leakage'? 'Com fuga de exsudato' :
              'Não informado'
            }</p>

            <h4 style="color: #4052A1; font-size: 14px; font-weight: bold; margin-bottom: 0;">Infecção/Inflamação</h4>
            <p style="color: #060810; font-size: 14px; margin-top: 10px;">${ inflamationGroup && inflamationGroup.join(', ')}</p>
            </div>

            

          </div>
        `;
      })
      .join('')
  : '';
  
  
  const html = `
<html>
  <body>
    <div style="margin: 50px; font-family: Arial, sans-serif;">

      <div style="display: flex; border: 1px solid #A9ADC0; justify-content: space-around; width: 100%; align-items: stretch;">

        <div style="padding: 12px; width: 100%;">
          <h1 style="color: #080A13; font-size: 15px; font-weight: bold; margin: 0 0 5px 0;">Paciente:</h1>
          <p style="color: #080A13; font-size: 13px; margin: 0;">${patient?.user?.name}</p>
        </div>

        <div style="border-right: 1px solid #A9ADC0; border-left: 1px solid #A9ADC0; padding: 12px; width: 100%;">
          <h1 style="color: #080A13; font-size: 15px; font-weight: bold; margin: 0 0 5px 0;">CPF:</h1>
          <p style="color: #080A13; font-size: 13px; margin: 0;">${formatCPF(patient?.user?.cpf || '')}</p>
        </div>

        <div style="padding: 12px; width: 100%;">
          <h1 style="color: #080A13; font-size: 15px; font-weight: bold; margin: 0 0 5px 0;">Local da lesão:</h1>
          <p style="color: #080A13; font-size: 13px; margin: 0;">
            ${
              lesion.location === 'head_neck.scalp' ? 'Couro cabeludo' :
              lesion.location === 'head_neck.forehead' ? 'Testa' :
              lesion.location === 'head_neck.eyes' ? 'Olhos' :
              lesion.location === 'head_neck.nose' ? 'Nariz' :
              lesion.location === 'head_neck.mouth' ? 'Boca' :
              lesion.location === 'head_neck.ears' ? 'Orelhas' :
              lesion.location === 'head_neck.neck' ? 'Pescoço' :
              lesion.location === 'head_neck.face' ? 'Rosto' :
              lesion.location === 'trunk.chest_front' ? 'Tórax anterior' :
              lesion.location === 'trunk.chest_back' ? 'Tórax posterior' :
              lesion.location === 'trunk.upper_abdomen' ? 'Abdome superior' :
              lesion.location === 'trunk.lower_abdomen' ? 'Abdome inferior' :
              lesion.location === 'trunk.back' ? 'Costas' :
              lesion.location === 'trunk.flanks' ? 'Flancos' :
              lesion.location === 'pelvis.genitals' ? 'Genitais' :
              lesion.location === 'pelvis.pubis' ? 'Púbe' :
              lesion.location === 'pelvis.buttocks' ? 'Glúteos' :
              lesion.location === 'pelvis.coccyx' ? 'Cóccix' :
              lesion.location === 'extremities.shoulder_right' ? 'Ombro direito' :
              lesion.location === 'extremities.shoulder_left' ? 'Ombro esquerdo' :
              lesion.location === 'extremities.arm_right' ? 'Braço direito' :
              lesion.location === 'extremities.arm_left' ? 'Braço esquerdo' :
              lesion.location === 'extremities.forearm_right' ? 'Antebraço direito' :
              lesion.location === 'extremities.forearm_left' ? 'Antebraço esquerdo' :
              lesion.location === 'extremities.hand_right' ? 'Mão direita' :
              lesion.location === 'extremities.hand_left' ? 'Mão esquerda' :
              lesion.location === 'extremities.thigh_right' ? 'Coxa direita' :
              lesion.location === 'extremities.thigh_left' ? 'Coxa esquerda' :
              lesion.location === 'extremities.leg_right' ? 'Perna direita' :
              lesion.location === 'extremities.leg_left' ? 'Perna esquerda' :
              lesion.location === 'extremities.foot_right' ? 'Pé direito' :
              lesion.location === 'extremities.foot_left' ? 'Pé esquerdo' :
              'Lesão'
            }
          </p>
        </div>

      </div>

      <h1 style="font-size: 17px; font-weight: bold; color: #080A13; text-decoration: underline; margin-top: 20px;">Histórico de registros da lesão: </h1>

      ${registrosHtml}
    </div>
  </body>
</html>
`;


const generatePdf = async () => {
  setIsLoadingPDF(true)
  const file = await printToFileAsync({
    html: html,
    base64: true,
    width: 595,
    height: 842
  });
  
  setIsLoadingPDF(false)

  await shareAsync(file.uri, { UTI: '.pdf', mimeType: 'application/pdf' });

  
};



  return {
    generatePdf,
    isLoadingPDF
  };
}