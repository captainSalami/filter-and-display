// class PhraseHTTP {
//   async get() {
//     const response = await fetch('phrase.json');
//     const data = await response.json();
//     return data;
//   }
// }

class EasyHTTP {
  async get() {
    const response = await fetch('phrase.json');
    const phraseData = await response.json();
    return {
      phrases : phraseData
    }
  }
}