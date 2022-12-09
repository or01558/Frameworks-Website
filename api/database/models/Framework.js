import Database from "../../database/Database.js";
import Version from "./Version.js";

export default class Framework {
  #id;
  #type;
  #name;
  #title;
  #description;
  #versions;

  static from(framework) {
    if (typeof framework == "string") {
      return this.from(JSON.parse(framework));
    } else if (typeof framework == "object") {
      return new Framework(framework.id, framework.type, framework.name, framework.title, framework.description, framework.versions.map(vobject => Version.from(vobject)));
    }
    return null;
  }

  static async getById(id) {
    const frameworkPrefix = `frameworks_${id}`;
    const db = Database.getInstance();
    const framework = await db.get(frameworkPrefix);
    return framework ? Framework.from(framework) : null;
  }

  constructor(id, type, name, title = "", description = "", versions = []) {
    this.#id = id;
    this.#type = type;
    this.#name = name;
    this.#title = title;
    this.#description = description;
    this.#versions = versions;
  }

  getId() {
    return this.#id;
  }

  getType() {
    return this.#type;
  }

  getName() {
    return this.#name;
  }

  getTitle() {
    return this.#title;
  }

  getDescription() {
    return this.#description;
  }

  getVersions() {
    return this.#versions;
  }

  setType(type) {
    this.#type = type;
  }

  setName(name) {
    this.#name = name;
  }

  setTitle(title) {
    this.#title = title;
  }

  setDescription(description) {
    this.#description = description;
  }

  setVersions(versions) {
    this.#versions = versions;
  }

  addVersion(version) {
    const versions = this.#versions;
    if (versions.length == 0) {
      versions.unshift(version);
    } else {
      versions.push(version);
    }
  }

  removeVersion(version) {
    this.#versions = this.#versions.filter(v == version);
  }

  toObject() {
    return { id: this.#id, name: this.#name, title: this.#title, description: this.#description, versions: this.#versions.map(v => v.toJsonObject()) }
  }

  toJsonObject() {
    return json.stringify(this.toObject());
  }

  async save() {
    const frameworkId = this.#id;
    const result = await Database.getInstance().set(`frameworks_${frameworkId}`, this.toJsonObject());
    return result;
  }

  async update() {
    const frameworkId = this.#id;
    const frameworkPrefix = `frameworks_${frameworkId}`;
    const db = Database.getInstance();
    const oldFramework = await db.get(frameworkPrefix);
    if (!oldFramework) throw new Error("Framework not exists!, Please create an framework first.");
    const result = await Database.getInstance().set(frameworkPrefix, this.toJsonObject());
    return result;
  }

  async remove() {
    const frameworkId = this.#id;
    const frameworkPrefix = `frameworks_${frameworkId}`;
    const db = Database.getInstance();
    const oldFramework = await db.get(frameworkPrefix);
    if (!oldFramework) throw new Error("Framework not exists!, Please create an framework first.");
    const result = await Database.getInstance().delete(frameworkPrefix);
    return result;
  }
}