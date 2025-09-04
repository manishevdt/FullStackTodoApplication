package todo.FullStackTodoApplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import todo.FullStackTodoApplication.model.TodoModel;

public interface TodoRepository extends JpaRepository<TodoModel, Long> {

}
