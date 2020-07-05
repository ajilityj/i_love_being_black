class Posts {
    constructor() {
        this.posts = []
        this.adapter = new PostsAdapter()
        this.commentsAdapter = new CommentsAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadPosts()
    }

    initBindingsAndEventListeners(){
        this.postsContainer = document.getElementById('posts-container')
        this.newPostContent = document.getElementById('new-post-content')
        this.newPostState = document.getElementById('new-post-state')
        this.newPostCountry = document.getElementById('new-post-country')
        this.newPostLikes = document.getElementById('new-post-likes')
        this.postForm = document.getElementById('new-post-form')
        this.postForm.addEventListener('submit', this.createPost.bind(this))
        this.postsContainer.addEventListener('click', this.deletePost.bind(this))
    //    this.postsContainer.addEventListener('dblclick', this.handlePostClick.bind(this))
    //     this.postsContainer.addEventListener('blur', this.updatePost.bind(this), true)
    }

    createPost(e){
        e.preventDefault()
        const value = this.newPostContent.value
        const st = this.newPostState.value
        const co = this.newPostCountry.value
        this.adapter.createPost(value, st, co).then(post => {
            this.posts.push(new Post(post))
            this.newPostContent.value = ''
            this.newPostState.value = ''
            this.newPostCountry.value = ''
            this.render()
            //alert("post created!")
        })
    }
    // createComment(e) {
    //     let attributes = {
    //         text: text,
    //         post_id: this.id 
    //     };
    //     return new Comment(attributes);
    // }
    // createComments(e) {
    //     e.preventDefault()
    //     const text = new-comment-text
        
    // }

    deletePost(e){
        e.preventDefault()
        const isButton = e.target.nodeName === "BUTTON";
            if (!isButton) return;
            alert("post deleted!")
            e.target.parentElement.remove();   
            this.adapter.deletePost(e.target.id)

    }
   
    fetchAndLoadPosts() {
       const newcomments = []
        this.adapter
        .getPosts()
        .then(posts => {
            posts.forEach(post => this.posts.push(new Post(post)))
            console.log(this.posts)
        })
        // .then( posts =>{
        //     posts.newecomments.forEach(comment => {
        //         const newComment = new Comment(comment.text, comment.id, comment.posts_id)
        //         this.posts.push(newComment)
        //     })
        // } )
        // .then(() => {
        //     this.fetchAndLoadComments() 
        // })
        // if (this.comments) {
        //     this.comments.forEach(function(comment){
        //         let newComment = new Comment(comment)
        //         newComment.createComments()
        //     })
        // }
        // Comment.newCommentForm(this.id)
        .then(() => {
            this.render()
        })
    }
    fetchAndLoadComments() {
        const allcomments = []
        this.commentsAdapter.getComments()
        .then(comments => {
            comments.forEach(comment => allcomments.push(new Comment(comment.attributes.text, comment.id, comment.attributes.posts_id)))
            console.log(allcomments)
        })
        // .then(comments => {
        //     comments.forEach(comment => {
        //         const cmt = new Comment(comment.attributes.text)
        //         allcomments.push(cmt)
        //     console.log(allcomments)
        // })
        //   })
          .then(() => {
            this.render()
        })
        }
   
    render(){
        this.postsContainer.innerHTML = this.posts.map(post => post.renderLi()).join('')
    }
    }
    
    // handlePostClick(e){
    //    this.togglePosts(e)
    // }
    // togglePosts(e){
    //     const li = e.target
    //     li.contentEditable = true
    //     li.focus()
    //     li.classList.add('editable')
    // }
    // updatePost(e){
    //     const li = e.target
    //     li.contentEditable = false
    //     li.classList.remove('editable')
    //     const newValue = li.innerHTML
    //     const id = li.dataset.id
    //    // console.log(id)
    //     this.adapter.updatePost(newValue, id).then(post => {
    //         this.posts.push(post)
    // })}
