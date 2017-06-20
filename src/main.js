// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'todomvc-app-css/index.css'

Vue.config.productionTip = false

var filters={
	all(todos) {
		return todos;
	},
	active(todos) {
		return todos.filter((todo)=>{
			return !todo.completed;
		});
	},
	completed(todos) {
		return todos.filter((todo)=>{
			return todo.completed;
		});
	}
}


let app=new Vue({
    el : '.todoapp',
    data : {
    	title:'todo',
    	newTodo:'',
    	todos:[{
    		content : 'vue',
    		completed : false
    	}],
    	editedTodo:null,
    	hashName:'all',

    },
    methods: {
    	addTodo(){
    		var value = this.newTodo && this.newTodo.trim();
    		if(!value){
    			return false;
    		}else{
    			this.todos.push({
    				content:value,
    				completed : false
    			});
    			this.newTodo = '';
    		}
    	},
    	removeTodo(index) {
    		this.todos.splice(index,1);
    	},
    	editTodo(todo){
    		this.editedTodo = todo;
    	},
    	doneEdit: function (todo) {
				if (!this.editedTodo) {
					return;
				}
				this.editedTodo = null;
				todo.title = todo.title.trim();
				if (!todo.title) {
					this.removeTodo(todo);
				}
			},
	cancelEdit: function (todo) {
				this.editedTodo = null;
				todo.title = this.beforeEditCache;
			},
	clear: function () {
				this.todos = filters.active(this.todos);
			}
	

    },
    computed: {
    	remain:function(){
    		
    		return filters.active(this.todos).length;
    	},
    	
    	isAll:{
    		get: function () {
			return this.remain === 0;
			},
		set: function (value) {
				this.todos.forEach(function (todo) {
				todo.completed = value;
				});
			}
    	},
    	filteredTodos(){
    		
			return filters[this.hashName](this.todos);
		
	},
	filteredCompleted(){
			return filters.completed(this.todos);
	}
    	
    },
    directives: {
			'todo-focus': function (el, binding) {
				if (binding.value) {
					el.focus();
				}
			}
		}
})
function hashChange(){
	let hashName = location.hash.replace(/#\/?/,'');
	if(filters[hashName]){
		app.hashName = hashName;
	}else{
		location.hash = 'all';
		app.hashName = 'all';
	}
}
window.addEventListener('hashchange',hashChange);
