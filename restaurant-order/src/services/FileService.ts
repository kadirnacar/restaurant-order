// import * as RNFS from 'react-native-fs';
import { ApplicationState } from '@store';
import * as FileSystem from 'expo-file-system';
import * as path from 'path';

class FileServiceHelper {
    stateFile: string = path.join(FileSystem.documentDirectory, 'state.json');

    public async readStateFromFile(): Promise<any> {
        try {
            const fileInfo = await FileSystem.getInfoAsync(this.stateFile);
            if (!fileInfo.exists) {
                return {};
            }
            const content = await FileSystem.readAsStringAsync(this.stateFile);
            const result: ApplicationState = JSON.parse(content);
            return result;
        } catch (ex) {
            console.log(ex)
            return {};
        }
    }

    public async saveStateToFile(state: ApplicationState): Promise<void> {
        try {
            await FileSystem.writeAsStringAsync(this.stateFile, JSON.stringify(state));
        } catch{ }
    }
}

export const FileService = new FileServiceHelper();