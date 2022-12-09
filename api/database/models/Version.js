export default class Version {
  #frameworkId; //reference to the framework id of this version
  #id;
  #name;
  #title;
  #description;

  static from(version) {
    if (typeof version == "string") {
      return this.from(JSON.parse(version));
    } else if (typeof version == "object") {
      return new Version(version.frameworkId, version.id, version.name, version.title, version.description);
    }
    return null;
  }

  constructor(frameworkId, id, name, title, description) {
    this.#frameworkId = frameworkId;
    this.#id = id;
    this.#name = name;
    this.#title = title;
    this.#description = description;
  }

  getFrameworkId() {
    return this.#frameworkId;
  }

  getId() {
    return this.#id;
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

  setName(name) {
    this.#name = name;
  }

  setTitle(title) {
    this.#title = title;
  }

  setDescription(description) {
    this.#description = description;
  }

  toObject() {
    return { frameworkId: this.#frameworkId, id: this.#id, name: this.#name, title: this.#title, description: this.#description }
  }

  toJsonObject() {
    return json.stringify(this.toObject());
  }
}