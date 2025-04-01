import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'



function App() {


  const [post, setPost] = useState([])
  const [filterData, setFilterData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)
  const [search, setSearch] = useState('')




  const getPage = async () => {

    try {

      const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
      setPost(res.data)
      setFilterData(res.data)
      console.log(res.data)


    } catch (error) {
      console.log(error)

    }


  }

  useEffect(() => { getPage() }, [])


  const filteredDatas = () => {

    const filter = post.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase()))
    setFilterData(filter)
    
  }


  const Last = currentPage * postsPerPage
  const First = Last - postsPerPage
  const Current = filterData.slice(First, Last)

  // console.log(IndexOfFirstPost, IndexOfLastPost, CurrentPosts)

  const totalPages = (filterData.length / postsPerPage)

  const buttons = []
  for (let i = 1; i <= totalPages; i++) {
    buttons.push(i)
    // console.log(buttons)

  }

  const pagination = (i) => {

    setCurrentPage(i)

  }




  return (

    <>

      <div className='whole'>

        <div className='next'> 

          <h1 style={{ textAlign: 'center' }}>PAGINATION</h1>


          <input type="search" placeholder='Search Data' value={search} onChange={(e)=>setSearch(e.target.value)} />
          <button type='submit' onClick={filteredDatas} >search</button>


          {Current.map((pagee, index) => (
            <p key={index}>
              {pagee.id} {pagee.title}
            </p>

          ))}

          <div className='button'>

            <button disabled={currentPage == 1} onClick={() => pagination(currentPage - 1)} >Previous</button>


            {buttons.map((but, index) => (
              <button key={index} className={currentPage === but ? 'active' : ''} onClick={() => pagination(but)} >{but}</button>
            ))}


            <button disabled={currentPage == totalPages} onClick={() => pagination(currentPage + 1)} >Next</button>

          </div>

        </div>

      </div>

    </>

  )

}



export default App
