import { useState, useEffect } from 'react';


const Content = ( props ) => {

    // {/* <button onSubmit={handleSubmit}>
    // rdfsvc argsfvc
    // </button> */}
    // {/* <form action="" onSubmit={handleSubmit}> afdsv</form>
    //  */}
    //  {/* <form > */}
    const [task,setTask]=useState('');
    return (
        
        <div className="content">
            <div className="head">

                 <input
                 type="text" 
                 className='addtodo'
                 placeholder='Add task...'
                 value={task}
                 onChange={(e)=> setTask(e.target.value)}
                 //  onSubmit={props.func(task)}
                 // onSubmit={(e)=>setTask(e.target.value)}
                 //  onSubmit={()=> 
                    //     props.changedata(task)
                    //     // setTask("")
                    // }
                    />
                {/* <button className='buttons' onClick={()=>
                    props.func(task)
                } > +</button> */}
                <button className='buttons'
                    // onClick={()=>{
                        //     props.func(task)
                        // }}
                        > +</button>
                
                {/* </form> */}
                 
                 

            </div>
            
            <div>
                sdfc
            </div>
            
        </div>
    );
}

export default Content;
// const handleSubmit= () => {
    //     //data to store.
    //     const addtodo= () =>{
        //         let newtodo={
            //             work:""
            //         }
            //     }
            // } 
            // }



            // {/* <div>hello</div>
            // <button onClick={Click}>increase 
            // </button>
            // <div>{values}</div> */}