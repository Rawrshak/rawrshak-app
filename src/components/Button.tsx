function Button({
  label,
  onClick,
  enabled,
  show,
  enabledClassName,
  disabledClassName,
}: {
  label: string,
  onClick: () => void,
  enabled: boolean,
  show: boolean,
  enabledClassName: string,
  disabledClassName: string,
}) {
  if (show) {
    if (enabled) {
      return (
        <button onClick={onClick} className={enabledClassName + " cursor-pointer"}>
          {label}
        </button>
      );
    } else {
      return (
        <button className={disabledClassName + " cursor-default"}>
          {label}
        </button>
      );
    }
  } else {
    return (null);
  }
}

export default Button;