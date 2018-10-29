<template>
  <div class="posts">
    <h1>Posts</h1>
    <input placeholder="title" type="text" v-model="title">
    <button @click="triggerCreatePost()">Create Post</button>
    <ul>
      <li v-for="(post, index) in posts" :key="index">
        <p>
          {{ post.title }}
        </p>
        <button @click="triggerDeletePost(post)">Delete Post</button>
      </li>
    </ul>      
  </div>
</template>
<script>
import gql from 'graphql-tag'
import { listPosts } from '@/graphql/queries'
import { createPost, deletePost } from '@/graphql/mutations'

export default {
  data() {
    return {
      title: '',
      posts: []
    }
  },
  apollo: {
    posts: {
      query: () => listPosts,
      update: data => data.listPosts.items
    }
  },
  methods: {
    async triggerDeletePost(post) {
      try {
        console.log('post is: ', post)
        await this.$apollo.mutate({
          mutation: deletePost,
          variables: {
            input: { id: post.id }
          },
          update: (store, { data: { deletePost } }) => {
            console.log('deletePost is: ', deletePost)
            const data = store.readQuery({ query: listPosts })
            data.listPosts.items = data.listPosts.items.filter(post => post.id !== deletePost.id)
            store.writeQuery({ query: listPosts, data })
          },
          optimisticResponse: {
            __typename: 'Mutation',
            deletePost: {
              __typename: 'Post',
              ...post
            }
          },
        })
      } catch(e) {
        console.error(e)
      }
    },
    async triggerCreatePost() {
      try {
        const title = this.title
        if ((title) === '') {
          alert('please create a post')
          return
        }
        this.title = ''
        const input = {
          title
        }
        await this.$apollo.mutate({
          mutation: createPost,
          variables: { input },
          update: (store, { data: { createPost } }) => {
            const data = store.readQuery({ query: listPosts })
            data.listPosts.items.push(createPost)
            store.writeQuery({ query: listPosts, data })
          },
          // optimisticResponse: {
          //   __typename: 'Mutation',
          //   createPost: {
          //     ...input,
          //     id: Math.round(Math.random() * -1000000),
          //     __typename: 'Post'
          //   }
          // },
        })
      } catch(e) {
        console.error(e)
      }
    }
  }
}
</script>
<style>
* {
  box-sizing: border-box;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

li {
  font-size: 18px;
  width: calc(25% - .75em);
  border: 1px solid #cccccc;
  margin-bottom: 1em;
}

li:not(:nth-child(4n)) {
  margin-right: 1em;
}

li button {
  background: #cccccc;
  width: 100%;
  padding: .5em;
  font-size: 14px;
  border: none;
}
</style>

