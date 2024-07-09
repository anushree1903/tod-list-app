
export interface TodoItem {
  id: number;
  text: string;
  isEditing: boolean;
}

export interface AddTodoFormProps {
  onAdd: (text: string) => void;
}

export interface TodoItemComponentProps {
  item: TodoItem;
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
  onStartEdit: (id: number) => void;
  onCancelEdit: (id: number) => void;
}