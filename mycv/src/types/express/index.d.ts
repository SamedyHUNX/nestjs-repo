// src/types/express/index.d.ts
import { User } from '../../users/user.entity';

declare module 'express' {
  interface Request {
    currentUser?: User | null;
  }
}
