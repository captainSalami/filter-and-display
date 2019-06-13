class VerbsHTTP {
  async get() {
    const response = await fetch('verbs.json');
    const data = await response.json();
    return data;
  }
}