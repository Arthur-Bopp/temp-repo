import { Component } from "react";
import "./styles.css";
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../components/utils/load-posts';
import { Button } from '../../components/button';
import { TextInput } from '../../input';

class Home extends Component {
  state = {
    posts: [],
    allPosts:[],
    page: 0,
    postsPerPage: 15,
    searchValue: '',
  };

  async componentDidMount() {
    await this.loadPoasts();
  }

  loadPoasts = async () => {  
    const{ page, postsPerPage} = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () =>{
    const{
      page,
      postsPerPage,
      allPosts,
      posts,
    }= this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage,  nextPage + postsPerPage)
    posts.push(...nextPosts);

    this.setState({posts, page: nextPage});
  }
  
    handleChange=(e)=>{
      const{value}= e.target;
      this.setState({searchValue: value})
    }

  render() {
    const { posts, postsPerPage, page, allPosts, searchValue, } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length ;

    const filtredPosts=!! searchValue ? 
    allPosts.filter ( post=>{
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      )}
    )
    : 
    posts  ;

    return (
      <section className="container">
        <div className search-container>
         {!! searchValue &&(
           <h1>Search Value: {searchValue}</h1>
         
        )}

        <TextInput
          handleChange={this.handleChange}
          value={searchValue}
        />
</div> 


        {filtredPosts.length >0&&(
          <Posts posts = {filtredPosts}/>
        )}

        {filtredPosts.length === 0&&(
          <h2>Posts not found =(</h2>
        )}

        <div className="button-container">
          {!searchValue &&(
         <Button 
         disabled = {noMorePosts}
         text = "load more posts"
         onClick = {this.loadMorePosts} />)}
        </div>
      </section>
    );
  }
}

export default Home;
