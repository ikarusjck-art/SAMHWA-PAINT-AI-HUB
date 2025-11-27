import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateRnDContent = async (prompt: string, modelName: string = 'gemini-2.5-flash'): Promise<string> => {
  if (!ai) {
    return "API Key가 설정되지 않았습니다. 환경 변수를 확인해주세요.";
  }

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction: "당신은 삼화페인트의 수석 연구원을 보조하는 AI R&D 전문가입니다. 화학, 재료 공학, 도료 기술에 대한 깊은 지식을 바탕으로 전문적이고 논리적인 답변을 제공하세요. 답변은 한국어로 명확하게 작성하며, 마크다운 형식을 사용하여 가독성을 높이세요.",
      }
    });

    return response.text || "응답을 생성할 수 없습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`;
  }
};

export const generateOfficeTask = async (prompt: string): Promise<string> => {
    if (!ai) {
      return "API Key가 설정되지 않았습니다.";
    }
  
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: "당신은 유능한 비즈니스 AI 비서입니다. 사용자의 요청에 따라 비즈니스 이메일 초안, 엑셀 수식, 회의록 요약, 번역 등의 업무를 수행합니다. 답변은 정중하고 실무에 바로 사용할 수 있도록 구체적으로 작성하세요.",
        }
      });
  
      return response.text || "응답을 생성할 수 없습니다.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return `오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`;
    }
  };

export const generateLabChat = async (prompt: string): Promise<string> => {
    if (!ai) {
        return "API Key가 설정되지 않았습니다.";
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: "당신은 'ChemAI Research Assistant'입니다. 삼화페인트 연구원들의 실험 설계, 논문 분석, 소재 추천을 돕는 고도화된 연구 파트너입니다. 답변은 매우 전문적이어야 하며, 화학식이나 실험 절차는 정확하게 기술하세요. 불확실한 내용은 추측하지 말고 솔직하게 모른다고 답해야 합니다. 어조는 차분하고 지적이어야 합니다.",
            }
        });
        return response.text || "응답을 생성할 수 없습니다.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return `오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`;
    }
};