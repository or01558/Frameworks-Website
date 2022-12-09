import Database from "../Database.js";
import sha256 from "sha256";

export default class User {
  #id;
  #username;
  #email;
  #password;
  static #ID_Length = 16;
  
  static async generateNewId() {
    let id = 0;
    
    for(let i = 0; i < this.#ID_Length; i++) {
      const unit = Math.floor(Math.random() * 9) + 1;
      id = id * 10 + unit; 
    }

    const found = await this.getById(id);
    if(found) return this.generateNewId();
    return id;
  }
  
  static from(user) {
    if (typeof user == "string") {
      return this.from(JSON.parse(user));
    } else if (typeof user == "object") {
      return new User(user.id, user.username, user.email, user.password);
    }
    return null;
  }

  static sameUsername(json) {
    const username = this;
    if (json) {
      const user = User.from(json);
      return user ? user.getUsername() === username : false;
    }
    return false;
  }
  
  static async getByUsername(username) {
    const usersPrefix = `users`;
    const db = Database.getInstance();
    const users = await db.list(usersPrefix);
    return users ? User.from(users.filter(this.sameUsername.bind(username))[0]) : null;
  }

  static async getById(id) {
    const userPrefix = `users_${id}`;
    const db = Database.getInstance();
    const user = await db.get(userPrefix);
    return user ? User.from(user) : null;
  }

  constructor(id, username, email, password) {
    this.#id = id;
    this.#username = username;
    this.#email = email;
    this.#password = sha256(password);
  }

  getId() {
    return this.#id;
  }

  getUsername() {
    return this.#username;
  }

  getEmail() {
    return this.#email;
  }

  setUsername(username) {
    this.#username = username;
  }

  setEmail(email) {
    this.#email = email;
  }

  setPassword(password) {
    this.#password = password;
  }

  toObject() {
    const user = { id: this.#id, username: this.#username, email: this.#email, password: this.#password };
    return user;
  }

  toJsonObject() {
    return JSON.stringify(this.toObject());
  }

  async save() {
    const userId = this.#id;
    const result = await Database.getInstance().set(`users_${userId}`, this.toJsonObject());
    return result;
  }

  async update() {
    const userId = this.#id;
    const userPrefix = `users_${userId}`;
    const db = Database.getInstance();
    const oldUser = await db.get(userPrefix);
    if (!oldUser) throw new Error("User not exists!, Please create an user first.");
    const result = await Database.getInstance().set(userPrefix, this.toJsonObject());
    return result;
  }

  async remove() {
    const userId = this.#id;
    const userPrefix = `users_${userId}`;
    const db = Database.getInstance();
    const oldUser = await db.get(userPrefix);
    if (!oldUser) throw new Error("User not exists!, Please create an user first.");
    const result = await Database.getInstance().delete(userPrefix);
    return result;
  }

} 