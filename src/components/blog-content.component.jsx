/* eslint-disable react/prop-types */
const Img = ({ url, caption }) => {
    return (
        <div className="flex flex-col items-center">
            <img src={url} className="w-1/2 h-1/2" alt="Image" />
            { caption.length ? <p className="text-center my-3 md:mb-12 text-base text-dark-grey">{caption}</p> : "" }
        </div>
    )
}

const Quote = ({ quote, caption }) => {
    return (
        <div className="bg-logoGreen/10 p-3 pl-5 border-l-4 border-logoGreen">
            <p className="text-lg leading-10 italic text-justify  md:text-xl">{quote}</p>
            {caption.length ? <p className="w-full text-logoGreen text-base">{caption}</p> : ""}
        </div>
    )
}

const List = ({ style, items }) => {
    return (
        <ol className={`pl-5 ${ style == "ordered" ? " list-decimal" : " list-disc"}`}>

            {
               items.map((listItem, i) => {
                    return <li key={i} className="my-4" dangerouslySetInnerHTML={{ __html: listItem }}></li>
               }) 
            }

        </ol>
    )
}

const BlogContent = ({ block }) => {
    
    let { type, data } = block;

    if(type == "paragraph"){
        return <p className="font-normal font-gelasio" dangerouslySetInnerHTML={{ __html: data.text }}></p>
    } 

    if(type == "header"){
        if(data.level == 3){
            return <h3 className="text-3xl font-bold" dangerouslySetInnerHTML={{ __html: data.text }}></h3>
        }
        return <h2 className="text-4xl font-bold" dangerouslySetInnerHTML={{ __html: data.text }}></h2>
    }

    if(type == "image") {
        return <Img url={data.file.url} caption={data.caption} />
    }

    if(type == "quote"){
        return <Quote quote={data.text} caption={data.caption} />
    }
    
    if(type == "list"){
        return <List style={data.style} items={data.items} />
    }

}

export default BlogContent