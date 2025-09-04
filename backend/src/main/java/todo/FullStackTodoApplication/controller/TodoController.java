package todo.FullStackTodoApplication.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import todo.FullStackTodoApplication.model.TodoModel;
import todo.FullStackTodoApplication.service.TodoService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping
    public List<TodoModel> getAllTodos() {
        return todoService.getAllTodos();
    }

    @GetMapping("/{id}")
    public TodoModel getTodoById(@PathVariable Long id) {
        return todoService.getTodoByID(id);
    }

    @PostMapping
    public TodoModel createTodo(@RequestBody TodoModel todo) {
        return todoService.createTodo(todo);
    }

    @PutMapping
    public TodoModel updateModel(@PathVariable Long id,@RequestBody TodoModel updatedTodo ) {
        return todoService.updateTodo(id,updatedTodo);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.ok("Todo deleted successfully.");
    }


}
