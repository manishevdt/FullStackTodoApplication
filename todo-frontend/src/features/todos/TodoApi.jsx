const API_URL = 'http://localhost:8080/api/todos';

export const fetchTodos = async () => {
     const res = await fetch(API_URL);
     return res.json();
}

export const createTodo = async (todo) => {
 const res =    await fetch(API_URL,{
        method:'POST',  // tell server that we are sending new data
        headers:{'Content-Type':'application/json'}, // tell server that we are sending json format type data 
        body: JSON.stringify(todo), // js object(todo) is converting to json stringify
    })
    return res.json();
}

export const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`,{  // to delete its id is given 
        method:`DELETE`  // tells server that delete this todo
    }); 
    return id;
}

export const updateTodo = async (todo) => {
  const res =   await fetch(`${API_URL}/${todo.id}`,{
        method : 'PUT',
        headers : { 'Content-Type  ' : 'application/json'}, 
        body: JSON.stringify(todo),
    })
    return res.json();
}