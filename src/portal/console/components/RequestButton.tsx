import { useEffect, useState } from "react";

export enum RequestButtonElementState {
  NotStarted,
  Started,
  Succeeded,
  Failed
};

interface IRequestButtonProps {
  idPrefix: string;
  ButtonText: string;
  State: RequestButtonElementState;
  OnRequestButtonClick: () => void;
  OnChildFocus: (focused: boolean, focusElementId?: string) => void;
}

function DotString(num: number) {
  let str = '';
  for (let i = 1; i <= num; ++i) {
    str += '.';
  }
  return str;
}

export function RequestButton(props: IRequestButtonProps) {
  const [numDots, setNumDots] = useState(0);
  useEffect(() => {
    const interval = setInterval(function(){  
      setNumDots((numDots + 1) % 4);
    }, 1000);

    return () => clearInterval(interval);
  }, [numDots]);

  const buttonId = `${props.idPrefix}-button`;

  return (
    <div className="div__request-button-container" role="presentation">
      {(props.State === RequestButtonElementState.NotStarted || props.State === RequestButtonElementState.Failed) &&
        <button
          id={buttonId}
          className="button__request-button"
          onClick={props.OnRequestButtonClick}
          onFocus={() => props.OnChildFocus(true, buttonId)}
          onBlur={() => props.OnChildFocus(false)}>{props.State === RequestButtonElementState.Failed ? 'Submit Again' : props.ButtonText}</button>
      }
      {props.State === RequestButtonElementState.Started &&
        <div className="div__request-button-spinner">
          Please Wait<span aria-hidden={true}>{DotString(numDots)}</span>
        </div>
      }
      {props.State === RequestButtonElementState.Failed &&
        <div className="div__request-button-message--error">
          An error occurred.
        </div>
      }
      {props.State === RequestButtonElementState.Succeeded &&
        <div className="div__request-button-message--success">
          Submitted. All done!
        </div>
      }
    </div>
  );
}