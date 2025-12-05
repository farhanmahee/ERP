import { Injectable } from '@nestjs/common';
import { getSecondaryFirestore } from '../../config/firebase.config';

@Injectable()
export class LoggingService {
  private readonly firestore = getSecondaryFirestore();

  async log(level: 'info' | 'warn' | 'error', message: string, data: object = {}) {
    const logEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...data,
    };

    try {
      await this.firestore.collection('logs').add(logEntry);
    } catch (error) {
      console.error('Failed to write log to Firestore:', error);
    }
  }
}
