import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';
import { useTodos } from '@/hooks/useTodos';
import { useTheme } from '@/hooks/useTheme';
import { SunIcon, MoonIcon, CheckSquareIcon } from 'lucide-react';

function App() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodo, reorderTodos } = useTodos();
  const { isDark, toggleTheme } = useTheme();

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-lg">
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckSquareIcon className="size-5 text-primary" />
                <CardTitle>Todo App</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={toggleTheme}
              >
                {isDark ? (
                  <SunIcon className="size-4" />
                ) : (
                  <MoonIcon className="size-4" />
                )}
              </Button>
            </div>
            {todos.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {completedCount} of {todos.length} completed
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <TodoForm onAdd={addTodo} />
            <TodoList
              todos={todos}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
              onReorder={reorderTodos}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
