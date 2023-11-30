export type Tab<T = any> = {
  label: string;
  icon?: JSX.Element;
  content: React.FC<T>;
};
