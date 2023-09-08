import { drive_v3 } from 'googleapis';

export interface DownloadedFileModel {
  id: number,
  file: drive_v3.Schema$File,
}