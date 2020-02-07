Vue.config.devtools = true;

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
      comment.value = ''
    },
    doChangeState: function(item){
      if (item.state==1){
        this.complete.push({
          comment: item.comment
        })
        var index = this.todos.indexOf(item)
        this.todos.splice(index,1)
      }else{
        item.state=1
      }
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

var app1 = new Vue({
	el: '#app1',
	data:{
			bangohan:"餃子定食"
	}
})

var app2 = new Vue({
	el: '#app2',
	data:{
		wishlists: [
			{item: "ルンバ"},
			{item: "水拭きルンバ"},
			{item: "オーブンレンジ"}
		]
	},
	methods: {
		addItemList(){
			if(this.addItem){
				this.wishlists.push({
					item: this.addItem
				});
			}
			this.addItem =''
		}
	}
})

var app3 = new Vue({
	el: '#app3',
	methods:{
		displayAlert(){
			alert("alert表示")
		}
	}
})

var app4 = new Vue({
	el: '#app4',
	data:{
		show: true,
		iiiii: true,
	},
	methods: {
		changeShow(){
			this.show = !this.show
		},
		changeIf(){
			this.iiiii = !this.iiiii
		}
	}

})

var app5 = new Vue({
	el: '#app5',
	data:{
		message: 1
	},
	methods:{
		plus1(){
			this.message += 1
		},
		minus1(){
			this.message -= 1
		}
	}
})

var app6 = new Vue({
	el: '#app6',
	data:{
		selectSize: 'S',
		lists:[
			{size: 'S', value: 'S'},
			{size: 'M', value: 'M'},
			{size: 'L', value: 'L'}
		]
	}
})

var app7 = new Vue({
	el: '#app7',
	data:{
		message: ''
	}
})

Vue.component('component1',{
	template: '<p>Component1:チョココルネ</p>'
})

var app8 = new Vue({
	el:'#app8'
})

var app9 = new Vue({
	el:"#app9",
	data:{a: false}
})

var app10 = new Vue({
	el:"#app10",
  data:{
    list:[
      {label:'1', value:'1'},
      {label:'2', value:'2'},
      {label:'3', value:'3'},
      {label:'4', value:'4'},
      {label:'5', value:'5'},
    ],
    checked:[],
    button: false,
    length: 0,
  },
  methods:{
    check_radio(){
      if( 3 <= this.checked.length){
        this.button = true
      }else{
        this.button = false
      }
      console.log(this.checked)
      this.length = this.checked.length
      console.log(this.length)
    }
  }
})

var app11 = new Vue({
	el:"#app11",
  data:{
    list:[
      {label:'1', value:'1'},
      {label:'2', value:'2'},
      {label:'3', value:'3'},
      {label:'4', value:'4'},
      {label:'5', value:'5'},
    ],
    checked:[],
    length: 0,
    logs: []
  },
  methods:{
    checkLength(){
      this.length = this.checked.length
    },
    onclick(){
      console.log('clicking')
    }
  },
  computed:{
    checkedCount(){
      if(this.checked.length >= 3){
        return true
      }else{
        return false
      }
    }
  }
})


