import rDatabase from "@replit/database";

export default class Database {
  static #instance;

  static __init() {
    const db = new rDatabase();
    this.#instance = db;
  }

  static getInstance() {
    return this.#instance;
  };

  static setInstance(instance) {
    this.#instance = instance;
  }
}