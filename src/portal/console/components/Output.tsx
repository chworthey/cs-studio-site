interface IOutputProps {
  text: string;
}

export function Output(props: IOutputProps) {
  return (
    <div className="div__output-container">
      {props.text}
    </div>
  );
};
