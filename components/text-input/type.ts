export interface TextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeValue?: (value?: any) => any;
  secureTextEntry?: boolean;
  showCheck?: boolean;
  showClose?: boolean;
  error?: boolean | string;
  onPressCross?: ()=>void
}
