import { useState } from "react";
import "./App.css";
import { Configuration, OpenAIApi } from "openai";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isOutput, setIsOuput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      generateImage();
    }
  };

  const generateImage = async () => {
    setIsLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    setResult(res.data.data[0].url);
    setIsLoading(false);
    setIsOuput(true);
  };

  return (
    <div className="app-main">
      <h1> OpenAI Image Generator</h1>
      <input
        className="app-input"
        onChange={(e) => setPrompt(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type something to generate an Image.."
      />
      <button onClick={generateImage}> Generate an Image </button>
      <br />
      {isLoading && <div className="loading-indicator">Loading...</div>}
      {isOutput && !isLoading && (
        <img className="ImageOuput" src={result} alt="result" />
      )}
    </div>
  );
}

export default App;
