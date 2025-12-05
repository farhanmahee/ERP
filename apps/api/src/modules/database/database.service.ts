import { Injectable } from '@nestjs/common';
import { getPrimaryFirestore } from '../../config/firebase.config';

@Injectable()
export class DatabaseService {
  private readonly firestore = getPrimaryFirestore();

  async getUsers() {
    const usersSnapshot = await this.firestore.collection('users').get();
    const users = usersSnapshot.docs.map(doc => doc.data());
    return users;
  }
}
