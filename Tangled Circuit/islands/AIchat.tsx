import { useState, useEffect, useRef } from "preact/hooks";
import { marked } from "marked";
import clipboardCopy from "clipboard-copy";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function AIChat({ onNavigateBack }: { onNavigateBack: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (inputMessage.trim() === "" || isLoading) return;
    setIsLoading(true);
    setError(null);
    const newMessage: ChatMessage = { role: "user", content: inputMessage };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage("");

    try {
      const response = await fetch("/api/aichat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputMessage })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let aiReply: ChatMessage = { role: "assistant", content: "" };
      setMessages(prevMessages => [...prevMessages, aiReply]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0].delta.content;
              if (content) {
                aiReply = { ...aiReply, content: aiReply.content + content };
                setMessages(prevMessages => [
                  ...prevMessages.slice(0, -1),
                  aiReply
                ]);
              }
            } catch (e) {
              console.error('Error parsing JSON:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setError((error as Error).message || 'An error occurred while fetching the AI response');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      onNavigateBack();
    }, 500);
  };

  const copyMessage = (content: string) => {
    clipboardCopy(content);
  };

  return (
    <div class={`fixed inset-0 bg-gray-900 overflow-hidden transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'} flex flex-col`}>
      <div class="sticky top-0 z-10 p-4 flex flex-col items-center border-b border-green-500 bg-gray-900">
        <button
          onClick={handleExit}
          class="text-red-500 hover:text-red-300"
        >
          Exit
        </button>
      </div>
      <div class="flex-grow overflow-y-auto">
        <div ref={chatContainerRef} class="p-2">
          {messages.map((msg, index) => (
            <div key={index} class="mb-4 flex justify-center">
              <div class="max-w-[120ch] w-full">
                <div class={`p-4 rounded-lg border-2 border-green-500 bg-gray-900 text-green-300 relative shadow-[0_0_10px_#00ff00]`}>
                  <div class="flex justify-between items-center mb-2">
                    <span class="font-bold">{msg.role === "user" ? "You" : "Deno"}</span>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: marked(msg.content) }}
                    class="markdown-content text-sm break-words whitespace-pre-wrap"
                  />
                  <button
                    onClick={() => copyMessage(msg.content)}
                    class="absolute bottom-2 right-2 text-xs bg-green-700 hover:bg-green-600 text-green-300 p-1 rounded"
                  >
                    📋
                  </button>
                </div>
              </div>
            </div>
          ))}
          {isLoading && <div class="text-green-500 text-center">Deno is thinking...</div>}
          {error && <div class="text-red-500 text-center">{error}</div>}
        </div>
      </div>
      <div class="sticky bottom-0 p-4 border-t border-green-500 bg-gray-900">
        <div class="flex justify-center">
          <div class="max-w-[120ch] w-full flex">
            <input
              type="text"
              value={inputMessage}
              onInput={(e) => setInputMessage(e.currentTarget.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              class="flex-grow p-2 rounded-l-lg focus:outline-none hacker-input"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading}
              class="bg-green-700 text-green-300 p-2 rounded-r-lg hover:bg-green-600 focus:outline-none border-2 border-green-500 shadow-[0_0_10px_#00ff00]"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}