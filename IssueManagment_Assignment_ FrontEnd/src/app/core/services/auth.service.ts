import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[] = [];

  addUser(user: User): void {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    localStorage.setItem('users', JSON.stringify([...existingUsers, user]));
  }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  getUserById(id: string): User | undefined {
    const users = this.getUsers();
    return users.find(user => user.id === id);
  }

  logout():void {
    localStorage.removeItem('loggedInUser');

  }

  constructor() { }
}
