interface ITextPromptProps {
  promptText: string;
  onContinue: () => void;
  onTextChange: (text: string) => void;
  inputText: string;
}

export function TextPrompt(props: ITextPromptProps) {
  return (
    <div className="div__text-prompt-container">
      <div className="div__text-prompt">
        {props.promptText}
      </div>
      <div className="div__text-prompt-input-button-container">
        <div className="div__text-prompt-input">
          <input className="input__text-prompt-input" 
            type="text"
            value={'>\u{2009}' + props.inputText}
            onChange={t => props.onTextChange(t.target.value.substring(2))}/>
        </div>
        <div className="div__text-prompt-button">
          <button className="button__text-prompt-button" onClick={props.onContinue}>Continue</button>
        </div>
      </div>
    </div>
  );
}