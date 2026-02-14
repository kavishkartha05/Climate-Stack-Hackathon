import type { DiseaseInfo } from '../types';

export const DISEASE_DB: Record<string, DiseaseInfo> = {
  'Tomato Late Blight': {
    plant: 'Tomato',
    severity: 85,
    severityLabel: 'High',
    severityLevel: 'high',
    description:
      'A water mold (oomycete) infection that spreads rapidly in cool, wet conditions. Can destroy an entire crop within days if left untreated.',
    treatments: [
      'Remove and destroy all infected plant material immediately',
      'Apply copper-based fungicide (organic) or chlorothalonil',
      'Improve airflow — avoid overhead watering',
      'Monitor daily; blight spreads fastest at 60–70°F with high humidity',
    ],
    weatherRiskFactor: 'humidity',
  },
  'Tomato Early Blight': {
    plant: 'Tomato',
    severity: 55,
    severityLabel: 'Moderate',
    severityLevel: 'moderate',
    description:
      'A fungal disease causing concentric ring lesions, progressing upward from older leaves. Rarely fatal but reduces yield significantly.',
    treatments: [
      'Remove lower infected leaves; do not compost them',
      'Apply neem oil or mancozeb fungicide',
      'Mulch soil to reduce spore splash from the ground',
      'Rotate crops — avoid planting tomatoes in the same bed next season',
    ],
    weatherRiskFactor: 'humidity',
  },
  'Tomato Leaf Mold': {
    plant: 'Tomato',
    severity: 50,
    severityLabel: 'Moderate',
    severityLevel: 'moderate',
    description:
      'Fungal infection common in greenhouses and high-humidity environments. Yellow patches on upper leaf surface, olive mold underneath.',
    treatments: [
      'Increase ventilation to reduce relative humidity below 85%',
      'Apply potassium bicarbonate or copper fungicide',
      'Remove heavily infected leaves',
      'Space plants wider to improve air circulation',
    ],
    weatherRiskFactor: 'humidity',
  },
  'Tomato Septoria Leaf Spot': {
    plant: 'Tomato',
    severity: 60,
    severityLabel: 'Moderate',
    severityLevel: 'moderate',
    description:
      'Causes circular spots with dark borders and tan centers. Spreads via water splash and slows fruit production if unchecked.',
    treatments: [
      'Remove infected lower leaves immediately',
      'Apply chlorothalonil or copper-based fungicide',
      'Avoid wetting foliage when irrigating',
      'Stake plants to improve airflow',
    ],
    weatherRiskFactor: 'humidity',
  },
  'Tomato Spider Mites': {
    plant: 'Tomato',
    severity: 45,
    severityLabel: 'Moderate',
    severityLevel: 'moderate',
    description:
      'Tiny arachnids that feed on leaf undersides, causing stippling and bronzing. Hot, dry conditions accelerate population growth.',
    treatments: [
      'Spray plants forcefully with water to dislodge mites',
      'Apply insecticidal soap or neem oil to leaf undersides',
      'Introduce predatory mites (Phytoseiulus persimilis) as biocontrol',
      'Avoid broad-spectrum pesticides that kill natural predators',
    ],
    weatherRiskFactor: null,
  },
  'Tomato Target Spot': {
    plant: 'Tomato',
    severity: 55,
    severityLabel: 'Moderate',
    severityLevel: 'moderate',
    description:
      'Fungal disease producing brown lesions with concentric rings on leaves, stems, and fruit. Thrives in warm, humid conditions.',
    treatments: [
      'Apply fungicide containing azoxystrobin or chlorothalonil',
      'Ensure adequate plant spacing for airflow',
      'Remove crop debris promptly after harvest',
      'Avoid overhead irrigation',
    ],
    weatherRiskFactor: 'humidity',
  },
  'Tomato Yellow Leaf Curl Virus': {
    plant: 'Tomato',
    severity: 90,
    severityLabel: 'Severe',
    severityLevel: 'high',
    description:
      'Viral disease transmitted by whiteflies. Causes severe stunting, leaf curling, and dramatically reduced yield. No cure once infected.',
    treatments: [
      'Remove and destroy infected plants to prevent spread',
      'Control whitefly populations with yellow sticky traps',
      'Apply reflective mulch to repel whiteflies',
      'Plant resistant varieties in future seasons',
    ],
    weatherRiskFactor: null,
  },
  'Tomato Mosaic Virus': {
    plant: 'Tomato',
    severity: 70,
    severityLabel: 'High',
    severityLevel: 'high',
    description:
      'Viral infection causing mosaic patterning and distortion on leaves. Spreads through contact and contaminated tools.',
    treatments: [
      'Remove and destroy infected plants',
      'Disinfect tools with 10% bleach solution between uses',
      'Wash hands after handling infected plants',
      'Control aphid vectors; there is no chemical cure',
    ],
    weatherRiskFactor: null,
  },
  'Apple Scab': {
    plant: 'Apple',
    severity: 65,
    severityLabel: 'Moderate',
    severityLevel: 'moderate',
    description:
      'Fungal infection causing dark scabby lesions on leaves and fruit. Spreads through spores released during wet spring conditions.',
    treatments: [
      'Apply myclobutanil or sulfur fungicide at bud break',
      'Rake and dispose of fallen leaves in autumn',
      'Select scab-resistant varieties for future plantings',
      'Prune to open the canopy for better air circulation',
    ],
    weatherRiskFactor: 'rain',
  },
  'Apple Black Rot': {
    plant: 'Apple',
    severity: 75,
    severityLabel: 'High',
    severityLevel: 'high',
    description:
      'Fungal disease causing frog-eye leaf spots and fruit rot. Infected fruit mummifies on the tree, serving as a source of future infection.',
    treatments: [
      'Prune out dead wood and cankers during dormant season',
      'Remove mummified fruit from tree and ground',
      'Apply captan or myclobutanil fungicide',
      'Maintain tree vigor with proper nutrition',
    ],
    weatherRiskFactor: 'rain',
  },
  'Corn (Maize) Common Rust': {
    plant: 'Corn',
    severity: 50,
    severityLabel: 'Moderate',
    severityLevel: 'moderate',
    description:
      'Fungal rust producing brick-red pustules on both leaf surfaces. Spreads via airborne spores, favored by cool humid nights.',
    treatments: [
      'Apply triazole or strobilurin fungicide if infection is early',
      'Plant resistant hybrid varieties in future seasons',
      'Monitor at VT/R1 growth stage when risk is highest',
      'Ensure adequate potassium nutrition — deficiency increases susceptibility',
    ],
    weatherRiskFactor: 'humidity',
  },
  'Corn (Maize) Northern Leaf Blight': {
    plant: 'Corn',
    severity: 65,
    severityLabel: 'Moderate',
    severityLevel: 'moderate',
    description:
      'Fungal disease causing long, cigar-shaped gray-green lesions. Severe infections can cause significant yield loss.',
    treatments: [
      'Apply strobilurin or triazole fungicide at tasseling',
      'Plant resistant hybrids for future seasons',
      'Rotate with non-host crops like soybeans',
      'Till infected residue to reduce inoculum',
    ],
    weatherRiskFactor: 'humidity',
  },
  'Grape Black Rot': {
    plant: 'Grape',
    severity: 75,
    severityLabel: 'High',
    severityLevel: 'high',
    description:
      'Fungal disease that can destroy up to 80% of a harvest. Causes circular brown lesions on leaves and mummified fruit.',
    treatments: [
      'Apply mancozeb or myclobutanil beginning at budbreak',
      'Remove mummified fruit and infected canes during dormant pruning',
      'Ensure good airflow through the canopy',
      'Treat preventively — curative options are limited once fruit is infected',
    ],
    weatherRiskFactor: 'rain',
  },
  'Potato Early Blight': {
    plant: 'Potato',
    severity: 50,
    severityLabel: 'Moderate',
    severityLevel: 'moderate',
    description:
      'Reduces photosynthesis and weakens tuber development. Most severe on stressed or nutrient-deficient plants.',
    treatments: [
      'Ensure adequate nitrogen and potassium fertilization',
      'Apply chlorothalonil or copper fungicide preventively',
      'Hill soil around stems to protect developing tubers',
      'Harvest promptly when vines die back',
    ],
    weatherRiskFactor: 'humidity',
  },
  'Potato Late Blight': {
    plant: 'Potato',
    severity: 90,
    severityLabel: 'Severe',
    severityLevel: 'high',
    description:
      'The same pathogen responsible for the Irish Famine. Can devastate an entire field in days under cool, moist conditions.',
    treatments: [
      'Apply copper or chlorothalonil fungicide immediately',
      'Destroy infected plants — do not compost',
      'Do not harvest during wet weather',
      'Use certified disease-free seed potatoes next season',
    ],
    weatherRiskFactor: 'humidity',
  },
  Healthy: {
    plant: 'Plant',
    severity: 0,
    severityLabel: 'None',
    severityLevel: 'none',
    description:
      'No disease detected. This leaf appears healthy with no visible signs of fungal, bacterial, or viral infection.',
    treatments: [
      'Continue current care practices',
      'Monitor regularly — early detection is key',
      'Ensure balanced nutrition and adequate water',
      'Consider preventive measures if wet weather is forecast',
    ],
    weatherRiskFactor: null,
  },
};

export function getFallbackEntry(label: string): DiseaseInfo {
  const plant = label.split(' ')[0] ?? 'Unknown';
  return {
    plant,
    severity: 45,
    severityLabel: 'Unknown',
    severityLevel: 'moderate',
    description: `Detected: ${label}. Consult a local agricultural extension service for a definitive diagnosis.`,
    treatments: [
      'Isolate affected plants from healthy ones',
      'Photograph and document spread over 48 hours',
      'Contact your county agricultural extension office',
      'Consider submitting a sample to a plant diagnostic lab',
    ],
    weatherRiskFactor: 'humidity',
  };
}
