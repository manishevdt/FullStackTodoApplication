package todo.FullStackTodoApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import todo.FullStackTodoApplication.model.TodoModel;
import todo.FullStackTodoApplication.repository.TodoRepository;

import java.util.List;

@Service
public class TodoServiceImpl implements TodoService {

    @Autowired
    private TodoRepository todoRepository;

    @Override
    public List<TodoModel> getAllTodos() {
        return todoRepository.findAll();
    }

    @Override
    public TodoModel getTodoByID(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
    }

    @Override
    public TodoModel createTodo(TodoModel todo) {
        return todoRepository.save(todo);
    }

    @Override
    public TodoModel updateTodo(Long id, TodoModel updatedTodo) {
        TodoModel existing = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));

        existing.setTitle(updatedTodo.getTitle());
        existing.setCompleted(updatedTodo.isCompleted());

        return todoRepository.save(existing);
    }


    @Override
    public void deleteTodo(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new RuntimeException("Todo not found with id: " + id);
        }
        todoRepository.deleteById(id);
    }
}
