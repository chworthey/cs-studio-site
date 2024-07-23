interface ITextPromptProps {
  idPrefix: string;
  isMultiline: boolean;
  promptText: string;
  onContinue: () => void;
  onTextChange: (text: string) => void;
  inputText: string;
  onChildFocus: (focused: boolean, focusElementId?: string) => void;
  errorMessage?: string;
}

export function TextPrompt(props: ITextPromptProps) {
  const textInputId = `${props.idPrefix}-text-input`;
  const textAreaInputId = `${props.idPrefix}-textarea-input`
  const buttonId = `${props.idPrefix}-button`;

  return (
    <div className="div__text-prompt-container" role="presentation">
      <div className="div__text-prompt">
        {props.promptText}
      </div>
      <div className={props.isMultiline ?
        "div__text-prompt-input-button-container div__text-prompt-input-button-container--multiline" : 
        "div__text-prompt-input-button-container"} role="presentation">
        <div className="div__text-prompt-input" role="presentation">
          {props.isMultiline ? 
            <textarea
              className="textarea__text-prompt-input"
              id={textAreaInputId}
              value={props.inputText}
              onChange={t => props.onTextChange(t.target.value)}
              onFocus={() => props.onChildFocus(true, textInputId)}
              onBlur={() => props.onChildFocus(false)}
              maxLength={5000}
            /> :
            <input
              className="input__text-prompt-input" 
              id={textInputId}
              type="text"
              value={props.inputText}
              onChange={t => props.onTextChange(t.target.value)}
              onFocus={() => props.onChildFocus(true, textInputId)}
              onBlur={() => props.onChildFocus(false)}
              maxLength={500}
            />
          }
        </div>
        <div className="div__text-prompt-button" role="presentation">
          <button
            id={buttonId}
            type='button'
            className="button__text-prompt-button"
            onClick={props.onContinue}
            onFocus={() => props.onChildFocus(true, buttonId)}
            onBlur={() => props.onChildFocus(false)}
          >
            Continue
          </button>
        </div>
      </div>
      {props.errorMessage && <div className="div__text-prompt-error">
        ERROR: {props.errorMessage}
      </div>}
    </div>
  );
}