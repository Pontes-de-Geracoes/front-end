import { useState } from "react";
import { Typography } from "./components/atoms/typography";
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Hello world, Counter</h1>
      <p>{count}</p>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
      <Button onClick={() => setCount(count + 2)}>Decrement</Button>
      <div className="space-y-8 p-8">
        <Typography variant="h1" as="h1">
          Heading 1
        </Typography>
        <Typography variant="h2" as="h2">
          Heading 2
        </Typography>
        <Typography variant="h3" as="h3">
          Heading 3
        </Typography>
        <Typography variant="h4" as="h4">
          Heading 4
        </Typography>
        <Typography variant="p">
          This is a paragraph. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc
          nisl aliquam nisl, eget aliquam nunc nisl eget nunc.
        </Typography>
        <Typography variant="blockquote" as="blockquote">
          This is a blockquote. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </Typography>
        <Typography variant="list" as="ul">
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </Typography>
        <Typography variant="inlineCode" as="code">
          console.log('Hello, world!')
        </Typography>
        <Typography lead>This is lead text.</Typography>
        <Typography large>This is large text.</Typography>
        <Typography small>This is small text.</Typography>
        <Typography muted>This is muted text.</Typography>
      </div>
    </div>
  );
}

export default App;
