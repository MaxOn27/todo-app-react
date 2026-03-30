declare module 'react-speech-recognition' {
  export interface SpeechRecognitionOptions {
    continuous?: boolean;
    language?: string;
  }

  export interface UseSpeechRecognitionReturn {
    transcript: string;
    listening: boolean;
    resetTranscript: () => void;
    browserSupportsSpeechRecognition: boolean;
    isMicrophoneAvailable: boolean;
    finalTranscript: string;
    interimTranscript: string;
  }

  export function useSpeechRecognition(): UseSpeechRecognitionReturn;

  const SpeechRecognition: {
    startListening: (options?: SpeechRecognitionOptions) => Promise<void>;
    stopListening: () => Promise<void>;
    abortListening: () => Promise<void>;
    getRecognition: () => SpeechRecognition | null;
  };

  export default SpeechRecognition;
}
