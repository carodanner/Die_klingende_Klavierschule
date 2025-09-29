export type ExampleType = {
  id: number;
  name: string;
  description?: string;
};

export interface ExampleInterface {
  title: string;
  isActive: boolean;
  items: ExampleType[];
}