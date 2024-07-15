interface ITitleOutputProps {
  textParts: string[];
  accessibilityLabel: string;
}

export function TitleOutput(props: ITitleOutputProps) {
  return (
    <h2 className="h2__title-output-container" aria-label={props.accessibilityLabel}>
      {props.textParts.map((p, i) => <pre key={i} aria-hidden={true} className="pre__title-output">
        {p}
      </pre>)}
    </h2>
  );
};
