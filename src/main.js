// localStorageの設定(cookieみたいなやつ、サーバーに値を保持するのではなくてこのlocalStorageに保持する)
// 実際にストレージに保存されるデータのフォーマットは、JSONになる
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}


const app = new Vue({
  el: '#app',
  data:{
    todos:[],
    complete:[],
    options:[
      {value: -1, label: '全て'},
      {value: 0, label: '作業中'},
      {value: 1, label: '完了'}
    ],
    current: -1
  },
  methods: {
    doAdd:function(event, value){
      var comment = this.$refs.comment
      if(!comment.value.length){
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      })
      console.log(this.todos[(this.todos.length)-1])
      comment.value = ''
    },
    doChangeState: function(item){
      if (item.state==1){
        console.log(item.comment)
        this.complete.push({
          id: todoStorage.uid++,
          comment: item.comment
        })
          var index = this.todos.indexOf(item)
          this.todos.splice(index,1)        
      }else{
        item.state=1
      }
      console.log(this.complete[0])
      console.log(this.complete.length)
    },
    doRemove: function(item){
      var index = this.todos.indexOf(item)
      this.todos.splice(index,1)
    }
  },
  watch:{
    todos:{
      handler: function(todos){
        todoStorage.save(todos)
      },
      deep:true
    }
  },
  // インスタンスが生成された後に同期的に呼ばれる
  created(){
    this.todos = todoStorage.fetch()
  },
  computed:{
    computedTodos:function(){
      return this.todos.filter(function(el){
        return this.current < 0 ? true : this.current === el.state
      },this)
    },
    labels(){
      return this.options.reduce(function(a,b){
        return Object.assign(a, {[b.value]: b.label})
      },{})
    }
  }
})

