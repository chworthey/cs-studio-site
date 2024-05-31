interface ITitleOutputProps {
  textParts: string[];
}

export function TitleOutput(props: ITitleOutputProps) {
  return (
    <div className="div__title-output-container">
      {props.textParts.map((p, i) => <pre key={i} className="pre__title-output">
        {p}
      </pre>)}
    </div>
  );
};
