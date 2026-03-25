import React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CheckCircle2, Circle, AlignLeft, Plus } from 'lucide-react';

function TodoListView({ events, onToggleTodo }) {
  const todos = events.filter(ev => ev.type === 'todo');

  return (
    <div className="feature-view-container">
      <div className="view-header">
        <h2>To Do List</h2>
        <p>전체 {todos.length}개의 할 일이 있습니다. (완료: {todos.filter(t => t.completed).length})</p>
      </div>

      <div className="view-body">
        {todos.length === 0 ? (
          <div className="empty-placeholder">
            <div className="placeholder-icon"><Plus size={40} /></div>
            <p>할 일이 없습니다.</p>
          </div>
        ) : (
          <div className="todo-list-grid">
            {todos.map(todo => (
              <div key={todo.id} className={`todo-item-card ${todo.completed ? 'completed' : ''}`}>
                <div className="todo-check" onClick={() => onToggleTodo(todo.id)}>
                  {todo.completed ? (
                    <CheckCircle2 size={24} color="#10b981" />
                  ) : (
                    <Circle size={24} color="var(--border-light)" />
                  )}
                </div>
                <div className="todo-content">
                  <p className="todo-text">{todo.text}</p>
                  {todo.description && (
                    <p className="todo-desc-short">
                      <AlignLeft size={12} /> {todo.description}
                    </p>
                  )}
                  <span className="todo-date-tag">{format(new Date(todo.date), 'M월 d일 (E)', { locale: ko })}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoListView;
