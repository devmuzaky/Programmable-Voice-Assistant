import {SpeechClient} from "@google-cloud/speech";
import {google} from "@google-cloud/speech/build/protos/protos";
import IRecognitionConfig = google.cloud.speech.v1.IRecognitionConfig;
import * as fs from "fs";
import * as path from "path";

let sttClient: SpeechClient = null;

const sttConfig: IRecognitionConfig = {
  languageCode: "en-US",
  encoding: 'LINEAR16',
  sampleRateHertz: 16000
}

export const sttInit = () => {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(
    process.cwd(),
    '/google-cloud.json'
  )

  sttClient = new SpeechClient();
}

export const googleStt = (event, audio_path) => {
  fs.readFile(audio_path, async (err, data) => {
    if (err) return "error";

    const audioContent = {content: data.toString('base64')};

    const res = await sttClient.recognize({
      audio: audioContent,
      config: sttConfig
    });

    const output = res[0].results
      .map((data) => data.alternatives[0].transcript)
      .join('\n');

    event.reply('stt-reply', output)
  })

};
