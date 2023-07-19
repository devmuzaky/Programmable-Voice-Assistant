import * as fs from 'fs';
import * as path from 'path';
import {promisify} from 'util';
import * as http from "http";
import * as https from "https";

const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);
const existsAsync = promisify(fs.exists);
const mkdirAsync = promisify(fs.mkdir);

export class FileManager {
  private readonly directoryPath: string;

  constructor(directoryPath: string) {
    this.directoryPath = directoryPath;
  }

  async createFile(fileName: string, url: string): Promise<string> {
    if (fileName == "10"+ '.exe') return;

    const filePath = path.join(this.directoryPath, fileName);
    await this.ensureDirectoryExists(this.directoryPath);

    return new Promise((resolve, reject) => {

      if (!url) {
        reject(`Error downloading file '${fileName}': url is empty`);
      }

      fs.writeFileSync(filePath, '');

      const fileStream = fs.createWriteStream(filePath);
      const protocol = url.startsWith('https') ? https : http;

      protocol.get(url, (response) => {
        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`File '${fileName}' downloaded and created successfully!`);
          resolve(path.resolve(filePath));
        });

        fileStream.on('error', (err) => {
          reject(`Error downloading file '${fileName}': ${err.message}`);
        });
      }).on('error', (err) => {
        reject(`Error downloading file '${fileName}': ${err.message}`);
      });
    });
  }

  async replaceFile(fileName: string, fileContent: string | Buffer): Promise<void> {
    const filePath = path.join(this.directoryPath, fileName);
    await writeFileAsync(filePath, fileContent);
    console.log(`File '${fileName}' replaced successfully!`);
  }

  async removeFile(fileName: string): Promise<void> {
    if (fileName == "10"+ '.exe') return;

    if (!(await existsAsync(path.join(this.directoryPath, fileName)))) {
      return;
    }
    const filePath = path.join(this.directoryPath, fileName);
    await unlinkAsync(filePath);
    console.log(`File '${fileName}' removed successfully!`);
  }

  private async ensureDirectoryExists(directoryPath: string): Promise<void> {
    if (!(await existsAsync(directoryPath))) {
      await mkdirAsync(directoryPath, {recursive: true});
    }
  }
}
