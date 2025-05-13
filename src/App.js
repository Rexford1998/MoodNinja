import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const analyzeMood = async () => {
    if (!input.trim()) {
      setResponse("Please write something.");
      return;
    }

    setResponse("Analyzing...");

    const prompt = `The following is a person's message. Provide a supportive analysis of their mood and mental state. Be empathetic, and offer a simple, positive reflection or suggestion.\n\nMessage: "${input}"`;

    try {
      const res = await fetch('/.netlify/functions/chatgpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();

      if (data.error) {
        setResponse(`API Error: ${data.error}`);
      } else {
        setResponse(data.reply);
      }
    } catch (err) {
      console.error(err);
      setResponse("Something went wrong.");
    }
  };

  return (
    <div className="App">
      <h2>How are you feeling today?</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your thoughts here..."
        rows="6"
        style={{ width: '100%' }}
      />
      <br />
      <button onClick={analyzeMood}>Analyze</button>
      <div style={{ marginTop: '20px', background: '#f2f2f2', padding: '10px' }}>
        {response}
      </div>
    </div>
  );
}

export default App;
