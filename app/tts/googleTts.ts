import {TextToSpeechClient} from "@google-cloud/text-to-speech";
import {google} from "@google-cloud/text-to-speech/build/protos/protos";
import * as path from "path";
import ISynthesizeSpeechRequest = google.cloud.texttospeech.v1.ISynthesizeSpeechRequest;

let ttsClient: TextToSpeechClient = null;


export const ttsInit = () => {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(process.cwd(), '/google-cloud.json')

  ttsClient = new TextToSpeechClient();
}

export const listVoices = async (languageCode) => {
  const [result] = await ttsClient.listVoices({languageCode});
  return result.voices;
}

export const synthesize = async (text: string) => {
  const request: ISynthesizeSpeechRequest = {
    input: {text},
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    audioConfig: {audioEncoding: 'LINEAR16', sampleRateHertz: 16000},
  };

  const [response] = await ttsClient.synthesizeSpeech(request);


  return response.audioContent;
}

export const googleTts = async (event, text) => {
  const audioContent = await synthesize(text);
  event.reply('tts-reply', audioContent);
}

