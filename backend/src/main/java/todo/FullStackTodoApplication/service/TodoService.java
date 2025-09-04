package todo.FullStackTodoApplication.service;

import todo.FullStackTodoApplication.model.TodoModel;

import java.util.List;

public interface TodoService {
    List<TodoModel> getAllTodos();
    TodoModel getTodoByID(Long id);
    TodoModel createTodo(TodoModel todo);
    TodoModel updateTodo(Long id, TodoModel updatedTodo);
    void deleteTodo(Long id);
}
