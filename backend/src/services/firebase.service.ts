import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { firebaseConfig } from 'src/serviceKey';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FirebaseService {
  private storageBucket: any;

  constructor() {
    admin.initializeApp({
      // Add your Firebase service account configuration here
      credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
      storageBucket: firebaseConfig.project_id + '.appspot.com',
    });

    this.storageBucket = admin.storage().bucket();
  }

  async uploadFile(fileBuffer: any, filename: string): Promise<string> {
    const uniqueFilename = `${uuidv4()}_${filename}`;
    const file = this.storageBucket.file(uniqueFilename);

    await file.save(fileBuffer);

    const downloadUrl = await file.getSignedUrl({
      action: 'read',
      expires: '01-01-2030', // Set an appropriate expiration date
    });

    return downloadUrl[0];
  }
}