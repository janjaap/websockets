import css from './action.module.css';

interface Props {
  isDisabled?: boolean;
  label: string;
  onClick: () => void;
}

export const Action = ({ isDisabled, label, onClick }: Props) => (
  <button
    className={css.button}
    disabled={isDisabled}
    onClick={onClick}
    type="button"
  >
    {label}
  </button>
);
