interface ISnippetOutputProps {
  text: string;
}

export function SnippetOutput(props: ISnippetOutputProps) {
  return (
    <div className="div__snippet-output-container">
      <pre className="pre__snippet-output">
        {props.text}
      </pre>
    </div>
  );
};
