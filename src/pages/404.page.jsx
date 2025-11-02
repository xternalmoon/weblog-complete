import { useContext } from 'react'
import img404Dark from '../imgs/404-dark.png'
import img404 from '../imgs/404.png'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../App'

const PageNotFound = () =>{

    let { theme } = useContext(ThemeContext)
    return(
        <section className="h-cover relative p-10 flex flex-col items-center gap-4 text-center">

            <img src={ theme == "light" ? img404 : img404Dark} alt="404" className='select-none w-64 md:w-80 aspect-square object-cover' />

            <h1 className='text-2xl md:text-4xl leading-7 font-semibold'>Uhh Ohh..</h1>
            <h1 className='text-2xl md:text-3xl font-semibold'> What you are looking for, it is not over the server </h1>

            <h1 className='text-xl md:text-2xl'>Head back to the <Link to="/" className='font-bold text-logoGreen'>Home Page</Link></h1>

        </section>
    )
}

export default PageNotFound