import { Suspense } from "react";
import {
  Counter,
  CounterMutation,
  CounterNesting,
  CounterPromise,
  CounterRPC,
} from "./Counter.js";
import { getCounter, greet, increment } from "./_rpc.js";

type ServerFunction<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => Promise<R>
  : never;

function App({ name = "Anonymous" }) {
  const delayedMessage = new Promise<string>((resolve) => {
    setTimeout(() => resolve("Hello from server 💃💃!"), 2000);
  });

  return (
    <div style={{ border: "3px red dashed", margin: "1em", padding: "1em" }}>
      <h1>Hello {name}!!</h1>
      <h3>This is a server component.</h3>
      <Counter />

      {/* 02 async */}
      <Suspense fallback="Pending...">
        <ServerMessage />
      </Suspense>

      {/* 03 promise */}
      <CounterPromise delayedMessage={delayedMessage} />

      {/* 04 rpc */}
      <CounterRPC greet={greet as unknown as ServerFunction<typeof greet>} />

      {/* 05 mutation */}
      <p style={{ color: "red" }}>Server counter: {getCounter()}</p>
      <CounterMutation
        increment={increment as unknown as ServerFunction<typeof increment>}
      />

      {/* 06 nesting server-client-server pattern */}
      <CounterNesting enableInnerApp />
    </div>
  );
}

const ServerMessage = (async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return <p style={{ color: "red" }}>Hello from server!</p>;
}) as any; // FIXME how can we type async component?

export default App;
