export interface NavigationProps {
  push: (view: string, params?: any) => void;
  replace: (view: string, params?: any) => void;
  pop: (numberOfView?: number) => void;
  goBack: () => void;
}
