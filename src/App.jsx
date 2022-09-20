import Board from "./features/board";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="bg-black min-h-screen w-full">
      <QueryClientProvider client={queryClient}>
        <Board />
      </QueryClientProvider>
    </div>
  );
}

export default App;
